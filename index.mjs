#!/usr/bin/env node
// Launch an agent into a real cloud computer and give it a task.
// Usage: COMMANDAGI_API_KEY=cagi_… node index.mjs "Clone the repo and run the tests"

const API = process.env.COMMANDAGI_API_URL ?? "https://api.commandagi.com";
const KEY = process.env.COMMANDAGI_API_KEY;
if (!KEY) throw new Error("Set COMMANDAGI_API_KEY (https://commandagi.com/api-keys)");

const task = process.argv[2] ?? "Open a terminal and show the current directory.";

async function api(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { authorization: `Bearer ${KEY}`, "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

// 1. See what a Standard Computer costs (offerings are priced in credits; 1 credit = $0.01).
const { offerings } = await api("/offerings");
const standard = offerings.find((o) => o.id === "standard-computer");
console.log(`Standard Computer: ${standard.creditsPerMinute} credits/min ($${(standard.creditsPerMinute / 100).toFixed(2)}/min)`);

// 2. Create a session (the agent's workspace).
const { sessionId } = await api("/sessions", { method: "POST", body: { title: task, modelId: "openai/gpt-5.1" } });
console.log(`session: ${sessionId}`);

// 3. Attach a computer. You're billed pay-in-advance while it runs.
const attach = await api(`/sessions/${sessionId}/computers`, {
  method: "POST",
  body: { snapshotId: "computer/software-engineer" },
});
if (attach.status && attach.status !== "granted") {
  console.error(`could not start: ${attach.reason ?? attach.status}`);
  process.exit(1);
}

console.log(`\nWatch it live: https://commandagi.com/session/${sessionId}`);
console.log(`Stop it from the session view, or POST /sessions/${sessionId}/stop`);
