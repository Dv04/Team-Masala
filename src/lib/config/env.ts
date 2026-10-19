import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  GROK_API_KEY: z.string().optional(),
  GROK_API_BASE_URL: z.string().url().optional(),
  USE_MOCK_PROVIDER: z
    .string()
    .optional()
    .transform((value) => (value ?? "true").toLowerCase() !== "false"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  GROK_API_KEY: process.env.GROK_API_KEY,
  GROK_API_BASE_URL: process.env.GROK_API_BASE_URL,
  USE_MOCK_PROVIDER: process.env.USE_MOCK_PROVIDER,
});
