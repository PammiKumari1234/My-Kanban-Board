export type Status = "backlog" | "inProgress" | "review" | "done";
export type Priority = "low" | "medium" | "high";

export interface Task{
    id:number,
    title: string,
    description: string,
    PStatus: Status,
    assignee: string,
    priority: Priority
}