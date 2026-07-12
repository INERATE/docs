---
title: Privacy policy
description: Atelier runs entirely on your machine and collects no data.
---

**Last updated: July 12, 2026**

Atelier is an open-source Claude Code plugin. It runs entirely on your machine.

## What we collect

Nothing. Atelier has no servers, no telemetry, no analytics, and no account
system. We never see your code, your prompts, or your usage.

## Where your data lives

- **Project files, plans, and overlays** stay in your project's `workspace/`
  directory on your machine.
- **The knowledge store** is a local SQLite file inside your project. It never
  leaves your disk.
- **API keys and credentials** are read from your project's `.env` file, which
  is gitignored by default. Atelier never stores credentials in its database
  and never transmits them anywhere except directly to the service you
  configured them for.

## Third-party services

Some optional Atelier features call external APIs **only when you configure
them yourself** — for example media generation (Google Gemini) or maps
(Mapbox). When you use those features, your requests go directly from your
machine to that provider under **their** privacy policy. Atelier adds no
intermediary and no logging.

Claude Code itself is governed by
[Anthropic's privacy policy](https://www.anthropic.com/legal/privacy).

## Changes

If this policy ever changes, the update will be committed to the public
repository at
[github.com/INERATE/atelier](https://github.com/INERATE/atelier), where the
full history is visible.

## Contact

Questions: open an issue on
[GitHub](https://github.com/INERATE/atelier/issues) or email
`piyushkumar40515s@gmail.com`.
