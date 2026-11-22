import { roadmapText } from '@/i18n/translations';
import { dependencyGaps, monthOffset, timeline, toDate, toDay, validPlan, views } from './roadmap-state.mjs';

const storageKey = 'emilfreijd:roadmap:v1';

function mount(root) {
  if (root.dataset.mounted) return;
  root.dataset.mounted = 'true';

  const language = root.dataset.lang === 'sv' ? 'sv' : 'en';
  const words = roadmapText[language];
  const locale = language === 'sv' ? 'sv-SE' : 'en-GB';
  const dayLabel = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const fullDate = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' });
  const monthLabel = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
  const current = new Date();
  const today = toDay([current.getFullYear(), String(current.getMonth() + 1).padStart(2, '0'), String(current.getDate()).padStart(2, '0')].join('-'));
  const q = (selector) => root.querySelector(selector);
  const dialog = q('[data-dialog]');
  const form = q('[data-form]');
  const field = (name) => form.elements.namedItem(name);
  const monthInput = q('[data-month]');
  let anchor = monthOffset(today, 0);
  let view = 'year';
  let changed = false;
  let editingId = null;

  function example() {
    const start = monthOffset(today, 0);
    const dates = [[0, 26], [31, 114], [59, 86], [92, 92], [93, 143], [149, 149], [160, 260], [375, 530], [735, 930]];
    const teams = [0, 0, 1, 1, 1, 2, 2, 1, 2];
    const predecessors = [[], [0], [0], [1, 2], [3], [4], [5], [6], [7]];
    return { version: 1, title: words.sampleTitle, items: dates.map(([from, to], index) => ({
      id: 'example-' + index,
      name: words.sampleItems[index],
      team: words.sampleTeams[teams[index]],
      start: toDate(start + from),
      end: toDate(start + to),
      milestone: from === to,
      after: predecessors[index].map(value => 'example-' + value),
    })) };
  }

  let plan = example();
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null');
    if (validPlan(saved?.plan)) {
      plan = saved.plan;
      changed = true;
      if (Number.isInteger(toDay(saved.anchor))) anchor = toDay(saved.anchor);
      if (Object.hasOwn(views, saved.view)) view = saved.view;
    }
  } catch {
    q('[data-privacy]').textContent = words.storageError;
  }

  function save() {
    try {
      if (changed) sessionStorage.setItem(storageKey, JSON.stringify({ plan, view, anchor: toDate(anchor) }));
      else sessionStorage.removeItem(storageKey);
    } catch {
      q('[data-privacy]').textContent = words.storageError;
    }
  }

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function render() {
    const { start, end, ticks } = timeline(anchor, view);
    const pct = (days) => 100 * days / (end - start) + '%';
    const chart = q('[data-chart]');
    const axis = element('div', 'axis-row');
    axis.append(element('span', 'row-label', words.activity));
    const scale = element('div', 'axis');
    axis.append(scale);
    const gridLines = [];
    for (const [index, tick] of ticks.entries()) {
      const at = pct(tick - start);
      const tickLine = element('span', 'tick');
      tickLine.style.setProperty('--at', at);
      tickLine.setAttribute('aria-hidden', 'true');
      gridLines.push(tickLine);
      const date = new Date(tick * 86_400_000);
      const year = String(date.getUTCFullYear());
      const label = element('span', 'tick-label', view === 'short' ? dayLabel.format(date) :
        view === 'long' ? (language === 'sv' ? 'Kv' : 'Q') + (Math.floor(date.getUTCMonth() / 3) + 1) + ' ’' + year.slice(-2) :
        monthLabel.format(date) + (date.getUTCMonth() === 0 || index === 0 ? ' ’' + year.slice(-2) : ''));
      label.style.setProperty('--at', at);
      label.style.setProperty('--span', pct((ticks[index + 1] ?? end) - tick));
      scale.append(tickLine.cloneNode(), label);
    }
    if (today >= start && today < end) {
      const line = element('span', 'today');
      line.style.setProperty('--at', pct(today - start));
      line.setAttribute('aria-hidden', 'true');
      gridLines.push(line);
      scale.append(line.cloneNode());
    }

    const gaps = dependencyGaps(plan.items);
    const visible = plan.items.filter(item => toDay(item.end) >= start && toDay(item.start) < end);
    const teams = new Map();
    for (const item of visible) {
      if (!teams.has(item.team)) teams.set(item.team, []);
      teams.get(item.team).push(item);
    }
    chart.replaceChildren(axis);
    if (!visible.length) chart.append(element('p', 'chart-empty', words.empty));

    for (const [index, [team, items]] of Array.from(teams).entries()) {
      const lane = element('div', 'lane tone-' + (index % 3));
      lane.append(element('div', 'lane-title', team || words.none));
      for (const item of items.sort((a, b) => a.start.localeCompare(b.start))) {
        const row = element('div', 'activity-row');
        const name = element('div', 'row-label');
        const label = element('button', 'label-button', item.name);
        label.type = 'button';
        label.addEventListener('click', () => edit(item, label));
        name.append(label);
        const track = element('div', 'track');
        gridLines.forEach(node => track.append(node.cloneNode()));
        const atRisk = gaps.some(gap => gap.previous.id === item.id || gap.item.id === item.id);
        const left = Math.max(toDay(item.start), start);
        const right = Math.min(toDay(item.end) + 1, end);
        const marker = atRisk ? '! ' : '';
        const caption = item.milestone ? '◆' : (right - left) / (end - start) >= .11 ? item.name : '';
        const bar = element('button', ['bar', item.milestone && 'milestone', atRisk && 'at-risk'].filter(Boolean).join(' '),
          marker + caption);
        const dateText = fullDate.format(toDay(item.start) * 86_400_000) + (item.milestone ? '' : ' – ' + fullDate.format(toDay(item.end) * 86_400_000));
        bar.type = 'button';
        bar.title = item.name + ' · ' + dateText;
        bar.setAttribute('aria-label', bar.title);
        bar.style.setProperty('--at', pct(left - start));
        bar.style.setProperty('--span', pct(right - left));
        bar.addEventListener('click', () => edit(item, bar));
        track.append(bar);
        row.append(name, track);
        lane.append(row);
      }
      chart.append(lane);
    }

    const alerts = q('[data-gaps]');
    alerts.replaceChildren();
    for (const gap of gaps) {
      const date = fullDate.format(toDay(gap.latestStart) * 86_400_000);
      alerts.append(element('li', '', words.gap(gap.previous.name, gap.item.name, date)));
    }
    for (const item of visible) {
      if (!item.team.trim()) alerts.append(element('li', '', words.noOwner(item.name)));
    }
    q('[data-alerts]').hidden = !alerts.children.length;
    monthInput.value = toDate(start).slice(0, 7);
    root.querySelectorAll('[data-view]').forEach(button =>
      button.setAttribute('aria-pressed', String(button.dataset.view === view)));
    q('[data-print-title]').textContent = (plan.title || words.untitled) + ' · ' +
      fullDate.format(start * 86_400_000) + ' – ' + fullDate.format((end - 1) * 86_400_000);
  }

  function replace(next, persist) {
    plan = next;
    changed = persist;
    anchor = plan.items.length ? toDay(plan.items.map(item => item.start).sort()[0]) : today;
    q('[data-title]').value = plan.title;
    q('[data-feedback]').textContent = '';
    save();
    render();
  }

  function milestoneField() {
    const milestone = field('milestone').checked;
    q('[data-end]').hidden = milestone;
    field('end').disabled = milestone;
  }

  let opener;
  function edit(item, trigger) {
    editingId = item?.id ?? null;
    opener = trigger;
    form.reset();
    q('[data-error]').textContent = '';
    field('name').value = item?.name ?? '';
    field('team').value = item?.team ?? '';
    field('start').value = item?.start ?? toDate(timeline(anchor, view).start);
    field('end').value = item?.end ?? field('start').value;
    field('milestone').checked = Boolean(item?.milestone);
    q('[data-action="remove"]').hidden = !editingId;
    milestoneField();

    const options = q('[data-options]');
    options.replaceChildren();
    for (const candidate of plan.items) {
      if (candidate.id === editingId) continue;
      const label = element('label', 'check');
      const input = element('input');
      input.type = 'checkbox';
      input.name = 'after';
      input.value = candidate.id;
      input.checked = item?.after.includes(candidate.id) ?? false;
      label.append(input, candidate.name);
      options.append(label);
    }
    q('[data-dependencies]').hidden = !options.children.length;
    dialog.showModal();
  }

  q('[data-title]').value = plan.title;
  q('[data-title]').addEventListener('input', (event) => {
    plan.title = event.target.value;
    changed = true;
    save();
    render();
  });
  root.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    view = button.dataset.view;
    save();
    render();
  }));
  monthInput.addEventListener('change', () => {
    const day = toDay(monthInput.value + '-01');
    if (Number.isInteger(day)) anchor = day;
    q('.chart-scroll').scrollLeft = 0;
    save();
    render();
  });
  field('milestone').addEventListener('change', milestoneField);
  dialog.addEventListener('close', () => {
    (opener?.isConnected ? opener : q('[data-action="add"]')).focus();
  });
  document.addEventListener('astro:before-swap', () => {
    if (dialog.open) dialog.close();
  }, { once: true });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const item = {
      id: editingId ?? crypto.randomUUID(),
      name: String(data.get('name')).trim(),
      team: String(data.get('team')).trim(),
      start: String(data.get('start')),
      end: String(data.get('end') ?? data.get('start')),
      milestone: field('milestone').checked,
      after: data.getAll('after'),
    };
    const items = editingId ? plan.items.map(previous => previous.id === editingId ? item : previous) : [...plan.items, item];
    if (!validPlan({ ...plan, items })) {
      q('[data-error]').textContent = words.invalid;
      return;
    }
    plan.items = items;
    changed = true;
    const { start, end } = timeline(anchor, view);
    if (toDay(item.end) < start || toDay(item.start) >= end) anchor = toDay(item.start);
    save();
    render();
    dialog.close();
  });

  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    switch (button.dataset.action) {
      case 'previous':
      case 'next':
        anchor = monthOffset(timeline(anchor, view).start, views[view] * (button.dataset.action === 'next' ? 1 : -1));
        save();
        render();
        break;
      case 'add':
        edit(null, button);
        break;
      case 'cancel':
        dialog.close();
        break;
      case 'remove':
        if (!window.confirm(words.removeConfirm)) return;
        plan.items = plan.items.filter(item => item.id !== editingId).map(item =>
          ({ ...item, after: item.after.filter(id => id !== editingId) }));
        changed = true;
        save();
        render();
        dialog.close();
        break;
      case 'open':
        q('[data-file]').click();
        break;
      case 'save': {
        const url = URL.createObjectURL(new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' }));
        const link = element('a');
        link.href = url;
        link.download = 'roadmap.json';
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        break;
      }
      case 'print':
        window.print();
        break;
      case 'blank':
      case 'example':
        if (changed && !window.confirm(words.resetConfirm)) return;
        if (button.dataset.action === 'example') replace(example(), false);
        else replace({ version: 1, title: words.untitled, items: [] }, true);
        break;
    }
  });
  q('[data-file]').addEventListener('change', async (event) => {
    const input = event.target;
    const file = input.files[0];
    input.value = '';
    if (!file) return;
    try {
      if (file.size > 512_000) throw new Error();
      const planFromFile = JSON.parse(await file.text());
      if (!validPlan(planFromFile)) throw new Error();
      if (changed && !window.confirm(words.resetConfirm)) return;
      replace(planFromFile, true);
      q('[data-feedback]').textContent = words.imported;
    } catch {
      q('[data-feedback]').textContent = words.importError;
    }
  });

  render();
  q('[data-workspace]').hidden = false;
}

function init() {
  document.querySelectorAll('roadmap-board').forEach(mount);
}
init();
document.addEventListener('astro:page-load', init);
