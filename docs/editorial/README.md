# Från erfarenhet till publicerad text

Skrivstödet kommer från arbetet med den personliga hemvisten och har anpassats till repots nuvarande Stream. Börja med en verklig erfarenhet, välj vad läsaren ska få med sig och skriv sedan texten. Formulären hjälper till att få fram underlaget; de är inga färdiga artiklar.

## Välj ingång

| Du har | Börja här | Möjligt format |
| --- | --- | --- |
| En händelse, observation eller halvfärdig tanke | [Fånga en erfarenhet](experience-capture.md) | Välj efter intervjun |
| Ett konkret problem och något du gjort åt det | [Projekt och fallstudier](project-intake.md) | `project` eller `case` |
| En tes eller lärdom att utveckla | [Essä](essay-intake.md) | `essay` |
| En kort lärdom eller förändring att dela | [Uppdatering](update-intake.md) | `update` |

Kopiera prompten till en arbetschatt och lägg till ditt underlag. Svara gärna med egna ord eller diktering. Behåll arbetsanteckningar och svar privat tills de är granskade. Även filer i `docs/`, publika GitHub-issues och PR-grenar är offentliga när de pushas till detta repo.

## Arbetsgång

1. Samla händelsen, din faktiska roll, beslut, utfall och källor. Fråga efter luckor.
2. Välj en vinkel som hjälper en läsare att förstå eller göra något.
3. Skilj på observerade resultat, egen tolkning och framtida ambition. Låt saknade belägg vara synliga i det privata underlaget.
4. Granska vad som kan publiceras. Ta bort personuppgifter, interna arbetsgivaruppgifter och material som kräver tillstånd. Ett pseudonymiserat namn gör inte automatiskt resten av en berättelse publicerbar.
5. Skriv en första version nära Emils egna formuleringar. Läs den högt och ta bort överdrifter och generiska påståenden.
6. Skapa engelska och svenska versioner med samma sakuppgifter. Använd [PIPELINE.md](../../PIPELINE.md) och aktuellt schema i `src/content.config.ts`.
7. Lägg den granskade texten i en innehållsissue eller en separat MDX-gren. Kontrollera båda språkens sidor och kör `scripts/verify.sh` före publicering.

## Gemensam instruktion för alla intervjuer

```text
Hjälp mig samla underlag för min personliga hemsida. Ställ högst tre
konkreta frågor åt gången och följ upp det jag faktiskt säger.
Skilj mina egna insatser från teamets. Hitta inte på resultat, siffror,
citat, kundrelationer eller motiv. Be mig förtydliga vad som är belagt,
vad som är min tolkning och vad som fortfarande är en ambition.

Utgå från mina egna ord. Undvik säljfraser och psykologiska omdömen om mig.
Fråga vad läsaren ska kunna ta med sig. Markera privata eller osäkra
uppgifter i arbetsunderlaget och utelämna dem ur publiceringsförslaget.
Skriv inget färdigt publiceringsutkast innan material och vinkel räcker.
Avsluta med: verifierade fakta, föreslagen vinkel, bästa format,
saknade underlag och ett konkret nästa steg.
```

## Koppling till dagens innehållsmodell

Den äldre prototypens `stories`, `projects` och `updates` samlas här i `src/content/stream/`. `story` motsvaras av `kind: essay`. Roll, problem, utfall och läsarvärde blir delar av brödtexten och beskrivningen. Lägg inte till prototypens gamla frontmatter-fält som `readerValue`, `publishDate` eller `relatedProjects`; de ingår inte i nuvarande schema. Relaterade texter kan länkas i brödtexten.

Ange verkligt publiceringsdatum. Använd `featured` som ett redaktionellt val och `metrics` bara för styrkta, publicerbara uppgifter. En kvalitativ lärdom räcker när det saknas meningsfulla siffror.

Första användningar finns i [källgenomgångens arbetsordning](../source-material-review.md#arbetsordning-för-kvarvarande-innehåll).

## Publicering och distribution som går att följa upp

De äldre planeringssamtalen innehåller ett förslag om att testa ett återkommande LinkedIn-format i tolv veckor. Det kan användas när det finns ett ämne och utrymme att skriva. Det är inget pågående åtagande eller löfte på sajten.

Välj ett format, en rimlig frekvens och ett startdatum. Publicera den beständiga texten på sajten och dela en kort introduktion med länken på LinkedIn. Följ upp läsarfrågor, relevanta samtal och vad arbetet tog i tid. Notera gärna räckvidd som kontext, men skilj den från faktiska kontakter och återkoppling. Använd privata anteckningar för uppföljningen; samla inte kontaktpersoner i det publika repot. Utvärdera om rutinen ger användbara samtal och går att hålla innan du utökar den.
