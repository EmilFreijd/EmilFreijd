# Så växte emilfreijd.se fram

## Från blogg till portfolio

Den första versionen utgick från en svensk blogg på Posthaven. Tanken var att använda den egna domänen som en samlad ingång till artiklar, professionell bakgrund och kontakt. LinkedIn kunde hjälpa läsare att upptäcka innehållet. Webbplatsen gav artiklar och andra arbeten en adress som gick att länka tillbaka till.

Arbetet med Posthaven-temat konkretiserade hur en besökare skulle hitta rätt. Startsidan skulle snabbt visa vem sajten tillhör och vad läsaren kan hitta där. En om-sida skulle ge sammanhang och en kontaktsida skulle ge besökaren en tydlig väg vidare. Tidiga förslag innehöll också en separat tjänstesida, ett resursbibliotek och ett nyhetsbrev. De var idéer för framtida innehåll.

## Den personliga hemvisten

Ett senare koncept utvecklade ambitionen att dela egna lärdomar, idéer och byggen som kan inspirera andra och leda till kontakt med likasinnade. Det ger plats åt både yrkeserfarenhet och egna experiment. Om-sidan beskriver detta syfte och flödet kan bära projekt, essäer och korta uppdateringar.

Publiceringsrutinen ska gå att hålla över tid. Den egna sajten är platsen för den beständiga texten och LinkedIn kan leda läsare dit. Personliga projekt och erfarenheter kan också bidra till Norumis nätverk. Företagets erbjudanden har sitt eget sammanhang.

## Hur idéerna syns i Astro-sajten

| Del | Nuvarande upplägg |
| --- | --- |
| Startsida | En kort introduktion, kompetensområden, länkar till arbeten och en tydlig kontaktväg. |
| Om-sida | Yrkesbakgrund, arbetssätt, utbildning och meriter i ett läsbart format på webben. |
| Stream | En daterad ingång till fallstudier, projekt, essäer och uppdateringar. Innehållet ligger i MDX och går att följa via RSS på båda språken. |
| Kontakt | Kontaktformulär och länkar till LinkedIn och mötesbokning. |
| Språk | Engelska som huvudspråk och svenska under `/sv/`. |

Astro-migreringen i maj 2026 flyttade layout, innehåll och publicering till Git-repot. GitHub Actions bygger den statiska sajten. GitHub Pages publicerar den på den egna domänen.

## Så används historiken i den uppdaterade versionen

Startsidan leder till publicerade arbeten och till kontakt på samma språk. De senaste arbetena fyller kortlistan när det finns plats efter redaktionellt utvalda inlägg. Om-sidan beskriver aktuellt ansvar och länkar vidare till kontakt. På mobil fungerar menyn med både tangentbord och pekskärm.

Den äldre ambitionen om ett beständigt publiceringsarkiv lever vidare i MDX, den egna domänen och RSS. Flödet visar publiceringsdatum och erbjuder filter när materialet räcker för att ge olika urval. En tjänstesida och ett nyhetsbrev förutsätter ett aktuellt erbjudande respektive en publiceringsrutin.

Arbetskällorna förvaras privat. Projektbeslut och kontrollerat innehåll hör hemma i det publika repot. Publiceringsflödet beskriver vilka underlag som kan följa med en ändring.

## Lärdomar från temaarbetet

- Kontrollera mobilnavigation, sidfot och favicon på den byggda sajten. De är lätta att förbise när granskningen fokuserar på startsidan.
- Låt datum och innehållsdata styra listor med senaste inlägg. Det minskar behovet av handplockade poster och gör sorteringen möjlig att verifiera.
- Kontrollera titel, metabeskrivning och canonical-URL i sidans renderade HTML. En korrekt mall behöver också ge rätt värde på varje publicerad sida.
- Håll bokning som ett val på kontaktsidan. Den tidiga frågan om att lägga kalendern på särskilda sidor ledde till en tydlig plats för bokning, och den nuvarande sajten använder en direktlänk.

Repots `PROGRESS.md` beskriver arkitekturbesluten och `PIPELINE.md` beskriver publiceringsflödet.

## Bearbetat källmaterial

[Källgenomgången](source-material-review.md) visar vad vart och ett av de 35 bevarade samtalen har bidragit med, vilka lösningar som ersatts och vilket innehåll som behöver mer underlag. Skrivguiderna i privata Daedalus för vidare önskemålet om att fånga erfarenheter och utveckla dem till projekt, essäer och korta uppdateringar. De använder dagens gemensamma Stream och publiceringsflöde.

Nästa innehållsarbete är att bearbeta det befintliga automationsutkastet och samla konkreta erfarenheter till fallstudier. Ett nytt teknikbyte följer inte av genomgången. Föreslagna tjänster, nyhetsbrev och fler medieformat har dokumenterade förutsättningar i källgenomgången.
