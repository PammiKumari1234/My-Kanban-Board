"use client";
import { useEffect, useState } from "react";
import { Task } from "../type";
import Modal from "../components/AddTaskForm"
// import Navbar from "../components/Navbar";

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const[showModal,setShowModal]=useState(false);

  useEffect(()=>{
    async function fetchTasks(){
        const res=await fetch('/api/tasks');
        const data=await res.json();
        setTasks(data);
    }
    fetchTasks();
  },[]);

  

  return (
    <>
    {/* <Navbar/> */}
    <div style={{padding:"10px"}}>
        <div className="flex justify-between items-center" style={{margin:"7px"}}>
            <h2 className="font-bold text-2xl text-gray-500">Your Kanban Board</h2>
            <button className="border rounded bg-orange-500 text-white cursor-pointer transition transform hover:scale-110"
             style={{padding:"5px"}}
             onClick={()=>setShowModal(true)}
             >Create task +</button>
        </div>
      <Modal
       isOpen={showModal} 
       onClose={() => setShowModal(false)} 
       onSubmit={async (task) => {
  // Save the task to backend API
  await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  // Re-fetch updated task list
  const res = await fetch("/api/tasks");
  const data = await res.json();
  setTasks(data);

  // Close the modal
  setShowModal(false);
}}>
  <h2 className="text-lg font-semibold mb-4">Your Modal Content Here</h2>
  <p className="text-sm text-gray-600">This is a placeholder. We will add the form next!</p>
</Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-2" style={{margin:"10px"}}>
        {(["backlog", "inProgress", "review", "done"] as const).map(
          (Pstatus) => (
            <div key={Pstatus} className="bg-gray-50 rounded p-4 space-y-2" >
              <h3 className="bg-gray-200 font-semibold text-gray-600 capitalize" style={{padding:"7px"}}>
                {Pstatus}
              </h3>
              <div>
                {tasks
                .filter((t) => t.PStatus == Pstatus)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded p-3 shadow flex flex-col gap-1"
                    style={{padding:"7px",marginBottom:"20px"}}
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
     </>
  );
 
}
