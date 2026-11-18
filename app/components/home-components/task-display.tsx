"use client";

import { Task } from "@/utils/interfaces";
import AddTaskButton from "./task-related/add-task-button";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import TaskSettings from "./task-related/task-settings";
import EditTaskModal from "./task-related/edit-task-modal";
import { FaCheck } from "react-icons/fa6";
import { editTask } from "@/utils/db-actions";

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
  const [openSettingsTaskId, setOpenSettingsTaskId] = useState<string | null>(
    null,
  );

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
                <div className="flex items-baseline gap-3 text-lg">
                  <button
                    className={`cursor-pointer text-sm flex items-center justify-center ${task.completed ? "bg-[#3a3a3a]" : ""} border border-[#3a3a3a] w-4.5 h-4.5 rounded-full`}
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
                  <div className="relative text-lg">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setOpenSettingsTaskId((currentTaskId) =>
                          currentTaskId === task.id ? null : task.id,
                        );
                      }}
                    >
                      <BsThreeDots />
                    </button>
                    {openSettingsTaskId === task.id ? (
                      <TaskSettings
                        task={task}
                        setTasks={setTasks}
                        setIsEditModeOpen={setIsEditModeOpen}
                        setNewTaskName={setNewTaskName}
                        setNewTaskDescription={setNewTaskDescription}
                        setTaskIdToEdit={setTaskIdToEdit}
                      />
                    ) : null}
                  </div>
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
