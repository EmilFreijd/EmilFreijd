# Personliga projekt — Draft Content

Dessa passar under /work med en egen tag (t.ex. "Personligt projekt" / "Personal project")
separerade från klientcasen. De är direkta bevis på "Applied AI: Concept to Production"
— inte hypotetiska, utan saker Emil faktiskt byggt och använder.

Lägg till `type: personal` (eller liknande) i content schema för att kunna filtrera.

---

## Projekt: Uppföljningsagent

**Slug:** `accountability-agent`
**Status:** Live
**Tags:** AI · Systemdesign · Beteendeförändring
**Year:** 2026

### Sammanfattning
En personlig agent som gör riktning, reflektion och nästa steg svårare att ignorera.

### Problemet
Vanliga listor och anteckningar hjälper sällan när problemet egentligen är glappet mellan
riktning, beteende och ärlig uppföljning.

### Lösningen
En agent som samlar fokus, ställer bättre frågor och gör nästa steg tydligt innan man
hinner glida vidare. Känns mer som en tränare än ett arkiv.

### Angreppssättet
Agenten samlar uppgifter, nuvarande fokus och återkommande reflektionspunkter. Den skapar
ett tydligt nästa steg och påminner om varför det steget spelar roll — inte bara vad det är.

### Vad det visar
Det mest värdefulla är inte automatiseringen i sig, utan att agenten gör det svårare att
glida bort från det man sagt att man vill bli bättre på. Byggt utifrån ett verkligt problem,
med tydlig användning och fokus på vad som faktiskt förändrar beteende — inte på vad som
imponerar i en demo.

---

## Projekt: Kreativt operativsystem

**Slug:** `creative-operating-system`
**Status:** Pågående
**Tags:** System · Publicering · Arbetsflöde
**Year:** 2026

### Sammanfattning
Ett personligt system för skapande, publicering och återkommande förfining av idéer.

### Problemet
Många idéer dör i glappet mellan inspiration, sortering och faktisk publicering. Kreativt
arbete havererar ofta på grund av friktion — inte brist på idéer.

### Lösningen
Ett sammanhängande arbetssätt där anteckningar, utkast, produktion och publicering stödjer
varandra i stället för att konkurrera. Kreativitet som system, inte som humör.

### Systemet i praktiken
Istället för att se idéer som isolerade utbrott hänger anteckningar, utkast, produktion och
publicering ihop. Det gör det möjligt att återkomma till kreativt arbete även när energin
inte är på topp.

### Nästa steg
Koppla ihop publiceringsrytm, innehållsarkiv och enklare AI-stöd så att gamla idéer lättare
kan bli nya artefakter.

### Vad det visar
Hur systemtänkande och byggarinstinkt appliceras utanför jobbet — och att principerna för
god plattformsdesign gäller lika mycket för ett personligt arbetsflöde som för ett
enterprise-system.

---

## Implementation notes

- Lägg till ett fält `type: 'personal' | 'client'` i content/config.ts work-schemat
- Work-indexsidan kan visa de personliga projekten i en separat sektion eller med en tydlig
  visuell distinktion från klientcasen
- Metrics kan vara annorlunda här — kanske "Vad det löste" snarare än KPI:er
