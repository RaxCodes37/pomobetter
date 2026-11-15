"use client";

import { Task } from "@/utils/interfaces";
import AddTaskButton from "./task-related/add-task-button";

interface Props {
  tasks: Task[];
  userId: string;
}

export default function TaskDisplay({ tasks, userId }: Props) {
  return (
    <div className="w-100 mt-10">
      <AddTaskButton userId={userId} />
      <h2>Task Display Component</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
