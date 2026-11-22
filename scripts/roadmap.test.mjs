import assert from 'node:assert/strict';
import test from 'node:test';
import { dependencyGaps, timeline, toDate, toDay, validPlan } from '../src/scripts/roadmap-state.mjs';

test('aligns zoom levels to calendar periods and rejects impossible dates', () => {
  const anchor = toDay('2026-11-22');
  const short = timeline(anchor, 'short');
  assert.deepEqual(short.ticks.slice(0, 3).map(toDate), ['2026-11-01', '2026-11-02', '2026-11-09']);
  assert.equal(toDate(short.end), '2027-02-01');
  assert.equal(timeline(anchor, 'year').ticks.length, 12);
  const long = timeline(anchor, 'long');
  assert.equal(toDate(long.start), '2026-10-01');
  assert.equal(toDate(long.end), '2029-10-01');
  assert.equal(long.ticks.length, 12);
  assert.ok(Number.isNaN(toDay('2026-02-30')));
  assert.equal(toDate(toDay('2028-02-29')), '2028-02-29');
});

const preparation = {
  id: 'prep', name: 'Prepare', team: 'Platform', start: '2026-07-20',
  end: '2026-10-12', milestone: false, after: [],
};
const pilot = {
  id: 'pilot', name: 'Pilot', team: 'Delivery', start: '2026-10-01',
  end: '2026-10-01', milestone: true, after: ['prep'],
};
const plan = { version: 1, title: 'Roadmap', items: [preparation, pilot] };

test('finds a late preparation and computes its latest start', () => {
  assert.deepEqual(dependencyGaps(plan.items), [{
    previous: preparation, item: pilot, latestStart: '2026-07-09',
  }]);
  assert.deepEqual(dependencyGaps([{ ...preparation, end: '2026-10-01' }, pilot]), []);
});

test('rejects invalid import data, missing predecessors and dependency cycles', () => {
  assert.equal(validPlan(plan), true);
  assert.equal(validPlan({ ...plan, items: [pilot] }), false);
  assert.equal(validPlan({ ...plan, items: [preparation, { ...pilot, end: '2026-10-02' }] }), false);
  assert.equal(validPlan({ ...plan, items: [{ ...preparation, after: ['pilot'] }, pilot] }), false);
  assert.equal(validPlan({ ...plan, items: [preparation, preparation] }), false);
});
