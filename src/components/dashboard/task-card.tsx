import { StatusBadge } from "@/components/ui/status-badge";
import type { Task } from "@/types/agent";

export function TaskCard({ task, onSelect }: { task: Task; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-left transition hover:border-cyan-500"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-zinc-100">{task.title}</h3>
        <StatusBadge status={task.status} />
      </div>
      <p className="line-clamp-2 text-xs text-zinc-400">{task.objective}</p>
    </button>
  );
}
