"use server";

import { eq } from "drizzle-orm";
import { task } from "@/schema";
import { Task } from "./interfaces";
import { db } from "..";

export const getTasks = async (userId: string) => {
  return (await db
    .select()
    .from(task)
    .where(eq(task.taskCreator, userId))) as Task[];
};

export const addTask = async (
  userId: string,
  title: string,
  description: string,
  note: string,
) => {
  await db.insert(task).values({
    taskCreator: userId,
    title,
    description,
    note,
  });
};

export const editTask = async (
  taskId: string,
  newTitle: string,
  newDescription: string,
  newNote: string,
) => {
  await db
    .update(task)
    .set({ title: newTitle, description: newDescription, note: newNote })
    .where(eq(task.id, taskId));
};

export const deleteTask = async (taskId: string) => {
  await db.delete(task).where(eq(task.id, taskId));
};
