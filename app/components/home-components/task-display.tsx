"use client";

import { Task } from "@/utils/interfaces";
import AddTaskButton from "./task-related/add-task-button";

interface Props {
  tasks: Task[];
}

export default function TaskDisplay({ tasks }: Props) {
  return (
    <div>
      <h2>Task Display Component</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <AddTaskButton />
    </div>
  );
}
