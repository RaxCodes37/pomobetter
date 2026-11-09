"use client";

import { useEffect, useState } from "react";
import HomeNavBar from "./home-nav-bar";
import PomodoroDisplay from "./pomodoro-display";
import TaskDisplay from "./task-display";
import { Task } from "@/utils/interfaces";
import { getTasks } from "@/utils/db-actions";

interface Props {
  userId: string;
}

export default function HomeClient({ userId }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasksFunction = async () => {
      setTasks(await getTasks(userId));
    };
    getTasksFunction();
  }, []);

  return (
    <div>
      <HomeNavBar />
      <PomodoroDisplay />
      <TaskDisplay tasks={tasks} />
    </div>
  );
}
