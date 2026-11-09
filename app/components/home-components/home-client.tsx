"use client";

import HomeNavBar from "./home-nav-bar";
import PomodoroDisplay from "./pomodoro-display";
import TaskDisplay from "./task-display";

export default function HomeClient() {
  return (
    <div>
      <HomeNavBar />
      <PomodoroDisplay/>
      <TaskDisplay />
    </div>
  );
}
