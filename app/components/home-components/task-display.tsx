"use client";

import { Task } from "@/utils/interfaces";
import AddTaskButton from "./task-related/add-task-button";

interface Props {
  tasks: Task[];
  userId: string;
}

export default function TaskDisplay({ tasks, userId }: Props) {
  return (
    <div className="w-100 mt-5">
      <AddTaskButton userId={userId} />

      <div className="mt-5 w-full bg-[#2B2A2A] border border-[#393838] rounded-md py-3">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <hr className="mt-3 mb-4.5 text-[#393838]" />
        <ul className="flex flex-col gap-2 px-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-col gap-2 bg-[#212020] rounded-md border border-[#393838] shadow-md text-left p-3 duration-400 hover:translate-y-px transition-transform"
            >
              <p>{task.title}</p>

              {task.description && (
                <p className="bg-[#343434] rounded-md border border-[#464646] shadow-md text-left p-3 ">
                  {task.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
