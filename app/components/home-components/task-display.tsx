"use client";

import { Task } from "@/utils/interfaces";
import AddTaskButton from "./task-related/add-task-button";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import TaskSettings from "./task-related/task-settings";
import EditTaskModal from "./task-related/edit-task-modal";

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

  return (
    <div className="w-100 mt-5">
      <AddTaskButton userId={userId} />

      <div className="mt-5 mb-10 w-full bg-[#2B2A2A] border border-[#393838] rounded-md py-3">
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
                  <button className="cursor-pointer" onClick={() => {}}>
                    <BsThreeDots />
                  </button>
                  <TaskSettings
                    task={task}
                    setTasks={setTasks}
                    setIsEditModeOpen={setIsEditModeOpen}
                    setNewTaskName={setNewTaskName}
                    setNewTaskDescription={setNewTaskDescription}
                    setTaskIdToEdit={setTaskIdToEdit}
                  />
                </div>
              </div>
              {task.description && (
                <p className="bg-[#343434] rounded-md border border-[#464646] shadow-md text-left p-3 ">
                  {task.description}
                </p>
              )}
            </li>
          ))}
          {isEditModeOpen && (
            <EditTaskModal
              setIsEditModeOpen={setIsEditModeOpen}
              newTaskName={newTaskName}
              setNewTaskName={setNewTaskName}
              newTaskDescription={newTaskDescription}
              setNewTaskDescription={setNewTaskDescription}
              taskIdToEdit={taskIdToEdit}
              tasks={tasks}
            />
          )}
        </ul>
      </div>
    </div>
  );
}
