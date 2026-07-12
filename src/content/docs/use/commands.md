---
title: Commands
description: The complete /atelier command surface.
---

| Command | What it does |
|---------|--------------|
| `/atelier:bootstrap` | One-shot setup: workspace, SQLite store, environment doctor, companion check. Once per project. |
| `/atelier:clarify` | Understand-first: reads everything, then asks only the true unknowns, batched once. |
| `/atelier:plan` | Architect writes the plan and the **done-state contract** (measurable criteria) into the store. |
| `/atelier:build` | Executes the plan through the loop engine. Refuses to finish with unmet criteria. |
| `/atelier:review` | Runs the gates — ponytail, graph impact, lint/typecheck, design tokens, file sizes — and records evidence per criterion. |
| `/atelier:ship` | Final release gate: verifies the entire contract, produces the ship report. |
| `/atelier:status` | Current phase: active plan, met/unmet criteria, capabilities, recent activity. |
| `/atelier:doctor` | Health check: environment, store integrity, companion MCPs, graph freshness. |
| `/atelier:learn` | Ingests screenshots, URLs, code, repos → workspace overlays and registry rows. |
| `/atelier:promote` | Promotes an overlay into the project's git-tracked design docs. |
| `/atelier:update` | Pulls the latest plugin guidance, migrates the store (idempotent, self-healing), verifies health. |

## Where state lives

Everything durable sits in `workspace/atelier.db` — plans, criteria, rules,
registry, learning events — served as token-lean pipe rows, not JSON. A
SessionStart hook surfaces the active plan and unmet criteria after any restart
or compaction, so work resumes exactly where it stopped.
