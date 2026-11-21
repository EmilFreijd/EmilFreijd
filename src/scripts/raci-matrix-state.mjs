const marks = new Set(['', 'A', 'R', 'C', 'I', 'AR']);

export function decodeMatrix(value) {
  if (typeof value !== 'string') return null;

  try {
    const { roles, rows } = JSON.parse(value);
    if (!Array.isArray(roles) || roles.length === 0 || !roles.every(role => typeof role === 'string')) return null;
    if (!Array.isArray(rows) || rows.length === 0 || !rows.every(row =>
      row && typeof row.name === 'string' &&
      Array.isArray(row.cells) && row.cells.length === roles.length &&
      row.cells.every(cell => marks.has(cell))
    )) return null;
    return { roles, rows };
  } catch {
    return null;
  }
}

function csvField(value) {
  const normalized = value.normalize('NFKC');
  const formulaLike = /^[\s\uFEFF]*[=+\-@]/u.test(normalized) || /^[\t\r\n]/u.test(value);
  const safe = formulaLike ? "'" + value : value;
  return '"' + safe.replaceAll('"', '""') + '"';
}

export function matrixCsv(lines, delimiter) {
  return lines.map(line => line.map(csvField).join(delimiter)).join('\r\n') + '\r\n';
}
