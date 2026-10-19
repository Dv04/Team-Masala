import type { AgentDefinition } from "@/types/agent";

export function AgentCard({ agent }: { agent: AgentDefinition }) {
  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="text-sm font-semibold text-zinc-100">{agent.name}</h3>
      <p className="mt-1 text-xs text-zinc-400">Role: {agent.role}</p>
      <p className="mt-2 text-xs text-zinc-500">{agent.description}</p>
    </article>
  );
}
