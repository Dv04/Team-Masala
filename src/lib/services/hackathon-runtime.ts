import { ConfigurableAgent } from "@/agents/core/configurable-agent";
import { TaskOrchestrator } from "@/agents/orchestrator/task-orchestrator";
import { MockGrokProvider } from "@/agents/providers/mock-grok-provider";
import { AgentRegistry } from "@/agents/registry/agent-registry";
import { createTaskSchema, type CreateTaskInput } from "@/lib/schemas/task";
import { createInitialState } from "@/lib/state/in-memory-store";
import { createId } from "@/lib/utils/id";
import { ToolRegistry } from "@/tools/adapters/tool-registry";
import { LocalTextTool } from "@/tools/adapters/local-text-tool";
import { MockWorkflowEngine } from "@/workflows/core/mock-workflow";

declare global {
  var __grokbotRuntime: HackathonRuntime | undefined;
}

export class HackathonRuntime {
  private readonly state = createInitialState();
  private readonly agents = new AgentRegistry();
  private readonly tools = new ToolRegistry();
  private readonly orchestrator: TaskOrchestrator;

  public constructor() {
    this.tools.register(new LocalTextTool());

    const provider = new MockGrokProvider();
    const defaultAgent = new ConfigurableAgent(
      {
        id: createId("agent"),
        name: "Starter Orchestrator",
        role: "orchestrator",
        description: "Configurable default agent for local mock workflow execution.",
        enabled: true,
      },
      provider,
    );
    this.agents.register(defaultAgent);

    const workflowEngine = new MockWorkflowEngine(this.agents);
    this.orchestrator = new TaskOrchestrator(this.state, this.agents, workflowEngine);
  }

  public listAgents() {
    return this.orchestrator.listAgents();
  }

  public listTasks() {
    return this.orchestrator.listTasks();
  }

  public listWorkflows() {
    return this.orchestrator.listWorkflows();
  }

  public listActivity() {
    return this.orchestrator.listActivity();
  }

  public listTools() {
    return this.tools.list();
  }

  public async submitTask(input: CreateTaskInput) {
    return this.orchestrator.submitTask(createTaskSchema.parse(input));
  }
}

export const getRuntime = (): HackathonRuntime => {
  if (!globalThis.__grokbotRuntime) {
    globalThis.__grokbotRuntime = new HackathonRuntime();
  }
  return globalThis.__grokbotRuntime;
};

export const resetRuntime = (): void => {
  globalThis.__grokbotRuntime = new HackathonRuntime();
};
