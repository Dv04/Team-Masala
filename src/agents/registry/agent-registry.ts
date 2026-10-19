import type { Agent } from "@/agents/core/agent";

export class AgentRegistry {
  private readonly agents = new Map<string, Agent>();

  public register(agent: Agent): void {
    this.agents.set(agent.definition.id, agent);
  }

  public get(agentId: string): Agent | undefined {
    return this.agents.get(agentId);
  }

  public list(): Agent[] {
    return [...this.agents.values()];
  }
}
