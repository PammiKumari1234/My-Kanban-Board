export type Status = "backlog" | "inProgress" | "review" | "done";
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description: string;
  PStatus: string; // "backlog" | "inProgress" | "review" | "done"
  assignee: string;
  priority: "low" | "medium" | "high";
}