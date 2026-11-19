---
title: Design law
description: The base layer for every interface — a look chosen for each product, fluid motion, custom icons, and a scan that removes anything that reads as AI-generated.
---

Design law v2 is the **base module** for UI work, the way a standard library
sits under a program. Say "use Atelier" and it applies automatically; nobody has
to name it. The goal: every product gets a design that fits it, and nothing
looks generated. A research site, a PDF tool, an LMS and a game launch should
not look like siblings.

## The procedure

1. **Gateway** loads the core law plus your learned overlays.
2. **Archetype** (A1–A10) sets structure: marketing, research/institution, tool,
   app workspace, learning, commerce, docs, launch, portfolio, data story. A tool
   puts the tool above the fold; a research site leads with type and imagery.
3. **Register** (R1–R8) sets the look, chosen by evidence: tinted workspace,
   dusk gradient, atmospheric glass, editorial research, graphite studio,
   blueprint dark, daylight glass, ink & ivory. Projects in one workspace must
   not converge on the same register and hues.
4. **Fluid interface:** shell, transitions, liquid glass and placement.
5. **Icon law:** a custom SVG family per project.
6. **AI-tell scan** on every screen before review.

## Color from evidence

Choose one system per surface: a single accent (≤10% of a viewport), a tint
family (3–4 equal-lightness pastels used as category surfaces), or a gradient
field with one highlight. Gradients are composed light: 2–3 neighbouring hues
mixed in OKLCH and diluted toward the canvas, with grain against banding. They
are banned only as decoration. Green needs direct brand or subject evidence.

## Fluid interface

- **Three clocks:** acknowledge on press (<100 ms), settle with a spring, and
  report the real work honestly.
- **Latest input wins:** A → B → C lands on C, and panels reopen mid-close.
- **macOS-grade transitions:** things open from their origin; the dock and
  utilities stay still while content changes (View Transitions, shared
  elements, a sliding dock capsule).
- **Liquid glass on chrome only:** tint + blur + specular rim, with optional
  refraction. Reduced-transparency and plain-background fallbacks are required.
- **Intelligent placement:** compare dock vs sidebar against real content;
  utilities top right; contextual tools beside their object.

## Custom icons

Each project draws its own SVG family: one grid, one stroke, one signature
trait, and product-specific metaphors. Icons animate on state (plus → close,
check draws), on parent hover (arrow nudge, lid lifts), or ambiently for live
status only. Default `lucide-react`, `react-icons` and Heroicons are not
shipped as the visible family, and neither are the icons AI reaches for:
robot heads for chatbots, sparkles or wands for "AI", brains, rockets,
lightbulbs. An assistant gets a name and the brand mark. A 12-icon starter
family lives in `templates/icons/`.

## Imagery makes it alive

A page of cards and icons alone reads as a template. Every entry view has a
primary visual and every major section a visual anchor: 3D-feeling object
renders with light, material and depth (pointer tilt or parallax — the Apple
effect), real photography, product UI, register-styled illustration, data
visualization, animated icons or short muted loops. One light direction and
one material language across all of it.

## Tokens, not vibes

Every color, radius, shadow, blur, duration and easing is a CSS variable in one
file. Themes swap variable sets on `:root[data-theme]`, and dark mode is
designed, not inverted. A hardcoded hex in a component is a review failure.

## Start from templates

`templates/registers/` has token files for all eight registers (light and
dark, every text pair ≥ 4.5:1). Copy `_shared.css` plus one register, then
tune it to the evidence.

## The AI-tell scan (banned outright)

Default library look shipped unchanged · purple-to-pink gradient text and glow
blobs · icons in tinted squares in three-column feature grids · sparkles for
"AI" · emoji as icons · glass on every card · bounce-ins and perpetual shimmer ·
fake metrics, logos and testimonials · "unlock / elevate / seamless" copy ·
"Get started" + "Learn more" · the same layout for every product. **If it looks
like a template, or like the last project, redo it.**

Run `python scripts/tell_scan.py <project>` to check code automatically: it
reports each hit as `file:line rule -> fix` and exits 1, so it can gate CI.

Full text: [`design-law`](https://github.com/INERATE/atelier/blob/main/skills/design-law/SKILL.md) ·
[`fluid-interface`](https://github.com/INERATE/atelier/blob/main/skills/fluid-interface/SKILL.md) ·
[`icon-law`](https://github.com/INERATE/atelier/blob/main/skills/icon-law/SKILL.md)
