# launch-a-computer-agent

Part of [CommandAGI](https://commandagi.com): connecting agents to real computers, robots and
physical environments. This repository can be cloned independently of the private platform code.

```sh
git clone https://github.com/CommandAGI/commandagi-example-launch-a-computer-agent.git
cd commandagi-example-launch-a-computer-agent
```

## Compatibility and validation

This is a focused reference example, not a production device runtime. The source and instructions
are public so integrations can be understood and adapted. Local syntax checks do not verify live
API compatibility. Some examples retain earlier session/device API contracts; inspect the calls in
the source against your target environment before running them. No live rental, order, paid compute
or hardware-motion test was performed as part of the repository rename.


Create a session, attach a Standard Computer, and hand the agent a task — the three-call quickstart.

```bash
export COMMANDAGI_API_KEY=cagi_…
node index.mjs "Clone github.com/me/repo, run the tests, and summarize failures"
```

It prints a `https://commandagi.com/session/<id>` link — open it to watch the agent work, talk to
it, take remote control, or snapshot the machine.

Billing is pay-in-advance at the offering's rate; the machine auto-snapshots and stops when idle.
See https://commandagi.com/docs/billing.

## License

[MIT](LICENSE).
