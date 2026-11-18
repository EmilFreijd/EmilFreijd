import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { markdownImages } from './publish-content-issue.mjs';

export function checkContentPairs(root = process.cwd()) {
  const directory = path.join(root, 'src/content/stream');
  const entries = new Map();
  for (const filename of fs.readdirSync(directory).filter(name => name.endsWith('.mdx'))) {
    const source = fs.readFileSync(path.join(directory, filename), 'utf8');
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!match) throw new Error(`Missing frontmatter in ${filename}`);
    const data = parse(match[1]);
    if (!data || typeof data !== 'object') throw new Error(`Invalid frontmatter in ${filename}`);
    entries.set(filename, { data, body: source.slice(match[0].length) });
  }

  const owners = new Map();
  for (const [filename, { data, body }] of entries) {
    if (data.draft === true) continue;
    if (!['en', 'sv'].includes(data.lang)) throw new Error(`${filename} must declare lang: en or sv`);
    const swedish = data.lang === 'sv';
    if (filename.endsWith('-sv.mdx') !== swedish) throw new Error(`${filename} has a language/suffix mismatch`);
    const slug = filename.replace(swedish ? /-sv\.mdx$/ : /\.mdx$/, '');
    const counterpartName = swedish ? `${slug}.mdx` : `${slug}-sv.mdx`;
    const counterpart = entries.get(counterpartName)?.data;
    if (!counterpart || counterpart.draft === true || counterpart.lang !== (swedish ? 'en' : 'sv')) {
      throw new Error(`${filename} needs a published ${counterpartName} before merge`);
    }
    for (const field of ['date', 'kind', 'timeless', 'featured', 'sourceIssue']) {
      const fallback = ['timeless', 'featured'].includes(field) ? false : undefined;
      if ((data[field] ?? fallback) !== (counterpart[field] ?? fallback)) {
        throw new Error(`${filename} and ${counterpartName} must agree on ${field}`);
      }
    }
    if (!String(data.title ?? '').trim() || !String(data.description ?? '').trim() || !body.trim()) {
      throw new Error(`${filename} needs a title, description and article body`);
    }
    if (data.sourceIssue !== undefined) {
      if (!Number.isSafeInteger(data.sourceIssue) || data.sourceIssue < 1) throw new Error(`Invalid sourceIssue in ${filename}`);
      const owner = owners.get(data.sourceIssue);
      if (owner && owner !== slug) throw new Error(`Issue #${data.sourceIssue} owns multiple slugs: ${owner}, ${slug}`);
      owners.set(data.sourceIssue, slug);
    }
    // Markdown image assets must exist in public/. Imported/JSX images remain
    // the responsibility of Astro's compiler and the reviewed MDX author.
    for (const destination of markdownImages(body)) {
      if (!/^\/(?!\/)/.test(destination)) throw new Error(`${filename} must use a local image path: ${destination}`);
      const publicRoot = path.join(root, 'public');
      const asset = path.resolve(publicRoot, `.${decodeURIComponent(new URL(destination, 'https://example.invalid').pathname)}`);
      if (!asset.startsWith(`${publicRoot}${path.sep}`) || !fs.existsSync(asset) || !fs.statSync(asset).isFile()) {
        throw new Error(`${filename} references a missing local image: ${destination}`);
      }
    }
  }
  return entries.size;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(`content: checked ${checkContentPairs()} entries and their language pairs`);
}
