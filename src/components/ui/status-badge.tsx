import type { TaskStatus } from "@/types/agent";

const styles: Record<TaskStatus, string> = {
  queued: "bg-zinc-700 text-zinc-100",
  running: "bg-blue-700 text-blue-100",
  waiting_approval: "bg-amber-700 text-amber-100",
  completed: "bg-emerald-700 text-emerald-100",
  failed: "bg-rose-700 text-rose-100",
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
}
