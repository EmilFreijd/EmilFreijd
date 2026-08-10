# Label Legend — emilfreijd-profile

*Auto-generated for emilfreijd-profile (GitHub profil-konfiguration och portfolio).*

---

## Label Sources

This repository receives labels from two central systems:

| Source | Labels Synced | Mechanism |
|--------|---------------|-----------|
| **Hephaestus** | Shared (status, priority) | `sync-labels.yml` workflow (manual dispatch) |
| **Kriterion** | Routing & system labels | `provision_labels.py` via `routing-labels.yml` |

## Shared Labels (from Hephaestus)

Applied to **ALL** repositories in the Personal OS.

### Status

| Label | Color | Description |
|-------|-------|-------------|
| `status:intake` | <span style="display:inline-block;width:16px;height:16px;background:#C5DEF5;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#C5DEF5` | Rå, ej triagerad |
| `status:triage` | <span style="display:inline-block;width:16px;height:16px;background:#E4E669;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#E4E669` | Under klassificering |
| `status:active` | <span style="display:inline-block;width:16px;height:16px;background:#0E8A16;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#0E8A16` | Pågående arbete — synlig WIP |
| `status:blocked` | <span style="display:inline-block;width:16px;height:16px;background:#E4812B;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#E4812B` | Väntar på extern input |
| `status:icebox` | <span style="display:inline-block;width:16px;height:16px;background:#CFD3D7;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#CFD3D7` | Giltig men ej prioriterad (kvartalsvis review) |
| `status:done` | <span style="display:inline-block;width:16px;height:16px;background:#6F42C1;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#6F42C1` | Klar, inväntar stängning |

### Priority

| Label | Color | Description |
|-------|-------|-------------|
| `prio:1-nu` | <span style="display:inline-block;width:16px;height:16px;background:#D93F0B;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#D93F0B` | Denna vecka — hög impact |
| `prio:2-snart` | <span style="display:inline-block;width:16px;height:16px;background:#E4812B;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#E4812B` | Denna månad |
| `prio:3-backlog` | <span style="display:inline-block;width:16px;height:16px;background:#FEF2C0;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#FEF2C0` | Ingen deadline |
| `prio:4-someday` | <span style="display:inline-block;width:16px;height:16px;background:#CCCCCC;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#CCCCCC` | Kanske någon dag |

## Domain Label (from routing-map.yaml)

This repository belongs to the **System domain**.

| Label | Color | Description |
|-------|-------|-------------|
| `domain:system` | <span style="display:inline-block;width:16px;height:16px;background:#0075ca;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#0075ca` | System domain |

## Routing Labels (from Kriterion)

Applied by Kriterion's routing system when issues are routed to/from this repository.

| Label | Color | Description |
|-------|-------|-------------|
| `inbox` | <span style="display:inline-block;width:16px;height:16px;background:#c5def5;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#c5def5` | Rå capture — inte processad ännu |
| `refined` | <span style="display:inline-block;width:16px;height:16px;background:#0e8a16;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#0e8a16` | AI har strukturerat idén |
| `behöver-granskas` | <span style="display:inline-block;width:16px;height:16px;background:#e4e669;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#e4e669` | Väntar på mänsklig routingkommentar |
| `route:approved` | <span style="display:inline-block;width:16px;height:16px;background:#0e8a16;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#0e8a16` | Godkänd routing — exekvera |
| `routing-failed` | <span style="display:inline-block;width:16px;height:16px;background:#d73a4a;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#d73a4a` | Routing kräver åtgärd |
| `routed` | <span style="display:inline-block;width:16px;height:16px;background:#8957e5;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#8957e5` | Routad till destination |
| `routed-from:kriterion` | <span style="display:inline-block;width:16px;height:16px;background:#5319e7;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#5319e7` | Detta issue routades från Kriterion |
| `should-route-to:kriterion` | <span style="display:inline-block;width:16px;height:16px;background:#fbca04;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#fbca04` | Detta issue ska routas till Kriterion |

## Kriterion System Labels (Status)

Core workflow labels used by Kriterion's refinement and routing pipeline.

| Label | Color | Description |
|-------|-------|-------------|
| `status:triage` | <span style="display:inline-block;width:16px;height:16px;background:#fbca04;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#fbca04` | Redo att prioriteras i Kriterion |
| `status:backlog` | <span style="display:inline-block;width:16px;height:16px;background:#d9ecff;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#d9ecff` | Ej redo att starta — i backlog |
| `status:ready` | <span style="display:inline-block;width:16px;height:16px;background:#0075ca;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#0075ca` | Redo att plockas upp |
| `status:in-progress` | <span style="display:inline-block;width:16px;height:16px;background:#d4c5f9;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#d4c5f9` | Pågående arbete |
| `status:blocked` | <span style="display:inline-block;width:16px;height:16px;background:#e11d21;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#e11d21` | Blockerad — kan inte fortsätta |
| `status:done` | <span style="display:inline-block;width:16px;height:16px;background:#22863a;border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span> `#22863a` | Avslutad framgångsrikt |

---

*Generated by `scripts/generate_labels_legend.py`*

**Source files:**
- Hephaestus: `labels.yaml` (shared)
- Kriterion: `label-definitions.yaml` + `routing-map.yaml`