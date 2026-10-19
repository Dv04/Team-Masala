import type { ActivityEvent, Task, WorkflowRun } from "@/types/agent";

export interface InMemoryState {
  tasks: Task[];
  workflows: WorkflowRun[];
  activity: ActivityEvent[];
}

export const createInitialState = (): InMemoryState => ({
  tasks: [],
  workflows: [],
  activity: [],
});
