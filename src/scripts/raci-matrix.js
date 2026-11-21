import { raciText } from '@/i18n/translations';
import { decodeMatrix, matrixCsv } from './raci-matrix-state.mjs';

const draftKey = 'emilfreijd:raci-matrix:v1';

function mountMatrix(root) {
  if (root.dataset.mounted) return;
  root.dataset.mounted = 'true';
  const byId = (id) => root.querySelector('#' + id);
  const huki = { A: 'H', R: 'U', C: 'K', I: 'I', AR: 'H/U' };
  const raci = { R: 'R', A: 'A', C: 'C', I: 'I', AR: 'A/R' };
  const lang = root.dataset.lang === 'sv' ? 'sv' : 'en';
  const symbols = lang === 'sv' ? huki : raci;
  const words = raciText[lang];
  let roles = [];
  let rows = [];
  let hasEdits = false;

  function saveDraft() {
    try {
      if (hasEdits) window.sessionStorage.setItem(draftKey, JSON.stringify({ roles, rows }));
      else window.sessionStorage.removeItem(draftKey);
    } catch {
      byId('matrix-privacy').textContent = words.storageUnavailable;
    }
  }

  function restoreDraft() {
    try {
      return decodeMatrix(window.sessionStorage.getItem(draftKey));
    } catch {
      byId('matrix-privacy').textContent = words.storageUnavailable;
      return null;
    }
  }

  function updateOverflow() {
    const scroller = byId('matrix-scroll');
    const overflow = scroller.scrollWidth > scroller.clientWidth;
    byId('matrix-scroll-hint').hidden = !overflow;
    scroller.tabIndex = overflow ? 0 : -1;
    if (overflow) scroller.setAttribute('aria-describedby', 'matrix-scroll-hint');
    else scroller.removeAttribute('aria-describedby');
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
    const input = document.createElement('textarea');
    input.rows = 2;
    input.spellcheck = false;
    input.value = value;
    input.setAttribute('aria-label', label);
    input.addEventListener('input', () => {
      onChange(input.value);
      hasEdits = true;
      saveDraft();
      updateStatus();
    });
    return input;
  }

  function removeButton(label, onRemove, focusId, showLabel = false) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = showLabel ? 'remove remove-row' : 'remove';
    button.textContent = showLabel ? words.remove : '×';
    button.title = words.remove + ' ' + label;
    button.setAttribute('aria-label', button.title);
    button.addEventListener('click', () => {
      onRemove();
      hasEdits = true;
      saveDraft();
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
    const legend = Object.entries(symbols)
      .filter(([mark]) => mark !== 'AR')
      .map(([mark, symbol]) => {
        const item = document.createElement('li');
        const code = document.createElement('strong');
        code.textContent = symbol;
        item.append(code, ' ' + words.labels[mark]);
        return item;
      });
    byId('matrix-legend').replaceChildren(...legend);
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
      row.cells.forEach((mark, column) => {
        const select = document.createElement('select');
        select.setAttribute('aria-describedby', 'check-' + index);
        select.add(new Option('—', ''));
        for (const [key, symbol] of Object.entries(symbols)) {
          const option = new Option(symbol, key);
          option.setAttribute('aria-label', symbol + ' — ' + words.labels[key]);
          select.add(option);
        }
        select.value = mark;
        select.addEventListener('change', () => {
          row.cells[column] = select.value;
          hasEdits = true;
          saveDraft();
          updateStatus();
        });
        line.insertCell().append(select);
      });
      const check = line.insertCell();
      const message = document.createElement('span');
      message.className = 'row-check';
      message.id = 'check-' + index;
      check.append(message);
      if (rows.length > 1) check.append(removeButton(label, () => { rows.splice(index, 1); }, 'add-row', true));
    });
    updateCellLabels();
    updateStatus();
    updateOverflow();
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
    saveDraft();
    render();
  }

  byId('add-role').addEventListener('click', () => {
    roles.push('');
    rows.forEach((row) => row.cells.push(''));
    hasEdits = true;
    saveDraft();
    render();
    byId('grid').tHead.querySelector('th:nth-last-child(2) textarea').focus();
  });
  byId('add-row').addEventListener('click', () => {
    rows.push({ name: '', cells: roles.map(() => '') });
    hasEdits = true;
    saveDraft();
    render();
    byId('grid').tBodies[0].lastElementChild.querySelector('textarea').focus();
  });
  byId('example').addEventListener('click', () => loadMatrix(true));
  byId('blank').addEventListener('click', () => loadMatrix(false));
  byId('export').addEventListener('click', () => {
    const delimiter = lang === 'sv' ? ';' : ',';
    const lines = [
      [words.row, ...roles],
      ...rows.map((row) => [row.name, ...row.cells.map((mark) => symbols[mark] || '')]),
    ];
    const csv = matrixCsv(lines, delimiter);
    const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const download = document.createElement('a');
    download.href = url;
    download.download = lang === 'sv' ? 'huki-matris.csv' : 'raci-matrix.csv';
    download.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  const draft = restoreDraft();
  byId('matrix-interactive').hidden = false;
  if (draft) {
    ({ roles, rows } = draft);
    hasEdits = true;
    render();
  } else {
    loadMatrix(true);
  }
  const scroller = byId('matrix-scroll');
  scroller.addEventListener('keydown', (event) => {
    if (event.target !== scroller || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const direction = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (!direction || scroller.scrollWidth <= scroller.clientWidth) return;
    event.preventDefault();
    scroller.scrollLeft += direction * 64;
  });
  const observer = new ResizeObserver(updateOverflow);
  observer.observe(scroller);
  observer.observe(byId('grid'));
  document.addEventListener('astro:before-swap', () => observer.disconnect(), { once: true });
}

function mountMatrices() {
  document.querySelectorAll('raci-matrix').forEach(mountMatrix);
}

mountMatrices();
document.addEventListener('astro:page-load', mountMatrices);
