export function Sidebar() {
  return (
    <aside className="w-full border-b border-zinc-800 p-4 md:w-72 md:border-r md:border-b-0">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Modules</h2>
      <ul className="mt-3 space-y-2 text-sm text-zinc-200">
        <li>UI Dashboard</li>
        <li>Agent Runtime</li>
        <li>Tool Adapters</li>
        <li>Workflow Engine</li>
      </ul>
      <p className="mt-6 text-xs text-zinc-500">
        Local mode: tasks run in a clearly labeled LOCAL MOCK workflow.
      </p>
    </aside>
  );
}
