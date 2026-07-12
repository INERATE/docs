---
title: Design law
description: Premium editorial minimalism with numbers, not vibes — and the banned AI-slop anti-style.
---

When a prompt says "make it premium," it means **exactly this law**. If a choice
isn't covered, pick the calmer, quieter option.

## Tokens, not vibes

- Base `#0A0A0B` dark / `#FAFAF8` light; raised surfaces `#141518` / `#FFFFFF`
- Hairlines `rgba(255,255,255,.08)` — depth from layering and top-light insets, **not drop shadows**
- **ONE accent color**, budgeted ≤10% of any viewport
- Radius: 8 inputs / 12 cards / 16 modals / full pills · ≥96px between landing sections
- Type: grotesk display with −2% tracking, serif-italic for ONE phrase per major headline, tabular numerals for data
- Every color/radius/shadow lives as a CSS variable in one place. A hardcoded hex in a component is a review failure.

## Motion

Entrances on `cubic-bezier(0.16,1,0.3,1)`; springs for interaction (max one
overshoot). Micro 150–250ms, element 300–500ms; longer than 1s only when
scroll-scrubbed. ONE hero moment per page. `prefers-reduced-motion` → fades
only. Animate transform/opacity only.

## The anti-style (banned outright)

Rainbow and purple-pink gradient heroes · glossy 3D emoji icons · colored icon
circles in 8 hues · heavy card shadows · bounce-in animations · fake dashboard
screenshots · multiple accents · full-page spinners. **If it looks like a
template, delete it.**

## How agents use it

The `gateway` skill resolves which design files are authoritative (core law +
your learned overlays) at the start of every UI task. Components come from real
registries (shadcn/ui, Aceternity, ReactBits via MCP) and get restyled to
tokens — never hallucinated.

Full text: [`skills/design-law/SKILL.md`](https://github.com/INERATE/atelier/blob/main/skills/design-law/SKILL.md)
