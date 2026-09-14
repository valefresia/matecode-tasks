export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
    createdAt: number;
}

export type NewTask = Omit<Task, "id" | "userId" | "createdAt">;