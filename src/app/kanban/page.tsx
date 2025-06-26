"use client";
import { useEffect, useState } from "react";
import { Task } from "../type";

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(()=>{
    async function fetchTasks(){
        const res=await fetch('/api/tasks');
        const data=await res.json();
        setTasks(data);
    }
    fetchTasks();
  },[]);

  return (
    <div>
      <h2>Your Kanban Board</h2>
      <div className="grid grid-cols-4 gap-4 ">
        {(["backlog", "inProgress", "review", "done"] as const).map(
          (Pstatus) => (
            <div key={Pstatus} className="bg-gray-50 rounded p-4 space-y-2">
              <h3 className="bg-gray-200 font-semibold text-gray-600 capitalize">
                {Pstatus}
              </h3>
              <div>
                {tasks
                .filter((t) => t.PStatus == Pstatus)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded p-3 shadow flex flex-col gap-1"
                  >
                    <span className="font-bold">{task.title}</span>
                    <span className="text-gray-500 text-sm">{task.description}</span>
                    <span className="text-gray-500">👤 {task.assignee}</span>
                    <span
                      className={`font-semibold ${
                        task.priority == "high"
                          ? "text-red-500"
                          : task.priority == "medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
                {tasks.filter((t)=>t.PStatus==Pstatus).length==0 && (
                    <div className="text-gray-400 text-sm">No tasks</div>
                )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
