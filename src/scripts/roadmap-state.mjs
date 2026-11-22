const DAY = 86_400_000;
const datePattern = /^\d{4}-\d{2}-\d{2}$/u;
export const views = { short: 3, year: 12, long: 36 };

export function toDate(day) {
  return new Date(day * DAY).toISOString().slice(0, 10);
}

export function toDay(date) {
  if (typeof date !== 'string' || !datePattern.test(date)) return NaN;
  const day = Date.parse(date) / DAY;
  return Number.isInteger(day) && toDate(day) === date ? day : NaN;
}

export function monthOffset(day, months) {
  const date = new Date(day * DAY);
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  return date.getTime() / DAY;
}

export function timeline(anchor, view) {
  const offset = view === 'long' ? -(new Date(anchor * DAY).getUTCMonth() % 3) : 0;
  const start = monthOffset(anchor, offset);
  const end = monthOffset(start, views[view]);
  const ticks = [start];
  if (view === 'short') {
    const weekday = new Date(start * DAY).getUTCDay();
    for (let tick = start + ((8 - weekday) % 7 || 7); tick < end; tick += 7) ticks.push(tick);
  } else {
    const step = view === 'year' ? 1 : 3;
    for (let n = step; n < views[view]; n += step) ticks.push(monthOffset(start, n));
  }
  return { start, end, ticks };
}

export function dependencyGaps(items) {
  const byId = new Map(items.map(item => [item.id, item]));
  return items.flatMap(item => item.after.flatMap(id => {
    const previous = byId.get(id);
    if (!previous || previous.end <= item.start) return [];
    return [{
      item,
      previous,
      latestStart: toDate(toDay(item.start) - (toDay(previous.end) - toDay(previous.start))),
    }];
  }));
}

export function validPlan(plan) {
  if (!plan || plan.version !== 1 || typeof plan.title !== 'string' ||
      plan.title.length > 120 || !Array.isArray(plan.items) || plan.items.length > 120) return false;
  const seen = new Map();
  for (const item of plan.items) {
    if (!item || typeof item.id !== 'string' || !item.id || seen.has(item.id) ||
        typeof item.name !== 'string' || !item.name.trim() || item.name.length > 120 ||
        typeof item.team !== 'string' || item.team.length > 80 ||
        typeof item.milestone !== 'boolean' || !Number.isInteger(toDay(item.start)) ||
        !Number.isInteger(toDay(item.end)) || item.end < item.start ||
        (item.milestone && item.start !== item.end) || !Array.isArray(item.after) ||
        new Set(item.after).size !== item.after.length) return false;
    seen.set(item.id, item);
  }

  const complete = new Set();
  const active = new Set();
  function visit(id) {
    if (active.has(id) || !seen.has(id)) return false;
    if (complete.has(id)) return true;
    active.add(id);
    if (!seen.get(id).after.every(visit)) return false;
    active.delete(id);
    complete.add(id);
    return true;
  }
  return plan.items.every(item => visit(item.id));
}
