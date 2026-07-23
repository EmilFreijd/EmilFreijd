import fs from 'node:fs';
import path from 'node:path';

function readFrontmatter(source, filename) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`Missing frontmatter in ${filename}`);

  const fields = new Map();
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*?)\s*$/);
    if (field) fields.set(field[1], field[2].replace(/^(['"])(.*)\1$/, '$2'));
  }
  return fields;
}

function parseDate(value, filename) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) {
    throw new Error(`Frontmatter date in ${filename} must use YYYY-MM-DD`);
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`Frontmatter date in ${filename} is not a valid calendar date`);
  }
  return parsed.toISOString();
}

export function loadStreamSitemapMetadata(contentDir) {
  const routes = new Map();
  const translatedSlugs = new Set();

  for (const filename of fs.readdirSync(contentDir).filter(name => name.endsWith('.mdx')).sort()) {
    const source = fs.readFileSync(path.join(contentDir, filename), 'utf8');
    const fields = readFrontmatter(source, filename);
    if (fields.get('draft') === 'true') continue;

    const id = filename.slice(0, -'.mdx'.length);
    const lang = fields.get('lang') || 'en';
    const lastmod = parseDate(fields.get('date'), filename);

    if (lang === 'sv') {
      if (!id.endsWith('-sv')) {
        throw new Error(`Swedish stream entry ${filename} must end with -sv.mdx`);
      }
      const slug = id.slice(0, -3);
      translatedSlugs.add(slug);
      routes.set(`/sv/stream/${slug}/`, lastmod);
    } else {
      routes.set(`/stream/${id}/`, lastmod);
    }
  }

  return { routes, translatedSlugs };
}

export function createStreamSitemapSerializer({ routes, translatedSlugs }) {
  return item => {
    const pathname = new URL(item.url).pathname;
    const svMatch = pathname.match(/^\/sv\/stream\/([^/]+)\/$/);
    if (svMatch && !translatedSlugs.has(svMatch[1])) return undefined;

    const enMatch = pathname.match(/^\/stream\/([^/]+)\/$/);
    const isUntranslatedEnglish = enMatch && !translatedSlugs.has(enMatch[1]);
    const links = isUntranslatedEnglish
      ? item.links?.filter(link => link.lang !== 'sv')
      : item.links;

    return {
      ...item,
      ...(routes.has(pathname) && { lastmod: routes.get(pathname) }),
      ...(links && { links }),
    };
  };
}
