---
name: telegram
description: Use when the user requests or triggers the "/telegram" shortcut to pause execution, ask a question on their phone via Agent-Bridge, and resume with the response.
---

# Telegram (Agent-Bridge Interface)

This skill connects the AI agent directly to the user's phone via the Agent-Bridge.

## Direct Command / Usage
When triggered, or whenever you need to prompt the user for input/questions and want to send it directly to their phone:

1. Locate the `scripts/agent-bridge.js` inside the project workspace directory (`/home/yuval/Code/Telegram Opencode Bot/scripts/agent-bridge.js`).
2. Run the interactive prompt command via the `bash` tool:
   ```bash
   node "/home/yuval/Code/Telegram Opencode Bot/scripts/agent-bridge.js" prompt "<Your question here>"
   ```
3. The script will output the user's text reply directly to stdout upon completion. Use that reply to continue execution!
