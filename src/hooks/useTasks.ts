import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import {
    subscribeToUserTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../services/taskService";
import type { Task, NewTask } from "../types/task";

export const useTasks = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setTasks([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const unsubscribe = subscribeToUserTasks(user.uid, (updatedTasks) => {
            setTasks(updatedTasks);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const addTask = async (newTask: NewTask) => {
        if (!user) return;
        setError(null);
        try {
            await createTask(user.uid, newTask);
        } catch {
            setError("No se pudo crear la tarea. Intentá de nuevo.");
        }
    };

    const editTask = async (
        taskId: string,
        changes: Partial<NewTask & { completed: boolean }>
    ) => {
        setError(null);
        try {
            await updateTask(taskId, changes);
        } catch {
            setError("No se pudo actualizar la tarea. Intentá de nuevo.");
        }
    };

    const removeTask = async (taskId: string) => {
        setError(null);
        try {
            await deleteTask(taskId);
        } catch {
            setError("No se pudo eliminar la tarea. Intentá de nuevo.");
        }
    };

    const toggleComplete = async (task: Task) => {
        await editTask(task.id, { completed: !task.completed });
    };

    return { tasks, loading, error, addTask, editTask, removeTask, toggleComplete };
};