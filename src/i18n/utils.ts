import { ui, defaultLang, type Lang, type UiKey } from './translations';

export type { Lang };

export function useTranslations(lang: Lang) {
  return (key: UiKey): string =>
    (ui[lang][key] ?? ui[defaultLang][key]) as string;
}

export function getPath(lang: Lang, path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\//, '');
  if (lang === 'en') return clean ? `${base}${clean}` : base;
  return `${base}sv${clean ? `/${clean}` : ''}`;
}

export function getOtherLangPath(url: URL): string {
  const base = import.meta.env.BASE_URL;
  const after = url.pathname.slice(base.length).replace(/^\//, '');
  if (after === 'sv' || after.startsWith('sv/')) {
    const rest = after.slice(2).replace(/^\//, '');
    return rest ? `${base}${rest}` : base;
  }
  return after ? `${base}sv/${after}` : `${base}sv`;
}
