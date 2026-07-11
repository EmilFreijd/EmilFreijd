import assert from 'node:assert/strict';
import test from 'node:test';
import { buildEntries, parseIssueBody } from './publish-content-issue.mjs';

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
    /must either all be filled or all be empty/,
  );
});

test('rejects calendar dates that JavaScript would otherwise normalize', () => {
  const invalidDate = issueBody.replace('2026-07-10', '2026-02-31');
  assert.throws(
    () => buildEntries({ body: invalidDate, labels: ['content:essay'], issueNumber: 45 }),
    /valid YYYY-MM-DD date/,
  );
});
