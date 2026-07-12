---
title: Self-learning
description: Teach Atelier your taste — screenshots, URLs, code, whole repos — permanently.
---

The core design law is versioned and never edited at runtime. Your taste lands
in **overlays** that extend it.

## The flow

1. **`/atelier:learn <anything>`** — a screenshot of a design you admire, a URL,
   a code snippet, a repo. The learner agent distills it into
   `workspace/overlays/NNN-<slug>.md`: concrete rules ("tighter letter-spacing
   on display type", "this footer pattern"), plus registry rows for any
   components or sites it found.
2. The **gateway** skill resolves core law + overlays at the start of every UI
   task — your taste is simply *in force* from then on.
3. **`/atelier:promote`** — when an overlay has proven itself, promote it into
   `docs/design/` in your project: git-tracked, permanent, reviewed like code.

## Boundaries

- Overlays are **per-project, per-user**. Other users of the plugin train their
  own; nothing leaks between projects.
- The learner **never edits core framework files** — core stays pristine and
  updatable.
- Want your taste in the global framework? That's a PR to
  [INERATE/atelier](https://github.com/INERATE/atelier).

## What else it can ingest

New skills and MCP servers too: the `mcp-maker` skill turns a component site,
asset library, or API into a registry row, a skill, or a full MCP server —
so "add this site to Atelier" is a first-class request.
