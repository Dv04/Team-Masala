import type { AIProvider, ProviderRequest, ProviderResponse } from "@/agents/providers/provider";

export class MockGrokProvider implements AIProvider {
  public name = "mock-grok-provider";

  public async execute(request: ProviderRequest): Promise<ProviderResponse> {
    const summary = `${request.role} processed objective: ${request.objective}`;

    return {
      output: `[LOCAL MOCK WORKFLOW] ${summary}. Input snapshot: ${request.input.slice(0, 160)}`,
    };
  }
}
