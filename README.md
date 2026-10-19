# GrokBot Hackathon Starter

Production-ready AI agent hackathon starter for a 4-developer team.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` - local development
- `npm run build` - production build
- `npm run lint` - ESLint
- `npm run typecheck` - TypeScript strict checks
- `npm run test` - Vitest watch
- `npm run test:run` - Vitest one-off run

## Local mock mode

Mock mode works without API keys. Configure environment using `.env.example`.

## API endpoints

- `GET /api/health`
- `GET /api/agents`
- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/workflows`

## Team docs

See `/docs` and `/HACKATHON_START.md`.
