import { createId } from "@/lib/utils/id";
import { nowIso } from "@/lib/utils/time";
import type { CreateTaskInput } from "@/lib/schemas/task";
import type { InMemoryState } from "@/lib/state/in-memory-store";
import type { AgentDefinition, Task } from "@/types/agent";
import type { AgentRegistry } from "@/agents/registry/agent-registry";
import type { WorkflowEngine } from "@/workflows/core/workflow";

export class TaskOrchestrator {
  public constructor(
    private readonly state: InMemoryState,
    private readonly agents: AgentRegistry,
    private readonly workflowEngine: WorkflowEngine,
  ) {}

  public listAgents(): AgentDefinition[] {
    return this.agents.list().map((agent) => agent.definition);
  }

  public listTasks(): Task[] {
    return this.state.tasks;
  }

  public listWorkflows() {
    return this.state.workflows;
  }

  public listActivity() {
    return this.state.activity;
  }

  public async submitTask(input: CreateTaskInput): Promise<Task> {
    const now = nowIso();
    const task: Task = {
      id: createId("task"),
      title: input.title,
      objective: input.objective,
      input: input.input,
      status: "queued",
      createdAt: now,
      updatedAt: now,
      workflowId: createId("workflow"),
    };

    this.state.tasks.unshift(task);

    const workflowRun = await this.workflowEngine.execute({
      task,
      updateStatus: (status) => {
        task.status =
          status === "running"
            ? "running"
            : status === "failed"
              ? "failed"
              : status === "completed"
                ? "completed"
                : task.status;
        task.updatedAt = nowIso();
      },
      addActivity: (label) => {
        this.state.activity.unshift({
          id: createId("activity"),
          taskId: task.id,
          label,
          createdAt: nowIso(),
        });
      },
    });

    this.state.workflows = [workflowRun, ...this.state.workflows.filter((item) => item.id !== workflowRun.id)];

    return task;
  }
}
