---
title: Model routing & tokens
description: The expensive model thinks, the cheap model types — and the knowledge graph keeps context lean.
---

## Auto model routing

| Model | Role | Relative cost/token |
|-------|------|---------------------|
| Opus | Plans, architecture, final verification — **never writes production code** | 15× |
| Sonnet | Builds, refactors, tests; design-scout & learner | 3× |
| Haiku | Summaries, digests, mechanical edits | 1× |

You never switch models manually — each agent is pinned to its tier, and the
loop engine decides which phase runs where. Deep thought is rented by the
minute; Atelier only rents it for decisions.

## The knowledge graph

`workspace/atelier.db` holds rules, plans, criteria, registry, and the
**framework map**. Instead of re-reading giant markdown files every turn,
agents ask:

```
store.py map animation   →  skills/living-graphics/SKILL.md
store.py map bug         →  skills/principal-mind/SKILL.md
store.py rules design    →  the active design rules, pipe-row lean
store.py registry component → shadcn/ui, Aceternity, ReactBits…
```

Rows come back TOON-style (pipe-delimited), a fraction of JSON's token cost.
Skill descriptions stay always-on (~1.7k tokens total); full bodies load only
when the map says they're relevant.

## Why this matters

The combination — right model per phase, right law per topic, lean rows over
fat files — is what lets long builds run without context bloat or
$50-of-Opus-per-refactor bills.
