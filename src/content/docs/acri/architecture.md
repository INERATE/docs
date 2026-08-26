---
title: Microkernel Architecture
description: Deep dive into acri's capability addressing, MMU press compactor, and container isolation.
---

## 1. Capability Addressing (`acri.compass`)

`acri.compass` implements BM25 retrieval over in-memory inverted indices with query-side synonym expansion (`_ALIASES`).

* **Synonym Expansion:** Normalizes developer phrasing (e.g. `pr` $\to$ `pull request`, `rain` $\to$ `weather`, `text` $\to$ `sms`).
* **Term Weighting:** Pre-computes Inverse Document Frequency (IDF) during `corpus.index()`, leaving only additions and hash lookups in the hot query path.
* **Latency:** Runs in **0.038 ms** (38 µs) on 100 tools.

---

## 2. Memory Compactor (`acri.press`)

When MCP tools return huge JSON payloads (50KB+), dumping raw bytes into LLM context burns thousands of tokens.

`acri.press` solves this:
1. Formats uniform data into TOON-style compact tables.
2. Generates a concise summary digest + a unique handle ID (e.g., `handle_id="res_8492"`).
3. If the LLM ever requires the uncompressed original, it calls `recover(handle_id)`.

---

## 3. Process Isolation (`acri.sandbox`)

`acri.sandbox` wraps stdio MCP subprocesses inside Docker containers:

```python
from acri.sandbox import sandboxed

params = sandboxed(
    command=["npx", "-y", "@modelcontextprotocol/server-filesystem", "/workspace"],
    image="node:20-alpine",
    memory="256m",
    cpus=0.5,
    network=False,
    volumes={"./my-project": "/workspace:ro"}
)
```

* **CPU & RAM Bounds:** Prevents runaway compute loops.
* **Network Isolation:** `--network=none` prevents data exfiltration.
* **Volume Mounts:** Read-only mounts (`:ro`) protect local host files.
