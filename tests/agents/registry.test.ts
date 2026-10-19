import { describe, expect, it } from "vitest";
import { ConfigurableAgent } from "@/agents/core/configurable-agent";
import { MockGrokProvider } from "@/agents/providers/mock-grok-provider";
import { AgentRegistry } from "@/agents/registry/agent-registry";

describe("AgentRegistry", () => {
  it("registers and lists agents", () => {
    const registry = new AgentRegistry();
    const agent = new ConfigurableAgent(
      {
        id: "agent-1",
        name: "Planner",
        role: "planner",
        description: "plans",
        enabled: true,
      },
      new MockGrokProvider(),
    );

    registry.register(agent);

    expect(registry.list()).toHaveLength(1);
    expect(registry.get("agent-1")?.definition.role).toBe("planner");
  });
});
