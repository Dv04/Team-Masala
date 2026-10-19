import { DashboardPage } from "@/components/dashboard/dashboard-page";
import { getRuntime } from "@/lib/services/hackathon-runtime";

export function AppShell() {
  const runtime = getRuntime();

  return (
    <DashboardPage
      initialTasks={runtime.listTasks()}
      initialAgents={runtime.listAgents()}
      initialWorkflows={runtime.listWorkflows()}
      initialActivity={runtime.listActivity()}
    />
  );
}
