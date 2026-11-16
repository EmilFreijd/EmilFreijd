# Så växte emilfreijd.se fram

## Från blogg till portfolio

Den första versionen utgick från en svensk blogg på Posthaven. Tanken var att använda den egna domänen som en samlad ingång till artiklar, professionell bakgrund och kontakt. LinkedIn kunde hjälpa läsare att upptäcka innehållet. Webbplatsen gav artiklar och andra arbeten en adress som gick att länka tillbaka till.

Arbetet med Posthaven-temat konkretiserade hur en besökare skulle hitta rätt. Startsidan skulle snabbt visa vem sajten tillhör och vad läsaren kan hitta där. En om-sida skulle ge sammanhang och en kontaktsida skulle ge besökaren en tydlig väg vidare. Tidiga förslag innehöll också en separat tjänstesida, ett resursbibliotek och ett nyhetsbrev. De var idéer för framtida innehåll.

## Hur idéerna syns i Astro-sajten

| Del | Nuvarande upplägg |
| --- | --- |
| Startsida | En kort introduktion, kompetensområden, länkar till arbeten och en tydlig kontaktväg. |
| Om-sida | Yrkesbakgrund, arbetssätt, utbildning och meriter i ett läsbart format på webben. |
| Stream | En gemensam ingång till case, projekt, essäer och uppdateringar. Innehållet ligger i MDX. |
| Kontakt | Kontaktformulär och länkar till LinkedIn och mötesbokning. |
| Språk | Engelska som huvudspråk och svenska under `/sv/`. |

Astro-migreringen i maj 2026 flyttade layout, innehåll och publicering till Git-repot. GitHub Actions bygger den statiska sajten. GitHub Pages publicerar den på den egna domänen.

## Så används historiken i den uppdaterade versionen

Startsidan leder till publicerade arbeten och till kontakt på samma språk. De senaste arbetena fyller kortlistan när det finns plats efter redaktionellt utvalda inlägg. Om-sidan beskriver aktuellt ansvar och länkar vidare till kontakt. På mobil fungerar menyn med både tangentbord och pekskärm.

Arbetskällorna förvaras privat. Projektbeslut och kontrollerat innehåll hör hemma i det publika repot. Publiceringsflödet beskriver vilka underlag som kan följa med en ändring.

## Lärdomar från temaarbetet

- Kontrollera mobilnavigation, sidfot och favicon på den byggda sajten. De är lätta att förbise när granskningen fokuserar på startsidan.
- Låt datum och innehållsdata styra listor med senaste inlägg. Det minskar behovet av handplockade poster och gör sorteringen möjlig att verifiera.
- Kontrollera titel, metabeskrivning och canonical-URL i sidans renderade HTML. En korrekt mall behöver också ge rätt värde på varje publicerad sida.
- Håll bokning som ett val på kontaktsidan. Den tidiga frågan om att lägga kalendern på särskilda sidor ledde till en tydlig plats för bokning, och den nuvarande sajten använder en direktlänk.

Repots `PROGRESS.md` beskriver arkitekturbesluten och `PIPELINE.md` beskriver publiceringsflödet.
