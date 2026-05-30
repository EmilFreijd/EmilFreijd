// Generates public/cv.pdf — a one-page CV with NO personal contact details
// (no home address, phone, or private email). Contact routes to the site +
// LinkedIn, matching the site's privacy posture. Run from repo root:
//   npm install --no-save pdfkit && node scripts/generate-cv.mjs
import PDFDocument from 'pdfkit';
import { createWriteStream } from 'node:fs';

const ACCENT = '#7c6af7';
const DARK   = '#16161f';
const BODY   = '#333740';
const MUTED  = '#6b7280';
const LINE   = '#e3e3ec';

const doc = new PDFDocument({ size: 'A4', margin: 48, info: {
  Title: 'Emil Freijd — CV', Author: 'Emil Freijd',
} });
doc.pipe(createWriteStream('public/cv.pdf'));

const L = 48;                 // left margin
const R = doc.page.width - 48; // right edge
const W = R - L;

// ── Header ───────────────────────────────────────────────────────
doc.fillColor(DARK).font('Helvetica-Bold').fontSize(28).text('Emil Freijd', L, 48);
doc.fillColor(ACCENT).font('Helvetica').fontSize(13).text('IT- och förändringsledare', { continued: false });
doc.moveDown(0.3);
doc.fillColor(MUTED).fontSize(9.5).text('emilfreijd.se  ·  linkedin.com/in/emilfreijd');
doc.moveTo(L, doc.y + 8).lineTo(R, doc.y + 8).strokeColor(LINE).lineWidth(1).stroke();
doc.moveDown(1.2);

function heading(text) {
  doc.moveDown(0.6);
  doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(11).text(text.toUpperCase(), L, doc.y, { characterSpacing: 1.2 });
  doc.moveDown(0.35);
}
function entry(role, org, period, summary) {
  const yStart = doc.y;
  doc.fillColor(DARK).font('Helvetica-Bold').fontSize(11).text(role, L, yStart, { width: W - 110, continued: false });
  doc.fillColor(MUTED).font('Helvetica').fontSize(9).text(period, L, yStart, { width: W, align: 'right' });
  doc.fillColor(ACCENT).font('Helvetica').fontSize(9.5).text(org, L, doc.y);
  doc.moveDown(0.2);
  doc.fillColor(BODY).font('Helvetica').fontSize(9.5).text(summary, L, doc.y, { width: W, lineGap: 1.5 });
  doc.moveDown(0.5);
}

// ── Om mig ───────────────────────────────────────────────────────
heading('Om mig');
doc.fillColor(BODY).font('Helvetica').fontSize(9.5).text(
  'Systemorienterad projekt- och förändringsledare med erfarenhet från komplex offentlig verksamhet. Leder initiativ från idé till effekt, med fokus på att förenkla det svåra, skapa riktning i osäkerhet och bygga hållbara arbetssätt över tid. Kombinerar teknisk förståelse med verksamhetsnära perspektiv och verkar obehindrat mellan ledning, teknik och operativ leverans. Tar ansvar för helheten, inte enbart projektplanen.',
  L, doc.y, { width: W, lineGap: 1.5 });

// ── Erfarenhet ───────────────────────────────────────────────────
heading('Erfarenhet');
entry('Team- & Projektledare', 'Domstolsverket', '2020 – nu',
  'Ansvarar för verksamhetskritiska digitala plattformar i en nationell, säkerhetskänslig miljö med höga krav på tillgänglighet, spårbarhet och kontinuitet. Leder tvärfunktionella team och driver styrning, prioritering, arkitekturval och roadmap. Erfarenhet av identitets- och åtkomsthantering (IAM), informationssäkerhet och ITIL-baserad förvaltning. Bakgrund som systemtekniker med ansvar för drift och vidareutveckling av centrala IT-tjänster.');
entry('Medgrundare / Konsult', 'Norumi AB', '2018 – 2019',
  'Medgrundare av initiativ inom strategisk IT-rådgivning och ägarredo digitalisering. Fokus på AI, automation och plattformstänk för organisationer där IT är en värdedrivare, inte en kostnadsfunktion.');
entry('Nätverkstekniker / ingenjör', 'Telia Company', '2018 – 2019',
  'Nätverksleverans för internationella företagskunder med höga krav på säkerhet och uptime.');

// ── Utbildning ───────────────────────────────────────────────────
heading('Utbildning');
entry('Kandidat: IT-infrastruktur & nätverksdesign', 'Jönköping University (JTH)', '2017 – 2020',
  'Tvärdisciplinär utbildning: IT Management, nätverks- och serverdesign samt verksamhetsnära IT-utveckling. Fördjupning i nätverksarkitektur, virtualisering, molntjänster (Azure, AWS), IT-infrastruktur (VMware, Linux, Windows Server) och Python.');
entry('Fundamentals of Business', 'Quantic School of Business and Technology', '2018 – 2020',
  'Affärs- och managementinriktad utbildning: statistik, finans, riskanalys, affärsmodeller och marknadsföring.');

// ── Kompetenser ──────────────────────────────────────────────────
heading('Kompetenser');
doc.fillColor(BODY).font('Helvetica').fontSize(9.5).text(
  'Projektledning (PMBOK)  ·  Förändringsledning (ADKAR)  ·  Verksamhetsutveckling  ·  ITIL (v3 & v4)  ·  AI / Automation  ·  DevOps',
  L, doc.y, { width: W, lineGap: 2 });

// ── Certifieringar ───────────────────────────────────────────────
heading('Certifieringar');
doc.fillColor(BODY).font('Helvetica').fontSize(9.5).text('Professional Scrum Master I (PSM I)  —  Scrum.org, 2019', L, doc.y, { width: W });

// ── Språk ────────────────────────────────────────────────────────
heading('Språk');
doc.fillColor(BODY).font('Helvetica').fontSize(9.5).text('Svenska (modersmål)  ·  Engelska (C2)  ·  Spanska (A1)', L, doc.y, { width: W });

doc.end();
console.log('public/cv.pdf written');
