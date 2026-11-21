import assert from 'node:assert/strict';
import test from 'node:test';
import { decodeMatrix, matrixCsv } from '../src/scripts/raci-matrix-state.mjs';

test('restores an edited matrix without translating its assignments', () => {
  const saved = {
    roles: ['Ägare', 'Team'],
    rows: [{ name: 'Beslut om release', cells: ['A', 'AR'] }],
  };
  assert.deepEqual(decodeMatrix(JSON.stringify(saved)), saved);
});

test('ignores missing, corrupt or inconsistent saved matrices', () => {
  for (const saved of [
    null, '{broken', 'null', '[]',
    '{"roles":[],"rows":[]}',
    '{"roles":[12],"rows":[{"name":"Release","cells":["A"]}]}',
    '{"roles":["Team"],"rows":[{"name":"Release","cells":["A","R"]}]}',
    '{"roles":["Team"],"rows":[{"name":"Release","cells":["U"]}]}',
  ]) {
    assert.equal(decodeMatrix(saved), null);
  }
});

test('exports localized delimiters, multiline input and quotes as data', () => {
  const rows = [['Beslut', 'Team'], ['Säg "ja";\nfortsätt', 'H/U']];
  assert.equal(matrixCsv(rows, ';'), '"Beslut";"Team"\r\n"Säg ""ja"";\nfortsätt";"H/U"\r\n');
  assert.equal(matrixCsv([['Decision', 'A/R']], ','), '"Decision","A/R"\r\n');
});

test('keeps formula-like entries inert in spreadsheet exports', () => {
  const values = ['=1+1', ' @thing', '\tplain', '\uFEFF+1', '＝1+1', 'ordinary'];
  assert.equal(matrixCsv([values], ','), values.map((value, index) =>
    '"' + (index < 5 ? "'" : '') + value + '"'
  ).join(',') + '\r\n');
});
