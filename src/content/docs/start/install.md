---
title: Install & first project
description: Two commands to install, one to bootstrap, and the loop that takes you to shipped.
---

## Install (once, any machine)

```
/plugin marketplace add INERATE/atelier
/plugin install atelier
```

Restart Claude Code once — plugins load at session start. Verify with
`/atelier:status`.

**Staying current:** run `/plugin update atelier` when you like, or flip
auto-update on once: `/plugin` → Marketplaces → `atelier-marketplace` →
**Enable auto-update**. Third-party marketplaces are off by default.

## First project

```
/atelier:bootstrap
```

One shot: creates `workspace/`, initializes the SQLite store (rules, registry,
framework map), probes your environment (Python, Node, ffmpeg, media
credentials), and reports what's available. Run it once per project.

## The loop

| Step | Command | What happens |
|------|---------|--------------|
| 1 | `/atelier:plan <goal>` | Architect (Opus) reads everything, asks unknowns **once**, writes the plan + done-criteria into the store |
| 2 | `/atelier:build` | Builder (Sonnet) executes task by task; design-scout studies premium component source in parallel for UI work |
| 3 | `/atelier:review` | Gates: design tokens only, ≤250 words/file, ponytail, graph impact — evidence recorded per criterion |
| 4 | `/atelier:ship` | Final verification of the whole contract; refuses if anything is unmet |

Anytime: `/atelier:status` shows the active plan and unmet criteria —
including after a restart or compaction; a session hook restores context
automatically.

## Credentials (optional, for AI media)

Put keys in the project `.env` (gitignored — never in the store):
`GOOGLE_API_KEY` for the public Gemini API, or
`GOOGLE_APPLICATION_CREDENTIALS` + `GOOGLE_CLOUD_PROJECT` +
`GOOGLE_CLOUD_LOCATION` for Vertex. **No credentials is fine** — media
generation degrades to a paste-ready prompt, never an error.
