import { getRuntime } from "@/lib/services/hackathon-runtime";
import { handleRouteError } from "@/lib/utils/http";

export async function GET(): Promise<Response> {
  try {
    const runtime = getRuntime();
    return Response.json({
      workflows: runtime.listWorkflows(),
      tools: runtime.listTools().map((tool) => ({
        id: tool.id,
        name: tool.name,
        approvalScope: tool.approvalScope,
      })),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
