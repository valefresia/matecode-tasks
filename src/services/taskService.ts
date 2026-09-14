import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    onSnapshot,
    serverTimestamp,
    type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Task, NewTask } from "../types/task";

const tasksCollection = collection(db, "tasks");

export const subscribeToUserTasks = (
    userId: string,
    onChange: (tasks: Task[]) => void
): Unsubscribe => {
    const q = query(tasksCollection, where("userId", "==", userId));

    return onSnapshot(q, (snapshot) => {
        const tasks: Task[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                title: data.title,
                description: data.description,
                completed: data.completed,
                userId: data.userId,
                createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
            };
        });

        tasks.sort((a, b) => b.createdAt - a.createdAt);
        onChange(tasks);
    });
};

export const createTask = async (
    userId: string,
    newTask: NewTask
): Promise<void> => {
    await addDoc(tasksCollection, {
        ...newTask,
        userId,
        completed: false,
        createdAt: serverTimestamp(),
    });
};

export const updateTask = async (
    taskId: string,
    changes: Partial<NewTask & { completed: boolean }>
): Promise<void> => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, changes);
};

export const deleteTask = async (taskId: string): Promise<void> => {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
};