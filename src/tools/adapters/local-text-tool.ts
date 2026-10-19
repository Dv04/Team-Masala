import type { Tool, ToolInput, ToolResult } from "@/tools/core/tool";

export class LocalTextTool implements Tool {
  public readonly id = "local-text-tool";
  public readonly name = "Local Text Transform";
  public readonly approvalScope = "local" as const;

  public async execute(input: ToolInput): Promise<ToolResult> {
    if (input.action !== "uppercase") {
      return { success: false, output: "Unsupported local action" };
    }

    const text = String(input.payload.text ?? "");
    return { success: true, output: text.toUpperCase() };
  }
}
