import type { Tool } from "@/tools/core/tool";

export class ToolRegistry {
  private readonly tools = new Map<string, Tool>();

  public register(tool: Tool): void {
    this.tools.set(tool.id, tool);
  }

  public list(): Tool[] {
    return [...this.tools.values()];
  }

  public get(toolId: string): Tool | undefined {
    return this.tools.get(toolId);
  }
}
