import { describe, expect, it } from "vitest";
import { GET, POST } from "@/app/api/tasks/route";
import { resetRuntime } from "@/lib/services/hackathon-runtime";

describe("/api/tasks", () => {
  it("creates task and returns activity", async () => {
    resetRuntime();
    const request = new Request("http://localhost/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        title: "Test task",
        objective: "Validate API",
        input: "payload",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const created = await POST(request);
    expect(created.status).toBe(201);

    const listed = await GET();
    const body = await listed.json();

    expect(body.tasks).toHaveLength(1);
    expect(body.activity.length).toBeGreaterThan(0);
  });

  it("rejects invalid payloads", async () => {
    resetRuntime();
    const badRequest = new Request("http://localhost/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: "x", objective: "y", input: "" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(badRequest);
    expect(response.status).toBe(400);
  });
});
