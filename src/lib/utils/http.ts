import { ZodError } from "zod";

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export const errorResponse = (
  code: string,
  message: string,
  status: number,
  details?: unknown,
): Response => {
  const body: ApiErrorBody = { error: { code, message, details } };
  return Response.json(body, { status });
};

export const handleRouteError = (error: unknown): Response => {
  if (error instanceof ZodError) {
    return errorResponse("VALIDATION_ERROR", "Request validation failed", 400, error.issues);
  }

  return errorResponse(
    "INTERNAL_ERROR",
    error instanceof Error ? error.message : "Unexpected error",
    500,
  );
};
