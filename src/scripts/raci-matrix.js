import { raciText } from '@/i18n/translations';

function mountMatrix(root) {
  if (root.dataset.mounted) return;
  root.dataset.mounted = 'true';
  const byId = (id) => root.querySelector('#' + id);
  const huki = { A: 'H', R: 'U', C: 'K', I: 'I', AR: 'H/U' };
  const raci = { A: 'A', R: 'R', C: 'C', I: 'I', AR: 'A/R' };
  const lang = root.dataset.lang === 'sv' ? 'sv' : 'en';
  let system = lang === 'sv' ? 'huki' : 'raci';
  const words = raciText[lang];
  let roles = [];
  let rows = [];
  let hasEdits = false;

  function marks() {
    return system === 'huki' ? huki : raci;
  }

  function issuesFor(row) {
    const owners = row.cells.filter((cell) => cell.includes('A')).length;
    const issues = [];
    if (!row.name.trim()) issues.push(words.noName);
    if (owners === 0) issues.push(words.noOwner);
    if (owners > 1) issues.push(words.manyOwners);
    if (!row.cells.some((cell) => cell.includes('R'))) issues.push(words.noWorker);
    return issues;
  }

  function updateStatus() {
    let incomplete = 0;
    rows.forEach((row, index) => {
      const issues = issuesFor(row);
      byId('check-' + index).textContent = issues.join(' ') || '✓';
      if (issues.length) incomplete++;
    });
    const message = incomplete ? words.incomplete(incomplete) : words.ready;
    if (byId('status').textContent !== message) byId('status').textContent = message;
  }

  function editable(value, label, onChange) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    input.setAttribute('aria-label', label);
    input.addEventListener('input', () => {
      onChange(input.value);
      hasEdits = true;
      updateStatus();
    });
    return input;
  }

  function removeButton(label, onRemove, focusId) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'remove';
    button.textContent = words.remove;
    button.setAttribute('aria-label', words.remove + ' ' + label);
    button.addEventListener('click', () => {
      onRemove();
      hasEdits = true;
      render();
      byId(focusId).focus();
    });
    return button;
  }

  function heading(row, text, scope = 'col') {
    const header = document.createElement('th');
    header.scope = scope;
    header.textContent = text;
    row.append(header);
    return header;
  }

  function updateCellLabels() {
    Array.from(byId('grid').tBodies[0].rows).forEach((line, index) => {
      const rowName = rows[index].name || words.row + ' ' + (index + 1);
      line.querySelectorAll('select').forEach((select, column) => {
        const roleName = roles[column] || words.role + ' ' + (column + 1);
        select.setAttribute('aria-label', rowName + ' · ' + roleName);
      });
    });
  }

  function render() {
    const grid = byId('grid');
    const header = grid.tHead;
    const body = grid.tBodies[0];
    header.replaceChildren();
    body.replaceChildren();
    const top = header.insertRow();
    heading(top, words.row);

    roles.forEach((role, index) => {
      const label = words.role + ' ' + (index + 1);
      const cell = heading(top, '');
      const input = editable(role, label, (value) => { roles[index] = value; });
      input.addEventListener('input', updateCellLabels);
      cell.append(input);
      if (roles.length > 1) cell.append(removeButton(label, () => {
        roles.splice(index, 1);
        rows.forEach((row) => row.cells.splice(index, 1));
      }, 'add-role'));
    });
    heading(top, words.check);

    rows.forEach((row, index) => {
      const line = body.insertRow();
      const label = words.row + ' ' + (index + 1);
      const nameCell = heading(line, '', 'row');
      const input = editable(row.name, label, (value) => { row.name = value; });
      input.addEventListener('input', updateCellLabels);
      nameCell.append(input);
      if (rows.length > 1) nameCell.append(removeButton(label, () => { rows.splice(index, 1); }, 'add-row'));
      row.cells.forEach((mark, column) => {
        const select = document.createElement('select');
        select.setAttribute('aria-describedby', 'check-' + index);
        select.add(new Option('—', ''));
        for (const [key, symbol] of Object.entries(marks())) {
          select.add(new Option(symbol + ' — ' + words.labels[key], key));
        }
        select.value = mark;
        select.addEventListener('change', () => {
          row.cells[column] = select.value;
          hasEdits = true;
          updateStatus();
        });
        line.insertCell().append(select);
      });
      const check = line.insertCell();
      const message = document.createElement('span');
      message.className = 'row-check';
      message.id = 'check-' + index;
      check.append(message);
    });
    updateCellLabels();
    updateStatus();
  }

  function updateNotation() {
    root.querySelectorAll('[data-system]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.system === system));
    });
    render();
  }

  function loadMatrix(example) {
    if (hasEdits && !window.confirm(words.confirm)) return;
    roles = example ? [...words.exampleRoles] : ['', '', ''];
    const assignments = [
      ['A', 'R', 'C', 'I'],
      ['I', 'AR', '', 'I'],
      ['A', 'R', 'C', 'I'],
    ];
    rows = example
      ? words.exampleRows.map((name, index) => ({ name, cells: assignments[index] }))
      : [{ name: '', cells: roles.map(() => '') }];
    hasEdits = false;
    render();
  }

  function csvField(value) {
    const safe = /^[\s\uFEFF]*[=+\-@]/u.test(value) || /^[\t\r\n]/u.test(value) ? "'" + value : value;
    return '"' + safe.replaceAll('"', '""') + '"';
  }

  byId('add-role').addEventListener('click', () => {
    roles.push('');
    rows.forEach((row) => row.cells.push(''));
    hasEdits = true;
    render();
    byId('grid').tHead.querySelector('th:nth-last-child(2) input').focus();
  });
  byId('add-row').addEventListener('click', () => {
    rows.push({ name: '', cells: roles.map(() => '') });
    hasEdits = true;
    render();
    byId('grid').tBodies[0].lastElementChild.querySelector('input').focus();
  });
  byId('example').addEventListener('click', () => loadMatrix(true));
  byId('blank').addEventListener('click', () => loadMatrix(false));
  byId('export').addEventListener('click', () => {
    const delimiter = lang === 'sv' ? ';' : ',';
    const lines = [
      [words.row, ...roles],
      ...rows.map((row) => [row.name, ...row.cells.map((mark) => marks()[mark] || '')]),
    ];
    const csv = lines.map((line) => line.map(csvField).join(delimiter)).join('\r\n') + '\r\n';
    const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const download = document.createElement('a');
    download.href = url;
    download.download = system + (lang === 'sv' ? '-matris.csv' : '-matrix.csv');
    download.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  root.querySelectorAll('[data-system]').forEach((button) => button.addEventListener('click', () => {
    system = button.dataset.system;
    updateNotation();
  }));
  loadMatrix(true);
  byId('matrix-interactive').hidden = false;
}

function mountMatrices() {
  document.querySelectorAll('raci-matrix').forEach(mountMatrix);
}

mountMatrices();
document.addEventListener('astro:page-load', mountMatrices);
