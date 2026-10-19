export async function withRetry<T>(
  action: () => Promise<T>,
  retries = 1,
): Promise<{ value?: T; attempts: number; error?: string }> {
  let attempts = 0;
  let lastError: unknown;

  while (attempts <= retries) {
    attempts += 1;
    try {
      const value = await action();
      return { value, attempts };
    } catch (error) {
      lastError = error;
    }
  }

  return {
    attempts,
    error: lastError instanceof Error ? lastError.message : "Unknown error",
  };
}
