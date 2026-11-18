export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  taskCreator: string;
  isHabit: boolean;
}
