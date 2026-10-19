import { getRuntime } from "@/lib/services/hackathon-runtime";
import { handleRouteError } from "@/lib/utils/http";

export async function GET(): Promise<Response> {
  try {
    return Response.json({ agents: getRuntime().listAgents() });
  } catch (error) {
    return handleRouteError(error);
  }
}
