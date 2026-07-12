---
title: Auth & structure laws
description: Production-hardened session architecture, and canonical file trees per stack.
---

## Auth law

Loaded before touching **any** authentication code. The architecture it
enforces: short-lived access tokens, **rotating refresh tokens with token
families** (reuse of a rotated token revokes the whole family), a grace window
for network races, silent refresh in the client, and a sliding session window.
Plus the anti-pattern list that corrupts auth: long-lived JWTs in localStorage,
refresh-token reuse without detection, logout that doesn't revoke.

Full text: [`skills/auth-law/SKILL.md`](https://github.com/INERATE/atelier/blob/main/skills/auth-law/SKILL.md)

## Structure law

Canonical, industrial-standard file trees per stack — Next.js, FastAPI,
monorepo, full platform — with naming rules and the intake questions that
settle layout **once**, so files never wander. Scaffolding and file moves load
this first.

Stack guides ship alongside it: **Next.js**, **FastAPI**, **API/comms**
(REST vs GraphQL vs gRPC vs SSE/WS), **Redis/Celery**, and **RAG** — each with
the five mistakes agents actually make in that stack.

Full text: [`skills/structure-law/SKILL.md`](https://github.com/INERATE/atelier/blob/main/skills/structure-law/SKILL.md)
