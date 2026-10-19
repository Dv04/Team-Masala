import type { Task } from "@/types/agent";

export function ResultsPanel({ task }: { task?: Task }) {
  if (!task) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-700 p-6 text-sm text-zinc-500">
        Select a task to see execution details.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="mb-3 text-sm font-semibold text-zinc-200">Results panel</h3>
      <p className="mb-2 text-xs text-zinc-400">Task ID: {task.id}</p>
      <pre className="overflow-x-auto rounded-md bg-zinc-950 p-3 text-xs text-zinc-300">
        {task.result?.output ?? "No output yet"}
      </pre>
      {task.result?.error ? <p className="mt-2 text-xs text-rose-300">{task.result.error}</p> : null}
    </div>
  );
}
