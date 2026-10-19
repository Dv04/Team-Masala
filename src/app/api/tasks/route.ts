import { createTaskSchema } from "@/lib/schemas/task";
import { getRuntime } from "@/lib/services/hackathon-runtime";
import { errorResponse, handleRouteError } from "@/lib/utils/http";

export async function GET(): Promise<Response> {
  try {
    const runtime = getRuntime();
    return Response.json({
      tasks: runtime.listTasks(),
      activity: runtime.listActivity(),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return errorResponse("INVALID_JSON", "Invalid JSON payload", 400);
    }

    const parsed = createTaskSchema.parse(body);
    const task = await getRuntime().submitTask(parsed);
    return Response.json({ task }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
