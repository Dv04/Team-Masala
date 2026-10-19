"use client";

import { useCallback } from "react";

export function useApi() {
  const getJson = useCallback(async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }, []);

  const postJson = useCallback(async <T>(url: string, body: unknown): Promise<T> => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as T | { error?: { message?: string } };
    if (!response.ok) {
      const errorMessage =
        typeof data === "object" && data && "error" in data ? data.error?.message : undefined;
      throw new Error(errorMessage ?? `Request failed: ${response.status}`);
    }
    return data as T;
  }, []);

  return { getJson, postJson };
}
