# Hackathon Start Runbook

## First 15 minutes after challenge reveal

1. Define the problem and likely demo scope.
2. Identify required agent roles.
3. Define required tools and external integrations.
4. Assign parallel ownership:
   - Dev 1: frontend/dashboard
   - Dev 2: agent/workflow logic
   - Dev 3: tool/API integrations
   - Dev 4: tests/docs/demo reliability
5. Configure challenge-specific workflow in `src/workflows/`.
6. Implement minimum end-to-end path from UI → API → workflow → result.
7. Integrate, test, and finalize demo flow.

## 5-minute preflight checklist (each teammate)

- Pull latest branch and run `npm install`.
- Confirm `.env.local` values (mock mode works by default).
- Run `npm run lint` and `npm run typecheck`.
- Run `npm run test:run`.
- Launch `npm run dev` and verify dashboard loads.

## How to extend quickly

- Add new agent: `src/agents/core`, `src/agents/registry`, runtime registration.
- Add new tool: implement `Tool` interface in `src/tools/adapters` and register in runtime.
- Add API integration: create adapter under `src/tools/adapters` or `src/agents/providers`.
- Add workflow: implement `WorkflowEngine` in `src/workflows/core` and wire through orchestrator.
- Add page/UI component: add component under `src/components/*`, render from `src/app/page.tsx`.
