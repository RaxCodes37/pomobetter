"use client";

import { useEffect, useState } from "react";

// "25" and "5" will later be changed to a variable
const work_duration = 25 * 60;
const break_duration = 5 * 60;
const long_break_duration = 15 * 60;

export default function PomodoroDisplay() {
  const [mode, setMode] = useState<"work" | "break" | "long_break">("work");
  const [secondsRemaining, setSecondsRemaining] = useState(work_duration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedWorkSessions, setCompletedWorkSessions] = useState(0);
  const [completedShortBreakSessions, setCompletedShortBreakSessions] =
    useState(0);
  const [completedLongBreakSessions, setCompletedLongBreakSessions] =
    useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setSecondsRemaining((seconds) => {
        if (seconds > 1) return seconds - 1;

        if (mode === "work") {
          setCompletedWorkSessions((sessions) => sessions + 0.5);
          if (completedWorkSessions === 2) {
            setMode("long_break");
            return long_break_duration;
          } else {
            setMode("break");
            return break_duration;
          }
        }

        if (mode === "break") {
          setCompletedShortBreakSessions((sessions) => sessions + 0.5);
        }

        if (mode === "long_break") {
          setCompletedLongBreakSessions((sessions) => sessions + 0.5);
          setCompletedShortBreakSessions(0);
        }

        setMode("work");
        return work_duration;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning, mode]);

  const minutes = Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsRemaining % 60).toString().padStart(2, "0");

  function resetTimer() {
    setIsRunning(false);
    setMode("work");
    setSecondsRemaining(work_duration);
  }

  return (
    <section aria-label="Pomodoro timer" className="w-100 mt-10 border border-[#393838] rounded-md">
      <h2 className="text-4xl font-bold bg-[#2B2A2A] rounded-t-md p-2 h-20 flex items-center justify-center">
        {mode === "work" ? "Focus" : mode === "break" ? "Break" : "Long Break"}
      </h2>
      <div className="bg-[#393838] py-3 pb-4">
        <p className="text-4xl font-bold p-2">
          {minutes}:{seconds}
        </p>
        {mode === "work" ? (
          <p className="text-[#5b5b5b]">
            Completed focus sessions: {completedWorkSessions}
          </p>
        ) : mode === "break" ? (
          <p className="text-[#5b5b5b]">
            Completed break sessions: {completedShortBreakSessions}
          </p>
        ) : (
          <p className="text-[#5b5b5b]">
            Completed long break sessions: {completedLongBreakSessions}
          </p>
        )}
      </div>
      <div className="bg-[#2B2A2A] h-20 rounded-b-md flex justify-between text-2xl font-semibold">
        <button
          type="button"
          onClick={() => setIsRunning((running) => !running)}
          className="w-[50%] border-r border-[#393838] duration-400 hover:bg-[#302e2e]"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          onClick={resetTimer}
          className="w-[50%] duration-400 hover:bg-[#302e2e]"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
