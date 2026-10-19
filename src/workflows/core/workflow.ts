import type { Task, WorkflowRun, WorkflowStatus } from "@/types/agent";

export interface WorkflowExecutionContext {
  task: Task;
  updateStatus: (status: WorkflowStatus) => void;
  addActivity: (label: string) => void;
}

export interface WorkflowEngine {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  execute(context: WorkflowExecutionContext): Promise<WorkflowRun>;
}
