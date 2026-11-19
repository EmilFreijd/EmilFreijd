import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkContentPairs } from './check-content.mjs';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'content-pairs-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'src/content/stream'), { recursive: true });
  function put(filename, lang, extra = '', body = 'An article.') {
    fs.writeFileSync(path.join(root, 'src/content/stream', filename), `---\ntitle: Title\ndescription: Description\ndate: 2026-11-18\nkind: essay\nlang: ${lang}\n${extra}\n---\n${body}`);
  }
  return { root, put };
}

test('requires a real published language counterpart, including direct MDX changes', t => {
  const { root, put } = fixture(t);
  put('test.mdx', 'en');
  assert.throws(() => checkContentPairs(root), /needs a published test-sv.mdx/);
  put('test-sv.mdx', 'sv', 'draft: true');
  assert.throws(() => checkContentPairs(root), /is a draft.*Daedalus/);
  put('test-sv.mdx', 'sv');
  assert.equal(checkContentPairs(root), 2);
  put('orphan-sv.mdx', 'sv');
  assert.throws(() => checkContentPairs(root), /needs a published orphan.mdx/);
});

test('handles YAML comments and rejects mismatched language metadata', t => {
  const { root, put } = fixture(t);
  put('test.mdx', 'en', 'featured: true # editorial selection');
  put('test-sv.mdx', 'sv', 'featured: false');
  assert.throws(() => checkContentPairs(root), /must agree on featured/);
  put('test-sv.mdx', 'en', 'featured: true');
  assert.throws(() => checkContentPairs(root), /counterpart|mismatch|published/);
});

test('verifies local image assets and rejects remote or missing image references', t => {
  const { root, put } = fixture(t);
  put('test-sv.mdx', 'sv');
  put('test.mdx', 'en', '', '![Proof](/images/proof.svg)');
  assert.throws(() => checkContentPairs(root), /missing local image/);
  fs.mkdirSync(path.join(root, 'public/images'), { recursive: true });
  fs.writeFileSync(path.join(root, 'public/images/proof.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  assert.equal(checkContentPairs(root), 2);
  put('test.mdx', 'en', '', '![Proof][proof]\n\n[proof]: /images/missing.svg');
  assert.throws(() => checkContentPairs(root), /missing local image/);
  put('test.mdx', 'en', '', '![Proof](https://example.com/proof.svg)');
  assert.throws(() => checkContentPairs(root), /local image path/);
});

test('rejects empty content and duplicate source-issue ownership', t => {
  const { root, put } = fixture(t);
  put('test.mdx', 'en', 'sourceIssue: 42');
  put('test-sv.mdx', 'sv', 'sourceIssue: 42', '');
  assert.throws(() => checkContentPairs(root), /article body/);
  put('test-sv.mdx', 'sv', 'sourceIssue: 42');
  put('other.mdx', 'en', 'sourceIssue: 42');
  put('other-sv.mdx', 'sv', 'sourceIssue: 42');
  assert.throws(() => checkContentPairs(root), /owns multiple slugs/);
});
