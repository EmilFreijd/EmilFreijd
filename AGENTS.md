# Agentkontrakt — EmilFreijd

Detta repo bygger Emils personliga portfolio med Astro 7 och publicerar den
statiskt till GitHub Pages på `emilfreijd.se`.

## Börja här

1. `README.md`
2. `PIPELINE.md`
3. `PROGRESS.md`
4. `package.json`
5. Berörda filer i `src/`

## Arkitektur

- Astro 7 med statisk output, ingen SSR.
- Innehåll är MDX i `src/content/stream/`.
- Engelska är default på `/`, svenska ligger under `/sv/`.
- Alla UI-strängar går via `src/i18n/translations.ts`.
- Globala styles ligger i `src/styles/global.css`.
- GitHub Actions publicerar till GitHub Pages.

## Innehållskontrakt

- Engelska: `slug.mdx` med `lang: en`.
- Svenska: `slug-sv.mdx` med `lang: sv`.
- Båda språkversionerna krävs före publicering.
- Giltiga `kind`: `case`, `project`, `essay`, `update`.
- Följ frontmatter-schemat i `PIPELINE.md`.

## Säkerhetsgrind

- Introducera inte XSS, injection, open redirects eller dataexponering.
- Rendera aldrig användarinput som rå HTML.
- Secrets, tokens och credentials får inte förekomma i source eller historik.
- Externa länkar använder `rel="noopener noreferrer"`.
- GitHub Actions ska pinnas till commit-SHA.
- Bedöm `npm audit` och privacy-konsekvens före nya dependencies/scripts.
- Redovisa säkerhetstradeoffs före implementation.

## Setup och verifiering

```bash
sh scripts/bootstrap.sh
scripts/verify.sh
```

Node 22 krävs. Verifieringen kör test, Astro check och produktionsbuild.

## Arbetsregler

- GitHub Issues är arbetskön.
- Arkitekturbeslut och historik hör hemma i `PROGRESS.md`.
- Gör minsta ändring som uppfyller issuets acceptanskriterier.
- Arbeta på separat branch och lämna resultatet som draft-PR.
- Ändra inte publicerat innehåll på bara ett språk.

## Klar när

Acceptanskriterierna är uppfyllda, `scripts/verify.sh` passerar, båda språken
är konsekventa där det är relevant och PR:n beskriver ändring, risk och test.
