---
title: Clean-code law
description: 250 words per file, enforced by a hook — plus the ponytail reflex that writes less code in the first place.
---

## The budget

Every source file is budgeted at **250 words** (hard cap 350, enforced by a
pre-write hook and CI — not a review comment). Bloat physically cannot land.
Big features become small, navigable modules; DRY is checked against the
knowledge graph, not memory.

The framework holds itself to the same cap — every `.py` in Atelier passes its
own audit.

## The ponytail reflex

Before every line, the agent interrogates itself on a descending ladder and
stops at the first rung that holds:

1. **Does this need to exist at all?** (YAGNI)
2. **Already in this codebase?** Reuse it.
3. **Standard library does it?** Use it.
4. **Can it be one line?** One line.
5. Only then — the minimum that works.

Deliberate shortcuts are marked with a `ponytail:` comment naming the ceiling
and the upgrade path, so deferred work is tracked instead of forgotten.

## Comment policy

Comments state constraints the code can't show — never what the next line does
or why a change is correct. Root-cause fixes over symptom patches: one guard in
the shared function beats a guard in every caller.

Full text: [`skills/clean-code-law/SKILL.md`](https://github.com/INERATE/atelier/blob/main/skills/clean-code-law/SKILL.md)
