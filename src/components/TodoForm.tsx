import { useState, type FormEvent, type ChangeEvent } from "react";
import type { NewTask, Task, Priority } from "../types/task";
import { getTodayISODate, isPastDate } from "../utils/dateHelpers";
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
    const [dateError, setDateError] = useState<string | null>(null);

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDueDate(value);

        if (value && isPastDate(value)) {
            setDateError("No podés seleccionar una fecha anterior al día de hoy.");
        } else {
            setDateError(null);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;

        if (dueDate && isPastDate(dueDate)) {
            setDateError("No podés seleccionar una fecha anterior al día de hoy.");
            return;
        }

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
            setDateError(null);
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
                        className={dateError ? "input-error" : ""}
                        value={dueDate}
                        min={getTodayISODate()}
                        onChange={handleDateChange}
                    />
                    {dateError && (
                        <span className="todo-form-error" role="alert">
                            {dateError}
                        </span>
                    )}
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