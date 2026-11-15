"use client";

import { Task } from "@/utils/interfaces";
import AddTaskButton from "./task-related/add-task-button";
import { deleteTask, editTask } from "@/utils/db-actions";
import { IoTrashOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  userId: string;
}

export default function TaskDisplay({ tasks, setTasks, userId }: Props) {
  const [isEditModeOpen, setIsEditModeOpen] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [taskIdToEdit, setTaskIdToEdit] = useState<string>("");

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
    <div className="w-100 mt-5">
      <AddTaskButton userId={userId} />

      <div className="mt-5 w-full bg-[#2B2A2A] border border-[#393838] rounded-md py-3">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <hr className="mt-3 mb-4.5 text-[#393838]" />
        <ul className="flex flex-col gap-2 px-4">
          {tasks.length === 0 && <p>No tasks yet.</p>}
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-col gap-3 bg-[#212020] rounded-md border border-[#393838] shadow-md text-left p-3 duration-400 hover:bg-[#232323] transition-transform"
            >
              <div className="flex justify-between items-center">
                <p>{task.title}</p>
                <div className="flex gap-3 text-lg">
                  <button
                    className={`cursor-pointer text-sm flex items-center justify-center ${task.completed ? "bg-[#3a3a3a]" : ""} border border-[#3a3a3a] w-4.5 rounded-full`}
                    onClick={async () => {
                      const completed = !task.completed;
                      setTasks((prevTasks) =>
                        prevTasks.map((prevTask) =>
                          prevTask.id === task.id
                            ? { ...prevTask, completed }
                            : prevTask,
                        ),
                      );
                      await editTask(
                        task.id,
                        task.title,
                        task.description,
                        completed,
                      );
                    }}
                  >
                    {task.completed ? <FaCheck /> : null}
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setTaskIdToEdit(task.id);
                      setNewTaskName(task.title);
                      setNewTaskDescription(task.description || "");
                      setIsEditModeOpen(true);
                    }}
                  >
                    <BiSolidEdit />
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setTasks((prevTasks) =>
                        prevTasks.filter((prevTask) => prevTask.id !== task.id),
                      );
                      deleteTask(task.id);
                    }}
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </div>
              {task.description && (
                <p className="bg-[#343434] rounded-md border border-[#464646] shadow-md text-left p-3 ">
                  {task.description}
                </p>
              )}
            </li>
          ))}
          {
            //Editing mode
            isEditModeOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                onClick={(event) => {
                  if (event.target === event.currentTarget)
                    setIsEditModeOpen(false);
                }}
              >
                <div className="w-full max-w-110 rounded-lg border border-[#393838] bg-[#2B2A2A] p-6 shadow-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-center">
                      Edit task
                    </h2>
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
                        onChange={(event) =>
                          setNewTaskDescription(event.target.value)
                        }
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
            )
          }
        </ul>
      </div>
    </div>
  );
}
