import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  createStreamSitemapSerializer,
  loadStreamSitemapMetadata,
} from './sitemap-content.mjs';

function withContent(files, callback) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'stream-sitemap-'));
  try {
    for (const [filename, content] of Object.entries(files)) {
      fs.writeFileSync(path.join(directory, filename), content);
    }
    return callback(directory);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

const entry = ({ date, lang, draft = false }) => `---
title: Test
date: ${date}
lang: ${lang}
draft: ${draft}
---
`;

test('loads publication dates and translated slugs from stream frontmatter', () => {
  withContent({
    'translated.mdx': entry({ date: '2026-01-29', lang: 'en' }),
    'translated-sv.mdx': entry({ date: '2026-02-03', lang: 'sv' }),
    'english-only.mdx': entry({ date: '2026-03-10', lang: 'en' }),
    'draft-sv.mdx': entry({ date: '2026-04-01', lang: 'sv', draft: true }),
  }, directory => {
    const metadata = loadStreamSitemapMetadata(directory);

    assert.equal(metadata.routes.get('/stream/translated/'), '2026-01-29T00:00:00.000Z');
    assert.equal(metadata.routes.get('/sv/stream/translated/'), '2026-02-03T00:00:00.000Z');
    assert.equal(metadata.routes.get('/stream/english-only/'), '2026-03-10T00:00:00.000Z');
    assert.equal(metadata.routes.has('/sv/stream/draft/'), false);
    assert.deepEqual([...metadata.translatedSlugs], ['translated']);
  });
});

test('adds lastmod and omits fallback duplicates and their Swedish alternate links', () => {
  const metadata = {
    routes: new Map([
      ['/stream/translated/', '2026-01-29T00:00:00.000Z'],
      ['/sv/stream/translated/', '2026-02-03T00:00:00.000Z'],
      ['/stream/english-only/', '2026-03-10T00:00:00.000Z'],
    ]),
    translatedSlugs: new Set(['translated']),
  };
  const serialize = createStreamSitemapSerializer(metadata);
  const links = [
    { lang: 'en', url: 'https://emilfreijd.se/stream/english-only/' },
    { lang: 'sv', url: 'https://emilfreijd.se/sv/stream/english-only/' },
  ];

  assert.equal(serialize({
    url: 'https://emilfreijd.se/sv/stream/english-only/',
    links,
  }), undefined);
  assert.deepEqual(serialize({
    url: 'https://emilfreijd.se/stream/english-only/',
    links,
  }), {
    url: 'https://emilfreijd.se/stream/english-only/',
    links: [links[0]],
    lastmod: '2026-03-10T00:00:00.000Z',
  });
});

test('rejects invalid frontmatter dates', () => {
  withContent({
    'invalid.mdx': entry({ date: '2026-02-31', lang: 'en' }),
  }, directory => {
    assert.throws(
      () => loadStreamSitemapMetadata(directory),
      /not a valid calendar date/,
    );
  });
});
