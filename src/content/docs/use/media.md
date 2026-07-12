---
title: Media & living graphics
description: AI video, icons with real transparency, scrollytelling, and continuous SVG animations.
---

## The credential ladder (never an error)

| Rung | You have | You get |
|------|----------|---------|
| 1 | `GOOGLE_API_KEY` | Gemini Omni Flash video; Veo 3.1 fallback |
| 2 | Vertex service account | Veo 3.1 / Omni via Vertex |
| 3 | **Nothing** | A filled-in, paste-ready prompt for the Gemini app — download the mp4, drop it in `workspace/references/video/`, continue |

Keys live in `.env` (gitignored), never in the store or commits.

## Native tools

```
assets.py webp <image>      any raster → webp (run on every raster)
assets.py frames <video>    mp4 → webp frame sequence for scroll-scrub
assets.py cut <image>       flat background → true transparency
```

**On transparency:** no image model (Gemini, Imagen, DALL·E) outputs a real
alpha channel. Atelier's recipe: generate the logo/icon on a flat background
(its logo prompt forces this), then `cut` strips it locally — free, offline,
no API. Photos with soft edges: `pip install rembg` (local model, also key-free).

## Scrollytelling

Film → `frames` → the `ScrollScrub` template binds the sequence to scroll —
reversible, canvas-drawn, reduced-motion safe. One hero moment per page; the
design law still governs.

## Living graphics

Cloudflare-style **continuous component animations** — inline SVG schematics
with flowing packets, pulsing nodes, and state-reactive timelines. The
`living-graphics` skill teaches the full ladder: CSS `stroke-dashoffset` flows,
`offset-path` packets, `data-state` switching, and the synchronized
master-timeline pattern (every element shares one cycle, staged by keyframe
windows — never `animation-delay`). The pipeline diagram on
[inerate.github.io](https://inerate.github.io) is built from this recipe:
no video, no library, ~40 lines.
