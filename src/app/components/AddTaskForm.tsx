// components/TaskFormModal.tsx
import React, { useState,useEffect } from "react";


interface Task {
  id: number;
  title: string;
  description: string;
  PStatus: string;
  assignee: string;
  priority: "low" | "medium" | "high";
}

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [PStatus, setPStatus] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [generatedId, setGeneratedId] = useState<number | null>(null);

  useEffect(() => {
  setGeneratedId(Date.now());
}, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: generatedId!,
      title,
      description,
      PStatus,
      assignee,
      priority,
    };
    onSubmit(newTask);
    onClose();
    setTitle("");
    setDescription("");
    setPStatus("");
    setAssignee("");
    setPriority("low");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-700" style={{margin:"10px"}}>Create a New Task</h2>
        <div className="flex gap-15" style={{margin:"10px"}}>
          <label>Title</label>
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-3" style={{margin:"10px"}}>
          <label>Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex gap-12" style={{margin:"10px"}}>
          <label>Status</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={PStatus}
            onChange={(e) => setPStatus(e.target.value)}
          >
            <option value="backlog">Backlog</option>
            <option value="inProgress">InProgress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="flex gap-7" style={{margin:"10px"}}>
          <label>Assignee</label>
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
        </div>

        <div className="flex gap-7" style={{margin:"10px"}}>
          <label>Assignee</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task["priority"])}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex justify-end gap-2" style={{margin:"10px"}}>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            style={{margin:"10px",padding:"6px"}}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskFormModal;
