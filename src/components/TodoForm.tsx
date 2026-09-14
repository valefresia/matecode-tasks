import { useState, type FormEvent } from "react";
import type { NewTask, Task } from "../types/task";
import "./TodoForm.css";

interface TodoFormProps {
    onSubmit: (task: NewTask) => void;
    initialTask?: Task;
}

export const TodoForm = ({ onSubmit, initialTask }: TodoFormProps) => {
    const [title, setTitle] = useState(initialTask?.title ?? "");
    const [description, setDescription] = useState(initialTask?.description ?? "");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;

        onSubmit({ title: title.trim(), description: description.trim() });

        if (!initialTask) {
            setTitle("");
            setDescription("");
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Título de la tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button className="btn-primary" type="submit">
                {initialTask ? "Guardar cambios" : "Agregar tarea"}
            </button>
        </form>
    );
};