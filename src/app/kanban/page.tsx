"use client"; 
import { useEffect, useState } from "react";
import { Task } from "../type";
import AddTaskForm from "../components/AddTaskForm";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";


export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchTasks() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: Task[] = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (newTaskData: Omit<Task, "id">) => {
    try {
      const res = await fetch("/api/tasks/create", {
        method: "POST", // Make POST request to your API route
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskData), // Send new task data as JSON
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const createdTask: Task = await res.json(); // Get the newly created task (with its ID)
      setTasks((prevTasks) => [...prevTasks, createdTask]); 
      setShowModal(false);
    } catch (err) {
      console.error("Failed to add task:", err);
      setError("Failed to add task. Please try again."); // Set error message
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return; // User cancelled the deletion
    }

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError("Failed to delete task. Please try again.");
    }
  };

  // Handle drag and drop end event
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a droppable area or back to original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // Find the dragged task
    const draggedTask = tasks.find((task) => task.id.toString() === draggableId);
    if (!draggedTask) return;

    // Determine the new status based on the destination column's droppableId
    const newStatus = destination.droppableId;

    // Optimistically update the frontend state
    const updatedTasks = tasks.map((task) =>
      task.id.toString() === draggableId ? { ...task, PStatus: newStatus } : task
    );
    setTasks(updatedTasks);

    // Update the backend
    try {
      const res = await fetch(`/api/tasks/${draggedTask.id}`, {
        method: "PATCH", // Use PATCH to update the task status
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ PStatus: newStatus }),
      });

      if (!res.ok) {
        // If backend update fails, revert the frontend state
        setTasks(tasks); // Revert to original tasks
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (err) {
      console.error("Failed to update task status:", err);
      setError("Failed to update task status. Please try again.");
      setTasks(tasks); // Revert frontend state on error
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8" style={{padding:"15px"}}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6" style={{padding:"15px 0"}}>
          <h2 className="font-bold text-3xl text-gray-800 mb-4 sm:mb-0">Welcome!</h2>
          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            onClick={() => setShowModal(true)}
            style={{padding:"5px"}}
          >
            Create Task +
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {loading ? (
          <div className="text-center py-10 text-gray-600 text-lg">Loading tasks...</div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{padding:"5px"}}>
              {(["backlog", "inProgress", "review", "done"] as const).map(
                (Pstatus) => (
                  <Droppable droppableId={Pstatus} key={Pstatus}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`bg-gray-50 rounded-lg p-4 space-y-4 shadow-sm kanban-column ${
                          snapshot.isDraggingOver ? "bg-blue-100" : "" 
                        }`}
                      >
                        <h3 className="bg-gray-200 text-gray-700 font-semibold text-lg capitalize py-2 px-3 rounded-md" style={{padding:"5px 14px"}}>
                          {Pstatus === "inProgress" ? "In Progress" : Pstatus}
                        </h3>
                        <div className="space-y-3" style={{padding:"5px"}}>
                          {tasks
                            .filter((t) => t.PStatus === Pstatus)
                            .map((task, index) => (
                              <Draggable
                                key={task.id.toString()} 
                                draggableId={task.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`bg-white rounded-lg p-4 shadow-md flex flex-col gap-2 border border-gray-200 hover:shadow-lg transition-shadow duration-200 ${
                                      snapshot.isDragging ? "ring-2 ring-blue-500" : ""
                                    }`}
                                  >
                                    <span style={{padding:"5px 14px"}} className="font-bold text-gray-900 text-lg">{task.title}</span>
                                    <span style={{padding:"5px 14px"}} className="text-gray-600 text-sm">{task.description}</span>
                                    <span style={{padding:"5px 14px"}} className="text-gray-500 text-sm flex items-center gap-1">
                                      <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                      </svg>
                                      {task.assignee}
                                    </span>
                                    <span style={{padding:"5px 14px"}}
                                      className={`font-semibold text-sm px-2 py-1 rounded-full inline-block ${
                                        task.priority === "high"
                                          ? "bg-red-100 text-red-700"
                                          : task.priority === "medium"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-green-100 text-green-700"
                                      }`}
                                    >
                                      {task.priority}
                                    </span>
                                    <button
                                      onClick={() => handleDeleteTask(task.id)}
                                      style={{padding:"5px", margin:"10px"}}
                                      className="mt-2 self-end px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                          {tasks.filter((t) => t.PStatus === Pstatus).length === 0 && (
                            <div className="text-gray-400 text-center py-4 text-sm">No tasks in this column.</div>
                          )}
                        </div>
                      </div>
                    )}
                  </Droppable>
                )
              )}
            </div>
          </DragDropContext>
        )}

        <AddTaskForm
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddTask}
        />
      </div>
    </>
  );
}