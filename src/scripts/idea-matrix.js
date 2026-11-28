import { ideaMatrixText } from '@/i18n/translations';

function initialize(matrix) {
  const lang = matrix.dataset.lang === 'sv' ? 'sv' : 'en';
  const text = ideaMatrixText[lang];
  const storageKey = `emilfreijd:idea-matrix:v1:${lang}`;
  const zones = new Map(Array.from(matrix.querySelectorAll('[data-zone]'), zone => [zone.dataset.zone, zone]));
  const form = matrix.querySelector('form');
  const input = form.elements.idea;
  const template = matrix.querySelector('template');
  const summary = matrix.querySelector('textarea');
  const feedback = matrix.querySelector('[data-feedback]');
  const copyButton = matrix.querySelector('[data-copy]');
  const exampleButton = matrix.querySelector('[data-example]');

  function update(message = '') {
    const ideas = Array.from(zones, ([zone, section]) => Array.from(section.querySelectorAll('[data-title]'), node => ({
      title: node.textContent, zone,
    }))).flat();
    const groups = new Map();
    for (const zone of ['wow', 'now', 'how', 'ciao']) {
      const { name, action } = text.quadrants[zone];
      if (!groups.has(action)) groups.set(action, []);
      for (const idea of ideas.filter(idea => idea.zone === zone)) {
        groups.get(action).push(`- ${idea.title} (${name})`);
      }
    }
    summary.value = Array.from(groups, ([label, lines]) => lines.length ? [label, ...lines].join('\n') : '')
      .filter(Boolean).join('\n\n');
    copyButton.disabled = ideas.length === 0;
    feedback.textContent = message;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(ideas));
    } catch {
      // The board still works when browser storage is unavailable.
    }
  }

  function place(card, zone) {
    zones.get(zone).querySelector('[data-ideas]').append(card);
    card.querySelector('[data-move]').value = zone;
  }

  function add(title, zone) {
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector('[data-title]').textContent = title;
    const select = card.querySelector('[data-move]');
    const remove = card.querySelector('[data-remove]');
    select.setAttribute('aria-label', `${text.move} – ${title}`);
    remove.setAttribute('aria-label', `${text.remove} – ${title}`);
    select.addEventListener('change', () => {
      place(card, select.value);
      select.focus();
      update(text.moveStatus);
    });
    remove.addEventListener('click', () => {
      const nextCard = card.nextElementSibling || card.previousElementSibling;
      card.remove();
      (nextCard?.querySelector('[data-move]') ?? input).focus();
      update(text.removeStatus);
    });
    const handle = card.querySelector('[data-drag]');
    let highlighted = null;
    function clearTarget() {
      highlighted?.removeAttribute('data-over');
      highlighted = null;
    }
    function targetAt(event) {
      return document.elementFromPoint(event.clientX, event.clientY)?.closest('idea-matrix [data-zone]');
    }
    handle.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0) return;
      handle.setPointerCapture(event.pointerId);
    });
    handle.addEventListener('pointermove', event => {
      if (!handle.hasPointerCapture(event.pointerId)) return;
      const target = targetAt(event);
      if (target === highlighted) return;
      clearTarget();
      highlighted = target;
      highlighted?.setAttribute('data-over', '');
    });
    handle.addEventListener('pointerup', event => {
      if (!handle.hasPointerCapture(event.pointerId)) return;
      const target = targetAt(event);
      clearTarget();
      if (!target || target.dataset.zone === select.value) return;
      place(card, target.dataset.zone);
      update(text.moveStatus);
    });
    handle.addEventListener('lostpointercapture', clearTarget);
    place(card, zone);
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const title = input.value.trim();
    if (!title) {
      input.value = '';
      input.reportValidity();
      return;
    }
    add(title, form.elements.zone.value);
    input.value = '';
    input.focus();
    update(text.addStatus);
  });
  exampleButton.addEventListener('click', () => {
    for (const [zone, { sample }] of Object.entries(text.quadrants)) {
      add(sample, zone);
    }
    exampleButton.disabled = true;
    update(text.exampleStatus);
  });
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(summary.value);
      feedback.textContent = text.copied;
    } catch {
      summary.focus();
      summary.select();
      feedback.textContent = text.manualCopy;
    }
  });

  let saved = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(storageKey));
  } catch {
    // Start with an empty board if storage is blocked or contains invalid data.
  }
  if (Array.isArray(saved)) {
    for (const idea of saved) {
      if (typeof idea?.title === 'string' && idea.title.trim() && zones.has(idea.zone)) {
        add(idea.title, idea.zone);
      }
    }
    const samples = Object.values(text.quadrants).map(zone => zone.sample);
    exampleButton.disabled = saved.some(idea => samples.includes(idea?.title));
  }
  update();
  matrix.querySelector('[data-workspace]').hidden = false;
}

customElements.define('idea-matrix', class extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    initialize(this);
    this.dataset.ready = 'true';
  }
});
