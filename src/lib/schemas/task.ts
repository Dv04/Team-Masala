import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3).max(120),
  objective: z.string().min(5).max(500),
  input: z.string().min(1).max(2000),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
