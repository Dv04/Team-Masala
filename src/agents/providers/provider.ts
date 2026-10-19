export interface ProviderRequest {
  role: string;
  objective: string;
  input: string;
}

export interface ProviderResponse {
  output: string;
}

export interface AIProvider {
  name: string;
  execute(request: ProviderRequest): Promise<ProviderResponse>;
}
