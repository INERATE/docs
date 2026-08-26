---
title: Installation & Quickstart
description: Get started with pyacri in 5 lines of code or run the local daemon.
---

## Installation

acri is available across Python, TypeScript, and Rust:

### Python (Recommended)

```bash
pip install pyacri
```

### TypeScript / Node.js & Browser

```bash
npm install @acri/core
```

### Rust

```bash
cargo add acri-core
```

---

## 5-Line Python Quickstart

```python
import acri

tools = [
    {"name": "github_merge_pr", "description": "Merge a GitHub pull request"},
    {"name": "slack_post_message", "description": "Send a notification to a Slack channel"},
    {"name": "stripe_create_refund", "description": "Refund a customer charge on Stripe"},
    # ... up to 500+ tools
]

# Resolves the exact top 5 tools in 40µs and calls the model:
result = acri.run(
    query="Merge pull request #42 on the webapp repository",
    tools=tools,
    provider="gemini",
    model="gemini-2.5-flash",
)

print(result.tool_calls)
# -> [{'name': 'github_merge_pr', 'arguments': {'pr_number': 42}}]
```

---

## CLI & Background Daemon

acri includes a CLI for local daemon management:

### 1. Initialize Configuration

```bash
acri init
```
Creates `acri.yaml` in your project root with your MCP servers and provider defaults.

### 2. Validate Setup

```bash
acri check
```
Verifies MCP server connectivity and strips provider-incompatible schema keys.

### 3. Start Local HTTP Daemon

```bash
acri up
```
Starts a high-speed OpenAI-compatible HTTP daemon on `127.0.0.1:8099` with SSE streaming.

### 4. Open Developer Studio

```bash
acri studio
```
Opens the live web visualizer on `http://127.0.0.1:8099/studio` to inspect tool topology and live execution traces.
