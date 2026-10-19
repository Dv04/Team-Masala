export interface ToolInput {
  action: string;
  payload: Record<string, unknown>;
}

export interface ToolResult {
  success: boolean;
  output: string;
}

export type ApprovalScope = "none" | "local" | "external";

export interface Tool {
  id: string;
  name: string;
  approvalScope: ApprovalScope;
  execute(input: ToolInput): Promise<ToolResult>;
}
