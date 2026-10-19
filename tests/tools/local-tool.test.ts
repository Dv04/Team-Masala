import { describe, expect, it } from "vitest";
import { LocalTextTool } from "@/tools/adapters/local-text-tool";

describe("LocalTextTool", () => {
  it("executes safe local uppercase action", async () => {
    const tool = new LocalTextTool();
    const result = await tool.execute({ action: "uppercase", payload: { text: "hackathon" } });

    expect(result.success).toBe(true);
    expect(result.output).toBe("HACKATHON");
  });

  it("returns unsupported action error", async () => {
    const tool = new LocalTextTool();
    const result = await tool.execute({ action: "delete-file", payload: {} });

    expect(result.success).toBe(false);
  });
});
