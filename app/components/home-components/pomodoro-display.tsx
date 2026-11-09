"use client";

import { useEffect, useState } from "react";

// "25" and "5" will later be changed to a variable
const work_duration = 0.1 * 60;
const break_duration = 0.1 * 60;
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
    <section aria-label="Pomodoro timer">
      <h2>
        {mode === "work" ? "Focus" : mode === "break" ? "Break" : "Long Break"}
      </h2>
      <p aria-live="polite" aria-atomic="true">
        {minutes}:{seconds}
      </p>
      {mode === "work" ? (
        <p>Completed focus sessions: {completedWorkSessions}</p>
      ) : mode === "break" ? (
        <p>Completed break sessions: {completedShortBreakSessions}</p>
      ) : (
        <p>Completed long break sessions: {completedLongBreakSessions}</p>
      )}

      <button type="button" onClick={() => setIsRunning((running) => !running)}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button type="button" onClick={resetTimer}>
        Reset
      </button>
    </section>
  );
}
