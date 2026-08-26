---
title: What is acri?
description: The 40µs capability resolution microkernel for AI agents.
---

**acri** (`pyacri`) is a high-speed capability resolution microkernel for AI agents. It eliminates prompt bloat by indexing 500+ MCP tools and selecting the exact top candidates in **40 microseconds** (0.040 ms).

```
┌─────────────────────────────────────────────────────────────┐
│                 THE ACRI AGENT MICROKERNEL                  │
│                                                             │
│  1. Capability Addressing         ──▶ compass.resolve()     │
│  2. In-Memory Registry            ──▶ corpus.index()        │
│  3. Model Abstraction Layer (HAL) ──▶ port.gemini / .openai │
│  4. Memory Management Unit (MMU)  ──▶ press.compact()       │
│  5. Process & Container Sandbox   ──▶ sandbox.sandboxed()   │
│  6. Real-Time Trace Visualizer    ──▶ acri studio (:8099)   │
└─────────────────────────────────────────────────────────────┘
```

## Why acri?

When building tool-calling AI agents, developers often dump 50 to 500 tool schemas directly into the LLM system prompt. This causes **three catastrophic problems**:

1. **Context Window Bloat & Cost:** 100 tools consume ~15,000 tokens on *every single turn*.
2. **Model Confusion & Hallucinations:** Live benchmark accuracy drops from **92% to 84%** because the model struggles to choose among hundreds of competing JSON schemas.
3. **Prefix-Cache Invalidation:** In-turn tool swapping breaks provider KV prompt caching.

acri solves this at the microkernel layer:

* **0.040 ms Latency:** Pure in-memory BM25 inverted index with query-side synonym expansion.
* **100% Recall@5:** Discovers the exact needed tools across 100 enterprise candidates.
* **95% Prompt Reduction:** Sends 5 relevant tools instead of 100+, saving thousands of tokens per request.
* **Exact-Match Cache:** $0.00 cost and 0ms latency for repeated turns.
* **Docker Container Sandboxing:** Isolates MCP tools with CPU, RAM, and network boundaries.

## Architecture Boundaries

acri follows the **Unix Philosophy**: do one thing and do it with sub-millisecond precision.

* **What acri IS:** A capability resolution microkernel (tool indexing, ranking, gating, payload compaction, and container sandboxing).
* **What acri IS NOT:** An orchestration framework, graph engine, or autonomous agent loop. Orchestration is left to your own application or framework calling `acri.run()`.
