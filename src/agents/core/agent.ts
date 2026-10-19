import type { AgentDefinition, AgentExecutionResult, Task } from "@/types/agent";

export interface Agent {
  definition: AgentDefinition;
  execute(task: Task): Promise<AgentExecutionResult>;
}
