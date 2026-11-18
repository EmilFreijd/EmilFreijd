import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildEntries, parseIssueBody, publishIssue } from './publish-content-issue.mjs';

const issueBody = `### Slug

governance-in-practice

### Publication date

2026-07-10

### Sector

defence

### English title

Governance in practice

### English description

A concise description suitable for metadata and cards.

### English body

## Context

This is the English article body.

### Supporting detail

This heading is part of the article, not an issue field.

### Swedish title

Styrning i praktiken

### Swedish description

En kort beskrivning som fungerar i metadata och kort.

### Swedish body

## Kontext

Det här är den svenska artikeltexten.

### Tags

Governance, Leadership, Governance

### Metrics

3 teams | Delivery scope

### Swedish metrics

3 team | Leveransomfattning

### Timeless

- [x] Timeless content

### Feature on homepage

- [ ] Feature this content

### Security review

- [x] This draft contains no restricted information.
`;

test('parses issue-form headings', () => {
  const fields = parseIssueBody(issueBody);
  assert.equal(fields.get('Slug'), 'governance-in-practice');
  assert.match(fields.get('English body'), /English article body/);
  assert.match(fields.get('English body'), /Supporting detail/);
});

test('generates validated bilingual MDX entries', () => {
  const result = buildEntries({ body: issueBody, labels: ['content:essay'], issueNumber: 42 });
  assert.deepEqual(result.entries.map(entry => entry.filename), [
    'governance-in-practice.mdx',
    'governance-in-practice-sv.mdx',
  ]);
  assert.match(result.entries[0].content, /kind: essay/);
  assert.match(result.entries[0].content, /timeless: true/);
  assert.match(result.entries[0].content, /tags: \["Governance","Leadership"\]/);
  assert.match(result.entries[0].content, /sourceIssue: 42/);
  assert.match(result.entries[1].content, /3 team.*Leveransomfattning/);
  assert.doesNotMatch(result.entries[1].content, /Delivery scope/);
});

test('rejects executable MDX from issue content', () => {
  const malicious = issueBody.replace('This is the English article body.', '{process.env.GITHUB_TOKEN}');
  assert.throws(
    () => buildEntries({ body: malicious, labels: ['content:essay'], issueNumber: 43 }),
    /executable expressions/,
  );
});

test('rejects unsafe Markdown link destinations', () => {
  const malicious = issueBody.replace('This is the English article body.', '[Open this](javascript:alert(1))');
  assert.throws(
    () => buildEntries({ body: malicious, labels: ['content:essay'], issueNumber: 46 }),
    /unsafe destination/,
  );
});

test('requires complete Swedish content when translation is started', () => {
  const partial = issueBody.replace('En kort beskrivning som fungerar i metadata och kort.', '_No response_');
  assert.throws(
    () => buildEntries({ body: partial, labels: ['content:essay'], issueNumber: 44 }),
    /Missing required issue field: Swedish description/,
  );
});

test('rejects English-only publication and incomplete metric translations', () => {
  const noSwedish = issueBody.replace('Styrning i praktiken', '').replace('En kort beskrivning som fungerar i metadata och kort.', '').replace('## Kontext\n\nDet här är den svenska artikeltexten.', '');
  assert.throws(() => buildEntries({ body: noSwedish, labels: ['content:essay'], issueNumber: 42 }), /Swedish title/);
  assert.throws(() => buildEntries({ body: issueBody.replace('3 team | Leveransomfattning', ''), labels: ['content:essay'], issueNumber: 42 }), /same number of rows/);
});

test('rejects reserved translation slugs and invalid issue ownership', () => {
  assert.throws(() => buildEntries({ body: issueBody.replace('governance-in-practice', 'governance-in-practice-sv'), labels: ['content:essay'], issueNumber: 42 }), /reserved/);
  assert.throws(() => buildEntries({ body: issueBody, labels: ['content:essay'], issueNumber: 'invalid' }), /source issue number/);
});

test('rejects remote images and unsafe reference links', () => {
  for (const markdown of ['![Proof](https://example.com/proof.png)', '![Proof][image]\n\n[image]: https://example.com/proof.png', '[Open][link]\n\n[link]: javascript:alert(1)']) {
    assert.throws(() => buildEntries({ body: issueBody.replace('This is the English article body.', markdown), labels: ['content:essay'], issueNumber: 42 }), /local|unsafe destination/);
  }
  assert.doesNotThrow(() => buildEntries({ body: issueBody.replace('This is the English article body.', '![Proof](/images/proof.svg)'), labels: ['content:essay'], issueNumber: 42 }));
});

test('prevents cross-issue and manual-file overwrites before writing either translation', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'content-collision-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const directory = path.join(root, 'src/content/stream');
  fs.mkdirSync(directory, { recursive: true });
  const svPath = path.join(directory, 'governance-in-practice-sv.mdx');
  fs.writeFileSync(svPath, 'Existing manually edited article');
  assert.throws(() => publishIssue({ body: issueBody, labels: ['content:essay'], issueNumber: 42, root }), /already exists/);
  assert.equal(fs.existsSync(path.join(directory, 'governance-in-practice.mdx')), false);
  assert.equal(fs.readFileSync(svPath, 'utf8'), 'Existing manually edited article');
  fs.unlinkSync(svPath);
  publishIssue({ body: issueBody, labels: ['content:essay'], issueNumber: 42, root });
  const original = fs.readFileSync(svPath, 'utf8');
  assert.throws(() => publishIssue({ body: issueBody, labels: ['content:essay'], issueNumber: 43, root }), /not owned by issue #43/);
  assert.equal(fs.readFileSync(svPath, 'utf8'), original);
  publishIssue({ body: issueBody.replace('This is the English article body.', 'Revised body.'), labels: ['content:essay'], issueNumber: 42, root });
  assert.match(fs.readFileSync(path.join(directory, 'governance-in-practice.mdx'), 'utf8'), /Revised body/);
  assert.throws(() => publishIssue({ body: issueBody.replace('governance-in-practice', 'changed-url'), labels: ['content:essay'], issueNumber: 42, root }), /keep its published slug/);
});

test('rejects calendar dates that JavaScript would otherwise normalize', () => {
  const invalidDate = issueBody.replace('2026-07-10', '2026-02-31');
  assert.throws(
    () => buildEntries({ body: invalidDate, labels: ['content:essay'], issueNumber: 45 }),
    /valid YYYY-MM-DD date/,
  );
});
