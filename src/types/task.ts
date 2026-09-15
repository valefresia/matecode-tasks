export type Priority = "baja" | "media" | "alta";

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
    createdAt: number;
    dueDate: string | null;
    priority: Priority;
}

export type NewTask = Omit<Task, "id" | "userId" | "createdAt" | "completed">;