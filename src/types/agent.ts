export type TaskStatus =
  | "queued"
  | "running"
  | "waiting_approval"
  | "completed"
  | "failed";

export type WorkflowStatus = "idle" | "running" | "completed" | "failed";

export type AgentRole = string;

export interface AgentMessage {
  id: string;
  agentId: string;
  taskId: string;
  content: string;
  createdAt: string;
}

export interface AgentExecutionResult {
  success: boolean;
  output: string;
  messageLog: AgentMessage[];
  attempts: number;
  error?: string;
}

export interface Task {
  id: string;
  title: string;
  objective: string;
  input: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  workflowId: string;
  result?: AgentExecutionResult;
}

export interface AgentDefinition {
  id: string;
  name: string;
  role: AgentRole;
  description: string;
  enabled: boolean;
}

export interface WorkflowRun {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  taskId?: string;
  updatedAt: string;
}

export interface ActivityEvent {
  id: string;
  taskId: string;
  label: string;
  createdAt: string;
}
