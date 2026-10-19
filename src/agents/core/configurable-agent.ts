import { createId } from "@/lib/utils/id";
import { nowIso } from "@/lib/utils/time";
import type { AIProvider } from "@/agents/providers/provider";
import type { Agent } from "@/agents/core/agent";
import type { AgentExecutionResult, Task } from "@/types/agent";

export class ConfigurableAgent implements Agent {
  public constructor(
    public definition: Agent["definition"],
    private readonly provider: AIProvider,
  ) {}

  public async execute(task: Task): Promise<AgentExecutionResult> {
    const response = await this.provider.execute({
      role: this.definition.role,
      objective: task.objective,
      input: task.input,
    });

    return {
      success: true,
      output: response.output,
      attempts: 1,
      messageLog: [
        {
          id: createId("msg"),
          agentId: this.definition.id,
          taskId: task.id,
          content: response.output,
          createdAt: nowIso(),
        },
      ],
    };
  }
}
