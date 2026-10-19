import { env } from "@/lib/config/env";

export async function GET(): Promise<Response> {
  return Response.json({
    status: "ok",
    mode: env.USE_MOCK_PROVIDER ? "mock" : "provider",
    timestamp: new Date().toISOString(),
  });
}
