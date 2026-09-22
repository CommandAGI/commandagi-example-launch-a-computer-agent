# launch-an-agent

Create a session, attach a Standard Computer, and hand the agent a task — the three-call quickstart.

```bash
export COMMANDAGI_API_KEY=cagi_…
node index.mjs "Clone github.com/me/repo, run the tests, and summarize failures"
```

It prints a `https://commandagi.com/session/<id>` link — open it to watch the agent work, talk to
it, take remote control, or snapshot the machine.

Billing is pay-in-advance at the offering's rate; the machine auto-snapshots and stops when idle.
See https://commandagi.com/docs/billing.
