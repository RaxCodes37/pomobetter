import { deleteTask, editTask } from "@/utils/db-actions";
import { Task } from "@/utils/interfaces";
import React from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";

interface Props {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setIsEditModeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewTaskName: React.Dispatch<React.SetStateAction<string>>;
  setNewTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  setTaskIdToEdit: React.Dispatch<React.SetStateAction<string>>;
}

export default function TaskSettings({ task, setTasks, setIsEditModeOpen, setNewTaskName, setNewTaskDescription, setTaskIdToEdit }: Props) {  return (
    <div className="flex flex-col fixed gap-3 text-lg ">
      <button
        className={`cursor-pointer text-sm flex items-center justify-center ${task.completed ? "bg-[#3a3a3a]" : ""} border border-[#3a3a3a] w-4.5 rounded-full`}
        onClick={async () => {
          const completed = !task.completed;
          setTasks((prevTasks) =>
            prevTasks.map((prevTask) =>
              prevTask.id === task.id ? { ...prevTask, completed } : prevTask,
            ),
          );
          await editTask(task.id, task.title, task.description, completed);
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
  );
}
