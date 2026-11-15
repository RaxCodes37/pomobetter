"use client";

import { addTask } from "@/utils/db-actions";
import { useState } from "react";

interface Props {
  userId: string;
}

export default function AddTaskButton({ userId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskNotes, setTaskNotes] = useState<string>("");

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addTask(userId, taskName, taskDescription, taskNotes);
    } catch (error) {
      console.error("Error adding task, try again later", error);
    }

    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full h-20 py-6 border rounded-md border-[#393838] bg-[#2B2A2A] duration-300 hover:bg-[#302e2e] text-2xl font-bold"
      >
        Add Task
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div className="w-full max-w-110 rounded-lg border border-[#393838] bg-[#2B2A2A] p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-center">Add a task</h2>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-500 duration-400 hover:text-red-400"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
              <div className="flex flex-col items-start">
                <label className="mb-1 block text-md text-[#7e7e7e]">
                  Task name
                </label>
                <input
                  type="text"
                  autoFocus
                  placeholder="Enter Task name"
                  value={taskName}
                  onChange={(event) => setTaskName(event.target.value)}
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
                  value={taskDescription}
                  onChange={(event) => setTaskDescription(event.target.value)}
                  className="w-full rounded-md border border-[#393838] bg-[#1f1e1e] px-3 py-2 outline-none focus:border-gray-400"
                />
              </div>
              <div className="flex flex-col items-start">
                <label className="mb-1 block text-md text-[#7e7e7e]">
                  Task Notes
                </label>
                <textarea
                  autoFocus
                  placeholder="Enter Task Notes (optional)"
                  value={taskNotes}
                  onChange={(event) => setTaskNotes(event.target.value)}
                  className="w-full rounded-md border border-[#393838] bg-[#1f1e1e] px-3 py-2 outline-none focus:border-gray-400"
                />
              </div>
            </form>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-3 text-sm hover:bg-[#393838]"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleCreateTask}
                className="rounded-md bg-[#403f3f] p-3 text-sm font-semibold duration-400 hover:bg-[#4b4b4b]"
              >
                Create task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
