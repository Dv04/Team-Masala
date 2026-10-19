import type { ActivityEvent } from "@/types/agent";

export function ActivityTimeline({ events }: { events: ActivityEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-700 p-4 text-sm text-zinc-500">
        No activity yet.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="mb-3 text-sm font-semibold text-zinc-200">Activity timeline</h3>
      <ul className="space-y-2">
        {events.slice(0, 8).map((event) => (
          <li key={event.id} className="text-xs text-zinc-400">
            <span className="text-zinc-500">{new Date(event.createdAt).toLocaleTimeString()} · </span>
            {event.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
