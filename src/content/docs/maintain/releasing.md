---
title: Releasing & updates
description: The version-bump contract, seed discipline, and what /atelier:update guarantees.
---

The single rule everything hangs on: **Claude Code only ships what the
`version` field in `.claude-plugin/plugin.json` announces.** Commits without a
bump never reach users — no error, no hint.

## Owner / contributor checklist

1. Make the change; code files stay ≤250 words (CI hard-caps at 350).
2. Keep `db/seed/seed.sql` **idempotent** — core rows via `INSERT OR REPLACE`
   against a unique key, never plain `INSERT`.
3. New skill/tool/agent? Add its `framework_map` row, or agents can never
   find it.
4. **Bump `version`**: patch = fix · minor = new capability · major = breaking
   schema.
5. Commit `release: vX.Y.Z — what changed`, push, confirm CI green. That IS
   the release — no registry, no upload.

Pre-push: `claude plugin validate .`, hooks `--test`, `store.py init` + seed
greps, manifest parse, word audit — exactly what CI runs.

## Users

- Manual: `/plugin update atelier`, then restart.
- Automatic: `/plugin` → Marketplaces → `atelier-marketplace` → **Enable
  auto-update** (third-party marketplaces are off by default).
- Then `/atelier:update` inside a project migrates its store.

## What /atelier:update guarantees

`store.py init` IS the migration: schema is `CREATE IF NOT EXISTS`; the seed is
idempotent and **self-healing** (dedupes, upserts core rows). It never touches
`workspace/overlays/`, plans, criteria, or user-learned registry rows — your
taste and history survive every update.
