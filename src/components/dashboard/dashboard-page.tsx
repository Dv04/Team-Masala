"use client";

import { useCallback, useMemo, useState } from "react";
import { AgentCard } from "@/components/agents/agent-card";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TaskCard } from "@/components/dashboard/task-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { ActivityTimeline } from "@/components/workflows/activity-timeline";
import { ResultsPanel } from "@/components/workflows/results-panel";
import { useApi } from "@/hooks/use-api";
import type { ActivityEvent, AgentDefinition, Task, WorkflowRun } from "@/types/agent";

interface TasksResponse {
  tasks: Task[];
  activity: ActivityEvent[];
}

interface AgentsResponse {
  agents: AgentDefinition[];
}

interface WorkflowsResponse {
  workflows: WorkflowRun[];
}

interface DashboardPageProps {
  initialTasks: Task[];
  initialAgents: AgentDefinition[];
  initialWorkflows: WorkflowRun[];
  initialActivity: ActivityEvent[];
}

export function DashboardPage({
  initialTasks,
  initialAgents,
  initialWorkflows,
  initialActivity,
}: DashboardPageProps) {
  const { getJson, postJson } = useApi();
  const { notify } = useToast();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [agents, setAgents] = useState<AgentDefinition[]>(initialAgents);
  const [workflows, setWorkflows] = useState<WorkflowRun[]>(initialWorkflows);
  const [activity, setActivity] = useState<ActivityEvent[]>(initialActivity);
  const [title, setTitle] = useState("Demo task");
  const [objective, setObjective] = useState("Validate starter workflow path");
  const [input, setInput] = useState("Summarize this startup checklist.");
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const selectedTask = useMemo(
    () => tasks.find((task) => task.id === selectedTaskId) ?? tasks[0],
    [selectedTaskId, tasks],
  );

  const loadData = useCallback(async () => {
    try {
      const [taskData, agentData, workflowData] = await Promise.all([
        getJson<TasksResponse>("/api/tasks"),
        getJson<AgentsResponse>("/api/agents"),
        getJson<WorkflowsResponse>("/api/workflows"),
      ]);
      setTasks(taskData.tasks);
      setActivity(taskData.activity);
      setAgents(agentData.agents);
      setWorkflows(workflowData.workflows);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed loading dashboard data");
    } finally {
      setLoading(false);
    }
  }, [getJson]);

  const submitTask = async () => {
    setSubmitting(true);
    setLoading(true);
    setError(undefined);
    try {
      const response = await postJson<{ task: Task }>("/api/tasks", { title, objective, input });
      setSelectedTaskId(response.task.id);
      notify("Task submitted to LOCAL MOCK workflow.");
      await loadData();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to submit task");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 md:flex-row">
      <Sidebar />
      <div className="flex-1 p-5 md:p-8">
        <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">GrokBot Hackathon Starter</h1>
            <p className="text-sm text-zinc-400">Reusable AI-agent foundation (mock mode ready).</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setShowAbout(true)}>
              About mock mode
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setLoading(true);
                setError(undefined);
                void loadData();
              }}
            >
              Refresh
            </Button>
          </div>
        </header>

        {error ? (
          <div className="mb-4 rounded-lg border border-rose-700 bg-rose-900/30 px-4 py-3 text-sm text-rose-200">
            Error state: {error}
          </div>
        ) : null}

        <section className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">Submit test task</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Task title" />
            <Input
              value={objective}
              onChange={(event) => setObjective(event.target.value)}
              placeholder="Objective"
            />
            <Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Input" />
          </div>
          <div className="mt-3">
            <Button onClick={() => void submitTask()} disabled={submitting}>
              {submitting ? "Submitting..." : "Run LOCAL MOCK workflow"}
            </Button>
          </div>
        </section>

        {loading ? <LoadingIndicator label="Loading dashboard" /> : null}

        {!loading && tasks.length === 0 ? (
          <div className="mb-6 rounded-xl border border-dashed border-zinc-700 p-6 text-sm text-zinc-500">
            Empty state: no tasks yet. Submit one above.
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-3">
          <section className="space-y-3 lg:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Tasks</h2>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onSelect={() => setSelectedTaskId(task.id)} />
            ))}
          </section>

          <section className="space-y-3 lg:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Agents</h2>
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-xs text-zinc-500">
              Workflows tracked: {workflows.length}
            </div>
          </section>

          <section className="space-y-3 lg:col-span-1">
            <ResultsPanel task={selectedTask} />
            <ActivityTimeline events={activity} />
          </section>
        </div>

        <Modal title="LOCAL MOCK Workflow" open={showAbout} onClose={() => setShowAbout(false)}>
          This starter runs a clearly labeled local mock pipeline until official hackathon provider details are
          connected. No external AI request is sent in mock mode.
        </Modal>
      </div>
    </div>
  );
}
