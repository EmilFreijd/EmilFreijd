import type { CollectionEntry } from 'astro:content';
import { ui, defaultLang, type Lang, type UiKey } from './translations';

export type { Lang };

export function useTranslations(lang: Lang) {
  return (key: UiKey): string =>
    (ui[lang][key] ?? ui[defaultLang][key]) as string;
}

export function getPath(lang: Lang, path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\//, '').replace(/\/$/, '');
  if (lang === 'en') return clean ? `${base}${clean}/` : base;
  return clean ? `${base}sv/${clean}/` : `${base}sv/`;
}

/**
 * Resolve the stream entries to show for a language.
 * EN entries are canonical; for SV, each EN entry is swapped for its
 * `slug-sv` counterpart when one exists (keeping the EN id for routing),
 * otherwise the EN entry is used as a fallback.
 */
export function localizeStream(
  entries: CollectionEntry<'stream'>[],
  lang: Lang,
): CollectionEntry<'stream'>[] {
  const en = entries.filter(e => e.data.lang !== 'sv');
  if (lang !== 'sv') return en;
  return en.map(e => {
    const sv = entries.find(s => s.id === `${e.id}-sv`);
    return sv ? { ...sv, id: e.id } : e;
  });
}

export function getOtherLangPath(url: URL): string {
  const base = import.meta.env.BASE_URL;
  const after = url.pathname.slice(base.length).replace(/^\//, '').replace(/\/$/, '');
  if (after === 'sv' || after.startsWith('sv/')) {
    const rest = after.slice(2).replace(/^\//, '').replace(/\/$/, '');
    return rest ? `${base}${rest}/` : base;
  }
  return after ? `${base}sv/${after}/` : `${base}sv/`;
}
