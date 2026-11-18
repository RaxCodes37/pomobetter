import { editTask } from "@/utils/db-actions";
import { Task } from "@/utils/interfaces";
import React from "react";

interface Props {
  setIsEditModeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newTaskName: string;
  setNewTaskName: React.Dispatch<React.SetStateAction<string>>;
  newTaskDescription: string;
  setNewTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  taskIdToEdit: string;
  tasks: Task[];
}

export default function EditTaskModal({
  setIsEditModeOpen,
  newTaskName,
  setNewTaskName,
  newTaskDescription,
  setNewTaskDescription,
  taskIdToEdit,
  tasks,
}: Props) {
  const handleEditTask = async () => {
    if (taskIdToEdit.trim() === "") return;
    try {
      await editTask(
        taskIdToEdit,
        newTaskName,
        newTaskDescription,
        tasks.find((task) => task.id === taskIdToEdit)?.completed ?? false,
      );
      window.location.reload();
    } catch (error) {
      console.error("Failed to edit task:", error);
    }

    setIsEditModeOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) setIsEditModeOpen(false);
      }}
    >
      <div className="w-full max-w-110 rounded-lg border border-[#393838] bg-[#2B2A2A] p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-center">Edit task</h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => setIsEditModeOpen(false)}
            className="text-2xl text-gray-500 duration-400 hover:text-red-400"
          >
            &times;
          </button>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col items-start">
            <label className="mb-1 block text-md text-[#7e7e7e]">
              Task name
            </label>
            <input
              type="text"
              autoFocus
              placeholder="Enter Task name"
              value={newTaskName}
              onChange={(event) => setNewTaskName(event.target.value)}
              className="w-full rounded-md border border-[#393838] bg-[#1f1e1e] px-3 py-2 outline-none focus:border-gray-400"
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="mb-1 block text-md text-[#7e7e7e]">
              Task Description
            </label>
            <textarea
              autoFocus
              placeholder="Enter Task description (optional)"
              value={newTaskDescription}
              onChange={(event) => setNewTaskDescription(event.target.value)}
              className="w-full rounded-md border border-[#393838] bg-[#1f1e1e] px-3 py-2 outline-none focus:border-gray-400"
            />
          </div>
        </form>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsEditModeOpen(false)}
            className="rounded-md p-3 text-sm hover:bg-[#393838]"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleEditTask}
            className="rounded-md bg-[#403f3f] p-3 text-sm font-semibold duration-400 hover:bg-[#4b4b4b]"
          >
            Edit task
          </button>
        </div>
      </div>
    </div>
  );
}
