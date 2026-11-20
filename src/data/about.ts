import type { Lang } from '@/i18n/utils';

type Localized = Record<Lang, string>;
type AboutText = string | Localized;

interface DescribedItem {
  title: Localized;
  desc: Localized;
}

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type YearMonth = [year: number, month?: Month];
type Period = [start: YearMonth, end?: YearMonth];

export const sectors = {
  defence: { en: 'Defence & aerospace', sv: 'Försvar & flyg' },
  public: { en: 'Public sector', sv: 'Offentlig sektor' },
  advisory: { en: 'IT Advisory', sv: 'IT-rådgivning' },
  telecom: { en: 'Telecom', sv: 'Telekom' },
} satisfies Record<string, Localized>;

interface CareerEntry {
  role: AboutText;
  org: string;
  period: Period;
  sector: keyof typeof sectors;
  summary: Localized;
}

interface EducationEntry {
  degree: Localized;
  org: string;
  period: Period;
  summary: Localized;
}

interface Certification {
  name: AboutText;
    issuer: string;
    year: string;
}

interface SkillGroup {
  group: Localized;
  items: AboutText[];
}

export function aboutText(text: AboutText, lang: Lang): string {
  return typeof text === 'string' ? text : text[lang];
}

const monthNames = {
  en: new Intl.DateTimeFormat('en-GB', { month: 'long', timeZone: 'UTC' }),
  sv: new Intl.DateTimeFormat('sv-SE', { month: 'long', timeZone: 'UTC' }),
};
const present = { en: 'Present', sv: 'nu' } satisfies Localized;

function formatYearMonth([year, month]: YearMonth, lang: Lang): string {
  if (month === undefined) return String(year);
  const name = monthNames[lang].format(new Date(Date.UTC(year, month - 1, 1)));
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${year}`;
}

export function formatPeriod([start, end]: Period, lang: Lang): string {
  return `${formatYearMonth(start, lang)} – ${end ? formatYearMonth(end, lang) : present[lang]}`;
}

export const traits: DescribedItem[] = [
  {
    title: { en: 'Systems thinking', sv: 'Systemtänkande' },
    desc: {
      en: 'I see wholes and dependencies quickly — understanding what actually drives a problem rather than what appears on the surface.',
      sv: 'Ser helheter och beroenden snabbt. Förstår vad som faktiskt driver ett problem snarare än vad som syns på ytan.',
    },
  },
  {
    title: { en: 'Builder instinct', sv: 'Byggarinstinkt' },
    desc: {
      en: "I rarely stop at the analysis. What draws me is actually changing things — building something that works in reality, not just in a presentation.",
      sv: 'Stannar sällan vid analysen. Det som lockar är att faktiskt förändra — bygga något som fungerar i verkligheten, inte bara i en presentation.',
    },
  },
  {
    title: { en: 'Organisational fluency', sv: 'Organisationsförståelse' },
    desc: {
      en: 'Solutions need the right anchoring and timing to hold. Technology without organisational backing stalls in implementation.',
      sv: 'Förstår att lösningar behöver rätt förankring och rätt timing för att hålla. Teknik utan organisatorisk bäring fastnar i implementeringen.',
    },
  },
  {
    title: { en: 'Persistence', sv: 'Uthållighet' },
    desc: {
      en: "I can carry complex tracks for a long time without losing direction. Change takes time, and that's fine.",
      sv: 'Kan bära komplexa spår länge utan att tappa riktning. Förändring tar tid, och det är okej.',
    },
  },
  {
    title: { en: 'Pattern recognition', sv: 'Mönsterigenkänning' },
    desc: {
      en: "I find patterns in complexity quickly and can separate symptoms from root causes, even when the problem is poorly framed.",
      sv: 'Hittar snabbt mönster i komplexitet och kan skilja på symptom och rotorsak, även när problemet är oklart formulerat.',
    },
  },
  {
    title: { en: 'Direction under uncertainty', sv: 'Riktning under osäkerhet' },
    desc: {
      en: 'I function well in high-ambiguity environments. Taking a direction and holding it without complete information is part of the work.',
      sv: 'Fungerar väl i miljöer med hög ambiguitet. Att ta riktning och hålla den utan fullständig information är en del av arbetet.',
    },
  },
];

export const proofPoints: DescribedItem[] = [
  {
    title: { en: 'From symptom to structure', sv: 'Från symptom till struktur' },
    desc: {
      en: "I start with why the problem arises, not what's visible on the surface. That produces solutions that don't need redoing next quarter.",
      sv: 'Jag börjar med varför problemet uppstår, inte vad som syns på ytan. Det ger lösningar som inte behöver göras om nästa kvartal.',
    },
  },
  {
    title: { en: 'Change that lasts', sv: 'Förändring som bär över tid' },
    desc: {
      en: 'I build for durability — in the way of working, in the organisation, in the technology. Not to look good in the next status report.',
      sv: 'Jag bygger för att det ska hålla — i arbetssättet, i organisationen, i tekniken. Inte för att det ska se bra ut i nästa statusrapport.',
    },
  },
  {
    title: { en: 'Technology meets reality', sv: 'Teknik möter vardag' },
    desc: {
      en: "The best systems are the ones that actually get used. I build at the intersection where technology, processes, and people's real needs converge.",
      sv: 'De bästa systemen är de som faktiskt används. Jag bygger i skärningen där teknik, processer och människors faktiska behov möts.',
    },
  },
];

export const forwardItems: Localized[] = [
  { en: 'Technical strategy and systems change', sv: 'Teknisk strategi och systemförändring' },
  { en: 'Complex delivery and change leadership', sv: 'Komplex leverans- och förändringsledning' },
  { en: 'Platform and architecture ownership', sv: 'Plattforms- och arkitekturansvar' },
  { en: 'Eventually, an independent practice built on genuine systems understanding', sv: 'På sikt en egen praktik byggd på verklig systemförståelse' },
];

export const timeline: CareerEntry[] = [
  {
    role: 'IT Object Leader',
    org: 'Saab',
    period: [[2026, 6]],
    sector: 'defence',
    summary: {
      en: 'Leads the governance and development of specialised IT environments in the defence industry, aligning priorities, architecture, security, lifecycle management, and delivery in a high-assurance setting.',
      sv: 'Ansvarar för styrning och vidareutveckling av specialiserade IT-miljöer i försvarsindustrin. Samordnar prioriteringar, arkitektur, säkerhet, livscykel och leverans i en verksamhet med höga krav på robusthet och kontroll.',
    },
  },
  {
    role: { en: 'Team & Project Manager', sv: 'Team- & projektledare' },
    org: 'Domstolsverket',
    period: [[2025, 10], [2026, 6]],
    sector: 'public',
    summary: {
      en: 'Owns and prioritises mission-critical digital platforms with long-term impact on organisational stability. Responsible for governance, architecture decisions, risk management, and roadmap in high-security environments.',
      sv: 'Äger och prioriterar verksamhetskritiska digitala plattformar med långsiktig påverkan på organisationens stabilitet. Ansvarar för styrning, arkitekturval, riskhantering och roadmap i komplexa miljöer med höga krav på säkerhet och tillgänglighet.',
    },
  },
  {
    role: { en: 'Co-owner', sv: 'Delägare' },
    org: 'Norumi AB',
    period: [[2025, 1]],
    sector: 'advisory',
    summary: {
      en: 'Co-founded a strategic IT advisory initiative focused on AI, automation, and platform thinking — helping organisations treat IT as a value driver, not a cost centre.',
      sv: 'Medgrundare av initiativ inom strategisk IT-rådgivning och ägarredo digitalisering. Fokus på AI, automation och plattformstänk som värdedrivare för organisationer som vill växa eller konsolidera.',
    },
  },
  {
    role: { en: 'Team & Project Manager', sv: 'Team- & projektledare' },
    org: 'Domstolsverket',
    period: [[2023, 5], [2025, 10]],
    sector: 'public',
    summary: {
      en: 'Led teams across digital platforms and identity & access management (IAM). Coordinated delivery in environments with strict security, compliance, and continuity requirements.',
      sv: 'Ledde team inom digitala plattformar och identitets- och åtkomsthantering (IAM). Samordning och leverans i miljöer med höga krav på säkerhet, efterlevnad och kontinuitet.',
    },
  },
  {
    role: { en: 'Team Lead & Systems Engineer', sv: 'Teamledare & systemtekniker' },
    org: 'Domstolsverket',
    period: [[2021, 4], [2023, 5]],
    sector: 'public',
    summary: {
      en: 'Combined technical ownership with team leadership and improvement work. Drove stability, standardisation, and efficiency across digital services.',
      sv: 'Kombinerade tekniskt ansvar med teamledning och förbättringsarbete. Bidrog till ökad stabilitet, standardisering och effektivitet i digitala lösningar.',
    },
  },
  {
    role: { en: 'Junior Systems Engineer', sv: 'Junior systemtekniker' },
    org: 'Domstolsverket',
    period: [[2020, 8], [2021, 4]],
    sector: 'public',
    summary: {
      en: 'Operations, troubleshooting, and development of core IT services. Built foundations in information security and system management within a large public-sector organisation.',
      sv: 'Drift, felsökning och vidareutveckling av centrala IT-tjänster. Byggde grund inom informationssäkerhet och systemförvaltning i en komplex offentlig organisation.',
    },
  },
  {
    role: { en: 'Network Technician / Engineer', sv: 'Nätverkstekniker / ingenjör' },
    org: 'Telia Company',
    period: [[2018], [2019]],
    sector: 'telecom',
    summary: {
      en: 'Network delivery for international enterprise customers with strict security and uptime requirements.',
      sv: 'Nätverksleverans för internationella företagskunder med höga krav på säkerhet och tillgänglighet.',
    },
  },
];

export const education: EducationEntry[] = [
  {
    degree: { en: "Bachelor's: IT Infrastructure & Network Design", sv: 'Kandidatexamen: IT-infrastruktur & nätverksdesign' },
    org: 'Jönköping University (JTH)',
    period: [[2017], [2020]],
    summary: {
      en: 'Cross-disciplinary programme spanning IT management, network and server design, and applied IT development. Depth in network architecture, virtualisation, cloud (Azure, AWS), infrastructure (VMware, Linux, Windows Server), and Python.',
      sv: 'Tvärdisciplinär utbildning: IT Management, nätverks- och serverdesign samt verksamhetsnära IT-utveckling. Fördjupning i nätverksarkitektur, virtualisering, molntjänster (Azure, AWS), IT-infrastruktur (VMware, Linux, Windows Server) och Python.',
    },
  },
];

export const certifications: Certification[] = [
  { name: 'CCNA Routing and Switching: Introduction to Networks', issuer: 'Cisco', year: '2017' },
  { name: 'CCNA Routing and Switching: Routing and Switching Essentials', issuer: 'Cisco', year: '2018' },
  { name: 'Professional Scrum Master I (PSM I)', issuer: 'Scrum.org', year: '2019' },
  { name: 'Python Advanced', issuer: 'Programing Hub', year: '2020' },
  { name: 'Fundamentals of Business Certificate', issuer: 'Smartly (Pedago LLC)', year: '2020' },
  {
    name: { en: 'ISO/IEC 27001 Research Publication', sv: 'ISO/IEC 27001 — kandidatuppsats (publikation)' },
    issuer: 'Jönköping University · Secify',
    year: '2020',
  },
];

export const skills: SkillGroup[] = [
  {
    group: { en: 'Delivery & Methods', sv: 'Leverans & metodik' },
    items: ['Program Management', 'Agile / SAFe', 'PRINCE2', 'Risk Management', 'Change Management'],
  },
  {
    group: { en: 'Leadership & Strategy', sv: 'Ledarskap & strategi' },
    items: ['Technical Leadership', 'Stakeholder Management', 'IT Strategy', 'Digital Transformation', 'Team Building'],
  },
  {
    group: { en: 'Technology & Platforms', sv: 'Teknik & plattformar' },
    items: ['AI / ML Solutions', 'Enterprise Architecture', 'Cloud & On-Premises', 'Platform Operations', 'Systems Integration'],
  },
  {
    group: { en: 'Languages', sv: 'Språk' },
    items: [
      { en: 'Swedish — native', sv: 'Svenska — modersmål' },
      { en: 'English — C2', sv: 'Engelska — C2' },
      { en: 'Spanish — A1', sv: 'Spanska — A1' },
    ],
  },
];
