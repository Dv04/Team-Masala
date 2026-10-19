# Architecture

- **Frontend**: Next.js App Router dashboard with reusable dark-theme components.
- **Backend**: Next.js API routes with Zod validation and consistent error responses.
- **Runtime**: In-memory state adapter for tasks, workflows, activity.
- **Agents**: Configurable agent interface + registry + provider abstraction.
- **Tools**: Safe tool interface with approval scopes and local example implementation.
- **Workflows**: Extensible workflow engine with lifecycle transitions and bounded retries.
