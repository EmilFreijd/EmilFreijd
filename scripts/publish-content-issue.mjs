import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const kinds = new Set(['case', 'project', 'essay', 'update']);
const sectors = new Set(['public-sector', 'defence', 'enterprise', 'personal', 'other']);
const noResponse = new Set(['', '_No response_']);
const issueFields = [
  'Slug',
  'Publication date',
  'Sector',
  'English title',
  'English description',
  'English body',
  'Swedish title',
  'Swedish description',
  'Swedish body',
  'Tags',
  'Metrics',
  'Swedish metrics',
  'Timeless',
  'Feature on homepage',
  'Security review',
];

export function parseIssueBody(body) {
  const fields = new Map();
  const normalized = String(body ?? '').replaceAll('\r\n', '\n');
  const fieldPattern = issueFields.join('|');
  const pattern = new RegExp(
    `^### (${fieldPattern})\\n\\n([\\s\\S]*?)(?=\\n### (?:${fieldPattern})\\n\\n|(?![\\s\\S]))`,
    'gm',
  );

  for (const match of normalized.matchAll(pattern)) {
    const value = match[2].trim();
    fields.set(match[1].trim(), noResponse.has(value) ? '' : value);
  }

  return fields;
}

function required(fields, name, maxLength) {
  const value = fields.get(name)?.trim() ?? '';
  if (!value) throw new Error(`Missing required issue field: ${name}`);
  if (value.length > maxLength) throw new Error(`${name} exceeds ${maxLength} characters`);
  return value;
}

function optional(fields, name, maxLength) {
  const value = fields.get(name)?.trim() ?? '';
  if (value.length > maxLength) throw new Error(`${name} exceeds ${maxLength} characters`);
  return value;
}

export function markdownImages(value) {
  const references = new Map([...value.matchAll(/^\s{0,3}\[([^\]]+)\]:\s*<?([^\s>]+)/gm)]
    .map(match => [match[1].trim().toLowerCase(), match[2]]));
  const paths = [...value.matchAll(/!\[[^\]]*\]\(<?([^\s)>]+)/g)].map(match => match[1]);
  for (const match of value.matchAll(/!\[([^\]]+)\](?:\[([^\]]*)\])?(?![\[(])/g)) {
    const destination = references.get((match[2] || match[1]).trim().toLowerCase());
    if (destination) paths.push(destination);
  }
  return paths;
}

function validateMarkdown(value, fieldName) {
  if (/[{}]/.test(value)) {
    throw new Error(`${fieldName} cannot contain braces because MDX treats them as executable expressions`);
  }
  if (/^\s*(?:import|export)\s/m.test(value)) {
    throw new Error(`${fieldName} cannot contain import or export statements`);
  }
  if (/<[!/A-Za-z]/.test(value)) {
    throw new Error(`${fieldName} cannot contain HTML or JSX tags`);
  }

  for (const match of value.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)/g)) {
    const destination = match[1].toLowerCase();
    if (!/^(?:https?:\/\/|\/|#|mailto:)/.test(destination)) {
      throw new Error(`${fieldName} contains a link with an unsupported or unsafe destination`);
    }
  }

  for (const match of value.matchAll(/^\s{0,3}\[[^\]]+\]:\s*<?([^\s>]+)/gm)) {
    if (!/^(?:https?:\/\/|\/(?!\/)|#|mailto:)/i.test(match[1])) {
      throw new Error(`${fieldName} contains a reference link with an unsupported or unsafe destination`);
    }
  }

  if (markdownImages(value).some(destination => !/^\/(?!\/)/.test(destination))) {
    throw new Error(`${fieldName} images must use local /images/ paths; add cleared assets to public/images in a pull request first`);
  }
}

function parseTags(value) {
  if (!value) return [];
  const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
  if (tags.length > 12) throw new Error('Tags supports at most 12 comma-separated values');
  if (tags.some(tag => tag.length > 40)) throw new Error('Each tag must be 40 characters or fewer');
  return [...new Set(tags)];
}

function parseMetrics(value) {
  if (!value) return [];
  const metrics = value.split('\n').map(line => line.trim()).filter(Boolean).map((line, index) => {
    const separator = line.indexOf('|');
    if (separator < 1) throw new Error(`Metric line ${index + 1} must use: value | label`);
    const metricValue = line.slice(0, separator).trim();
    const label = line.slice(separator + 1).trim();
    if (!metricValue || !label) throw new Error(`Metric line ${index + 1} needs both a value and label`);
    if (metricValue.length > 30 || label.length > 80) throw new Error(`Metric line ${index + 1} is too long`);
    return { value: metricValue, label };
  });
  if (metrics.length > 6) throw new Error('Metrics supports at most 6 lines');
  return metrics;
}

function checked(value) {
  return /- \[x\]/i.test(value);
}

function yamlString(value) {
  return JSON.stringify(value);
}

function renderEntry({ title, description, date, kind, lang, timeless, featured, sector, tags, metrics, body, sourceIssue }) {
  const lines = [
    '---',
    `title: ${yamlString(title)}`,
    `description: ${yamlString(description)}`,
    `date: ${date}`,
    `kind: ${kind}`,
    `lang: ${lang}`,
    `sourceIssue: ${sourceIssue}`,
    `timeless: ${timeless}`,
    `featured: ${featured}`,
    'draft: false',
    `sector: ${sector}`,
    `tags: ${JSON.stringify(tags)}`,
  ];

  if (metrics.length) {
    lines.push('metrics:');
    for (const metric of metrics) {
      lines.push(`  - { value: ${yamlString(metric.value)}, label: ${yamlString(metric.label)} }`);
    }
  }

  lines.push('---', '', body.trim(), '');
  return lines.join('\n');
}

export function buildEntries({ body, labels, issueNumber }) {
  const sourceIssue = Number(issueNumber);
  if (!Number.isSafeInteger(sourceIssue) || sourceIssue < 1) throw new Error('A positive source issue number is required');
  const fields = parseIssueBody(body);
  if (!/^- \[x\] Both language versions are final and cleared for public release\.$/im.test(fields.get('Security review') ?? '')) {
    throw new Error('Confirm both language versions are final and cleared for public release');
  }
  const kindLabels = labels.filter(label => label.startsWith('content:'));
  if (kindLabels.length !== 1) throw new Error('Issue must have exactly one content type label');
  const kind = kindLabels[0].slice('content:'.length);
  if (!kinds.has(kind)) throw new Error(`Unsupported content type: ${kind}`);

  const slug = required(fields, 'Slug', 80).toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('Slug must contain lowercase letters, numbers, and single hyphens only');
  }
  if (slug.endsWith('-sv')) throw new Error('Slug cannot end with -sv; that suffix is reserved for Swedish translations');

  const date = required(fields, 'Publication date', 10);
  const parsedDate = new Date(`${date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsedDate.valueOf()) || parsedDate.toISOString().slice(0, 10) !== date) {
    throw new Error('Publication date must be a valid YYYY-MM-DD date');
  }

  const sector = required(fields, 'Sector', 30);
  if (!sectors.has(sector)) throw new Error(`Unsupported sector: ${sector}`);

  const en = {
    title: required(fields, 'English title', 120),
    description: required(fields, 'English description', 240),
    body: required(fields, 'English body', 50000),
  };
  const sv = {
    title: required(fields, 'Swedish title', 120),
    description: required(fields, 'Swedish description', 240),
    body: required(fields, 'Swedish body', 50000),
  };

  validateMarkdown(en.body, 'English body');
  validateMarkdown(sv.body, 'Swedish body');

  const enMetrics = parseMetrics(optional(fields, 'Metrics', 1000));
  const svMetrics = parseMetrics(optional(fields, 'Swedish metrics', 1000));
  if (enMetrics.length !== svMetrics.length) {
    throw new Error('Metrics and Swedish metrics must have the same number of rows; translate both values and labels');
  }

  const shared = {
    date,
    kind,
    timeless: checked(fields.get('Timeless') ?? ''),
    featured: checked(fields.get('Feature on homepage') ?? ''),
    sector,
    tags: parseTags(optional(fields, 'Tags', 600)),
    sourceIssue,
  };

  const entries = [{
    filename: `${slug}.mdx`,
    content: renderEntry({ ...shared, ...en, metrics: enMetrics, lang: 'en' }),
  }, {
      filename: `${slug}-sv.mdx`,
      content: renderEntry({ ...shared, ...sv, metrics: svMetrics, lang: 'sv' }),
  }];

  return { issueNumber: sourceIssue, kind, slug, title: en.title, entries };
}

export function publishIssue({ body, labels, issueNumber, root = process.cwd() }) {
  const result = buildEntries({ body, labels, issueNumber });
  const contentDir = path.join(root, 'src/content/stream');
  const filenames = new Set(result.entries.map(entry => entry.filename));
  const getOwner = source => source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1]
    .match(/^sourceIssue:\s*(\d+)\s*$/m)?.[1];
  for (const filename of fs.existsSync(contentDir) ? fs.readdirSync(contentDir).filter(name => name.endsWith('.mdx')) : []) {
    const owner = getOwner(fs.readFileSync(path.join(contentDir, filename), 'utf8'));
    if (filenames.has(filename) && owner !== String(result.issueNumber)) {
      throw new Error(`${filename} already exists and is not owned by issue #${result.issueNumber}; choose another slug or edit the existing entry in a pull request`);
    }
    if (!filenames.has(filename) && owner === String(result.issueNumber)) {
      throw new Error(`Issue #${result.issueNumber} already owns ${filename}; keep its published slug or rename both translations in a reviewed pull request`);
    }
  }
  fs.mkdirSync(contentDir, { recursive: true });

  for (const entry of result.entries) {
    fs.writeFileSync(path.join(contentDir, entry.filename), entry.content, 'utf8');
  }

  return result;
}

function writeOutput(name, value) {
  if (!process.env.GITHUB_OUTPUT) return;
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`, 'utf8');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const labels = JSON.parse(process.env.ISSUE_LABELS ?? '[]');
  const result = publishIssue({
    body: process.env.ISSUE_BODY,
    labels,
    issueNumber: process.env.ISSUE_NUMBER,
  });
  writeOutput('slug', result.slug);
  writeOutput('title', result.title.replaceAll('\n', ' '));
  writeOutput('files', result.entries.map(entry => entry.filename).join(','));
  console.log(`Generated ${result.entries.map(entry => entry.filename).join(', ')}`);
}
