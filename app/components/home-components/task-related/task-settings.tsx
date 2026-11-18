import { deleteTask } from "@/utils/db-actions";
import { Task } from "@/utils/interfaces";
import React from "react";
import { BiSolidEdit } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";

interface Props {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setIsEditModeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewTaskName: React.Dispatch<React.SetStateAction<string>>;
  setNewTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  setTaskIdToEdit: React.Dispatch<React.SetStateAction<string>>;
}

export default function TaskSettings({
  task,
  setTasks,
  setIsEditModeOpen,
  setNewTaskName,
  setNewTaskDescription,
  setTaskIdToEdit,
}: Props) {
  return (
    <div className="absolute right-0 top-full z-10 mt-2 grid w-11 grid-cols-1 gap-1 rounded-md border border-[#393838] bg-[#171717] p-1 text-lg shadow-lg">
      <button
        className="flex h-9 w-full cursor-pointer items-center justify-center rounded hover:bg-[#2B2A2A]"
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
        className="flex h-9 w-full cursor-pointer items-center justify-center rounded hover:bg-[#2B2A2A]"
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
