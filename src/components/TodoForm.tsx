import { useState, type FormEvent } from "react";
import type { NewTask, Task, Priority } from "../types/task";
import "./TodoForm.css";

interface TodoFormProps {
    onSubmit: (task: NewTask) => void;
    initialTask?: Task;
}

export const TodoForm = ({ onSubmit, initialTask }: TodoFormProps) => {
    const [title, setTitle] = useState(initialTask?.title ?? "");
    const [description, setDescription] = useState(initialTask?.description ?? "");
    const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? "");
    const [priority, setPriority] = useState<Priority>(initialTask?.priority ?? "media");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;

        onSubmit({
            title: title.trim(),
            description: description.trim(),
            dueDate: dueDate || null,
            priority,
        });

        if (!initialTask) {
            setTitle("");
            setDescription("");
            setDueDate("");
            setPriority("media");
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="todo-form-main">
                <input
                    type="text"
                    placeholder="Título de la tarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Descripción (opcional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                />
            </div>

            <div className="todo-form-row">
                <label className="todo-form-date-label">
                    <span>Fecha límite</span>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </label>

                <label className="todo-form-priority-label">
                    <span>Prioridad</span>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as Priority)}
                    >
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </select>
                </label>
            </div>

            <button className="btn-primary" type="submit">
                {initialTask ? "Guardar cambios" : "Agregar tarea"}
            </button>
        </form>
    );
};