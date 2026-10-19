import { describe, expect, it } from "vitest";
import { resetRuntime, getRuntime } from "@/lib/services/hackathon-runtime";

describe("Mock workflow transitions", () => {
  it("completes submitted tasks in local mock mode", async () => {
    resetRuntime();
    const runtime = getRuntime();

    const task = await runtime.submitTask({
      title: "Run mock flow",
      objective: "confirm lifecycle",
      input: "hello",
    });

    expect(task.status).toBe("completed");
    expect(task.result?.output).toContain("LOCAL MOCK WORKFLOW");
  });
});
