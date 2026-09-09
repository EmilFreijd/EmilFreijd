#!/usr/bin/env python3
"""Generate label legend docs for a destination repo in the Personal OS.

Self-contained, parametrized by repo name + domain. Distributed as
`scripts/generate_labels_legend.py` in each destination repo.

Usage:
    python3 scripts/generate_labels_legend.py --repo Icarus
    python3 scripts/generate_labels_legend.py --repo livspusslet --domain arbete

Generates:
    docs/labels.md          full legend with colors
    docs/labels-summary.md  README snippet
    README.md               upserts a `## Label Legend` section (idempotent)
"""

import argparse
import re
import sys
from pathlib import Path

# Repo -> (domain slug, short description). Matches routing-map.yaml.
REPO_DOMAINS = {
    'apollo': ('halsa', 'Hälsa & fitness — träning, läkarbesök, hälsodata'),
    'demeter': ('halsa', 'Kost, matplanering, nutrition'),
    'prometheus': ('ekonomi', 'Ekonomiskt OS — pengar, investeringar, familjekonomi'),
    'artemis': ('relationer', 'Barnen — uppfostran, aktiviteter, utveckling, skola'),
    'athena': ('relationer', 'Fruns träning och fitnesscoachning'),
    'charon': ('relationer', 'Personlig CRM — kontakter och relationer'),
    'icarus': ('arbete', 'Privat karriär-OS'),
    'daedalus': ('arbete', 'Publicerbart professionellt content'),
    'norumi-lab': ('arbete', 'Norumi-inkubatorn för affärsidéer och experiment'),
    'odyssey': ('gladje', 'Reseplanering'),
    'eu2026-rt': ('gladje', 'EU-roadtrippen 2026 — rutter, boenden, schema'),
    'orpheus': ('gladje', 'Musik — spellistor, musikupptäckter, preferenser'),
    'czn50f': ('gladje', 'Skoda Octavia — service, underhåll, bilrelaterat'),
    'ouroboros': ('gladje', 'Snake-spelet — spelidéer och utveckling'),
    'muninn': ('arv', 'Minnen — bilder, videor, texter att bevara'),
    'arkheion': ('arv', 'Arkivering av personliga dokument'),
    'olympus': ('boende', 'Bostad — underhåll, drift, drömboende'),
    'kairos': ('boende', 'Krisberedskap — hemberedskap, förråd, krisplaner'),
    'hephaestus': ('system', 'Arkitektur- och systembeslut'),
    'herkules': ('system', 'Automationsfabrik'),
    'chronos': ('system', 'Kalender, tidshantering, energibudget'),
    'moira': ('system', 'Fokus, riktning, värden, livsdomäner'),
    'harpocrates': ('system', 'Konton, lösenord, IAM, digital säkerhet'),
    'zeus': ('system', 'Personlig AI-plattform'),
    'emilfreijd-profile': ('system', 'GitHub profil-konfiguration och portfolio'),
    'huginn': ('kunskap', 'Poddar och poddavsnitt'),
    'alexandria': ('kunskap', 'Kunskap från eller om en bok'),
    'hypomata': ('kunskap', 'Referensfakta, personlig wiki'),
    'encheiridion': ('kunskap', 'Insikt, lärdom, visdom, citat'),
    'grimoire': ('kunskap', 'Prompt, AI-instruktion, ramverk eller mall'),
    'book-of-thot': ('kunskap', 'Rå konversation som ska dataminas senare'),
    'theamata': ('gladje', 'Film- och seriearkiv'),
    'livspusslet': ('arbete', 'Familjens mobilitet & transport 2026–2031'),
    'kriterion': ('system', 'Universal capture inbox och routern'),
}

SHARED_LABELS = {
    'status': [
        {'name': 'status:intake', 'color': 'C5DEF5', 'description': 'Rå, ej triagerad'},
        {'name': 'status:triage', 'color': 'E4E669', 'description': 'Under klassificering'},
        {'name': 'status:active', 'color': '0E8A16', 'description': 'Pågående arbete — synlig WIP'},
        {'name': 'status:blocked', 'color': 'E4812B', 'description': 'Väntar på extern input'},
        {'name': 'status:icebox', 'color': 'CFD3D7', 'description': 'Giltig men ej prioriterad (kvartalsvis review)'},
        {'name': 'status:done', 'color': '6F42C1', 'description': 'Klar, inväntar stängning'},
    ],
    'priority': [
        {'name': 'prio:1-nu', 'color': 'D93F0B', 'description': 'Denna vecka — hög impact'},
        {'name': 'prio:2-snart', 'color': 'E4812B', 'description': 'Denna månad'},
        {'name': 'prio:3-backlog', 'color': 'FEF2C0', 'description': 'Ingen deadline'},
        {'name': 'prio:4-someday', 'color': 'CCCCCC', 'description': 'Kanske någon dag'},
    ],
}

DOMAIN_LABELS = {
    'halsa': {'name': 'domain:halsa', 'color': '0075ca', 'description': 'Hälsa & Kapacitet domain'},
    'ekonomi': {'name': 'domain:ekonomi', 'color': '0075ca', 'description': 'Pengar & Frihet domain'},
    'relationer': {'name': 'domain:relationer', 'color': '0075ca', 'description': 'Familj & Nära relationer domain'},
    'arbete': {'name': 'domain:arbete', 'color': '0075ca', 'description': 'Arbete & Skapande domain'},
    'gladje': {'name': 'domain:gladje', 'color': '0075ca', 'description': 'Rytm & Glädje domain'},
    'arv': {'name': 'domain:arv', 'color': '0075ca', 'description': 'Bidrag & Arv domain'},
    'boende': {'name': 'domain:boende', 'color': '0075ca', 'description': 'Hem & Boende domain'},
    'system': {'name': 'domain:system', 'color': '0075ca', 'description': 'System domain'},
    'kunskap': {'name': 'domain:kunskap', 'color': '0075ca', 'description': 'Kunskap domain'},
}

KRITERION_ROUTING_LABELS = [
    {'name': 'inbox', 'color': 'c5def5', 'description': 'Rå capture — inte processad ännu'},
    {'name': 'refined', 'color': '0e8a16', 'description': 'AI har strukturerat idén'},
    {'name': 'behöver-granskas', 'color': 'e4e669', 'description': 'Väntar på mänsklig routingkommentar'},
    {'name': 'route:approved', 'color': '0e8a16', 'description': 'Godkänd routing — exekvera'},
    {'name': 'routing-failed', 'color': 'd73a4a', 'description': 'Routing kräver åtgärd'},
    {'name': 'routed', 'color': '8957e5', 'description': 'Routad till destination'},
    {'name': 'routed-from:kriterion', 'color': '5319e7', 'description': 'Detta issue routades från Kriterion'},
    {'name': 'should-route-to:kriterion', 'color': 'fbca04', 'description': 'Detta issue ska routas till Kriterion'},
]

KRITERION_SYSTEM_LABELS = [
    {'name': 'status:triage', 'color': 'fbca04', 'description': 'Redo att prioriteras i Kriterion'},
    {'name': 'status:backlog', 'color': 'd9ecff', 'description': 'Ej redo att starta — i backlog'},
    {'name': 'status:ready', 'color': '0075ca', 'description': 'Redo att plockas upp'},
    {'name': 'status:in-progress', 'color': 'd4c5f9', 'description': 'Pågående arbete'},
    {'name': 'status:blocked', 'color': 'e11d21', 'description': 'Blockerad — kan inte fortsätta'},
    {'name': 'status:done', 'color': '22863a', 'description': 'Avslutad framgångsrikt'},
]

START_MARKER = "<!-- label-legend:start -->"
END_MARKER = "<!-- label-legend:end -->"


def format_color_swatch(color):
    return f'<span style="display:inline-block;width:16px;height:16px;background:#{color};border:1px solid #999;border-radius:3px;margin-right:8px;vertical-align:middle"></span>'


def generate_table(labels):
    rows = ["| Label | Color | Description |", "|-------|-------|-------------|"]
    for label in labels:
        name = label.get('name', '')
        color = label.get('color', '')
        desc = label.get('description', '')
        color_swatch = format_color_swatch(color)
        rows.append(f"| `{name}` | {color_swatch} `#{color}` | {desc} |")
    return "\n".join(rows)


def generate_repo_legend(repo_name, domain, description):
    lines = []
    lines.append(f"# Label Legend — {repo_name}")
    lines.append("")
    lines.append(f"*Auto-generated for {repo_name} ({description}).*")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Label Sources")
    lines.append("")
    lines.append("This repository receives labels from two central systems:")
    lines.append("")
    lines.append("| Source | Labels Synced | Mechanism |")
    lines.append("|--------|---------------|-----------|")
    lines.append("| **Hephaestus** | Shared (status, priority) | `sync-labels.yml` workflow (manual dispatch) |")
    lines.append("| **Kriterion** | Routing & system labels | `provision_labels.py` via `routing-labels.yml` |")
    lines.append("")
    lines.append("## Shared Labels (from Hephaestus)")
    lines.append("")
    lines.append("Applied to **ALL** repositories in the Personal OS.")
    lines.append("")
    for cat_key, cat_data in SHARED_LABELS.items():
        lines.append(f"### {cat_key.title()}")
        lines.append("")
        lines.append(generate_table(cat_data))
        lines.append("")
    lines.append("## Domain Label (from routing-map.yaml)")
    lines.append("")
    domain_label = DOMAIN_LABELS.get(domain, {'name': f'domain:{domain}', 'color': '0075ca', 'description': domain})
    lines.append(f"This repository belongs to the **{domain_label['description']}**.")
    lines.append("")
    lines.append(generate_table([domain_label]))
    lines.append("")
    lines.append("## Routing Labels (from Kriterion)")
    lines.append("")
    lines.append("Applied by Kriterion's routing system when issues are routed to/from this repository.")
    lines.append("")
    lines.append(generate_table(KRITERION_ROUTING_LABELS))
    lines.append("")
    lines.append("## Kriterion System Labels (Status)")
    lines.append("")
    lines.append("Core workflow labels used by Kriterion's refinement and routing pipeline.")
    lines.append("")
    lines.append(generate_table(KRITERION_SYSTEM_LABELS))
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("*Generated by `scripts/generate_labels_legend.py`*")
    lines.append("")
    lines.append("**Source files:**")
    lines.append("- Hephaestus: `labels.yaml` (shared)")
    lines.append("- Kriterion: `label-definitions.yaml` + `routing-map.yaml`")
    return "\n".join(lines)


def generate_readme_summary(repo_name, domain):
    lines = ["## Label Legend", ""]
    lines.append("| Category | Source | Labels |")
    lines.append("|----------|--------|--------|")
    lines.append("| **Status** | Hephaestus (shared) | `status:intake`, `status:triage`, `status:active`, `status:blocked`, `status:icebox`, `status:done` |")
    lines.append("| **Priority** | Hephaestus (shared) | `prio:1-nu`, `prio:2-snart`, `prio:3-backlog`, `prio:4-someday` |")
    domain_label = DOMAIN_LABELS.get(domain)
    if domain_label:
        lines.append(f"| **Domain** | routing-map.yaml | `{domain_label['name']}` |")
    lines.append("| **Routing** | Kriterion | `inbox`, `refined`, `behöver-granskas`, `route:approved`, `routing-failed`, `routed`, `routed-from:kriterion`, `should-route-to:kriterion` |")
    lines.append("| **Kriterion Status** | Kriterion | `status:triage`, `status:backlog`, `status:ready`, `status:in-progress`, `status:blocked`, `status:done` |")
    lines.append("")
    lines.append("> Full legend with colors and descriptions: [docs/labels.md](docs/labels.md)")
    return "\n".join(lines)


def upsert_readme_section(readme_path, section_md):
    """Insert/replace the label legend section in README, idempotently."""
    wrapped = f"{START_MARKER}\n{section_md.strip()}\n{END_MARKER}"
    if not readme_path.exists():
        readme_path.parent.mkdir(parents=True, exist_ok=True)
        readme_path.write_text("# Repo\n\n", encoding='utf-8')
    content = readme_path.read_text(encoding='utf-8')

    if START_MARKER in content and END_MARKER in content:
        new = re.sub(
            re.escape(START_MARKER) + r".*?" + re.escape(END_MARKER),
            wrapped,
            content,
            flags=re.DOTALL,
        )
    else:
        match = re.search(r"(?ms)^## Label Legend\b.*?(?=^## |\Z)", content)
        if match:
            new = content[:match.start()] + wrapped + "\n\n" + content[match.end():]
        else:
            new = content.rstrip() + "\n\n" + wrapped + "\n"
    readme_path.write_text(new, encoding='utf-8')


def main():
    parser = argparse.ArgumentParser(description="Generate label legend for a destination repo")
    parser.add_argument("--repo", required=True, help="Repo name, e.g. Icarus or livspusslet")
    parser.add_argument("--domain", help="Domain slug, e.g. system (default from known map)")
    parser.add_argument("--description", help="Short repo description")
    args = parser.parse_args()

    repo_key = args.repo.lower().replace('_', '-')
    known = REPO_DOMAINS.get(repo_key)
    domain = args.domain or (known[0] if known else 'system')
    description = args.description or (known[1] if known else 'Personal OS repository')

    repo_root = Path(__file__).parent.parent
    docs_dir = repo_root / "docs"
    docs_dir.mkdir(exist_ok=True)

    legend_md = generate_repo_legend(args.repo, domain, description)
    legend_path = docs_dir / "labels.md"
    legend_path.write_text(legend_md, encoding='utf-8')
    print(f"Generated {legend_path}")

    summary_md = generate_readme_summary(args.repo, domain)
    summary_path = docs_dir / "labels-summary.md"
    summary_path.write_text(summary_md, encoding='utf-8')
    print(f"Generated {summary_path}")

    upsert_readme_section(repo_root / "README.md", summary_md)
    print("Updated README.md")

    return 0


if __name__ == "__main__":
    sys.exit(main())
