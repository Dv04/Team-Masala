import type { AgentRegistry } from "@/agents/registry/agent-registry";
import { withRetry } from "@/lib/utils/retry";
import { nowIso } from "@/lib/utils/time";
import { LOCAL_MOCK_WORKFLOW } from "@/workflows/examples/local-mock-workflow";
import type { WorkflowEngine, WorkflowExecutionContext } from "@/workflows/core/workflow";

export class MockWorkflowEngine implements WorkflowEngine {
  public readonly id = LOCAL_MOCK_WORKFLOW.id;
  public readonly name = LOCAL_MOCK_WORKFLOW.name;
  public readonly description = LOCAL_MOCK_WORKFLOW.description;

  public constructor(private readonly registry: AgentRegistry) {}

  public async execute(context: WorkflowExecutionContext) {
    context.updateStatus("running");
    context.addActivity("Workflow started");

    const firstAgent = this.registry.list().find((agent) => agent.definition.enabled);
    if (!firstAgent) {
      context.updateStatus("failed");
      context.addActivity("No enabled agent found");
      return {
        id: context.task.workflowId,
        name: this.name,
        description: this.description,
        status: "failed" as const,
        taskId: context.task.id,
        updatedAt: nowIso(),
      };
    }

    context.addActivity(`Executing agent: ${firstAgent.definition.name}`);

    const execution = await withRetry(async () => firstAgent.execute(context.task), 1);

    if (!execution.value || !execution.value.success) {
      context.task.result = {
        success: false,
        output: "",
        attempts: execution.attempts,
        messageLog: [],
        error: execution.error ?? "Agent execution failed",
      };
      context.updateStatus("failed");
      context.addActivity("Workflow failed");
      return {
        id: context.task.workflowId,
        name: this.name,
        description: this.description,
        status: "failed" as const,
        taskId: context.task.id,
        updatedAt: nowIso(),
      };
    }

    context.task.result = {
      ...execution.value,
      attempts: execution.attempts,
    };
    context.updateStatus("completed");
    context.addActivity("Workflow completed");

    return {
      id: context.task.workflowId,
      name: this.name,
      description: this.description,
      status: "completed" as const,
      taskId: context.task.id,
      updatedAt: nowIso(),
    };
  }
}
