import type { Task } from "../types/task";
import "./TodoList.css";

interface TodoListProps {
    tasks: Task[];
    onToggle: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onEdit: (task: Task) => void;
}

const formatDueDate = (dueDate: string) => {
    const [year, month, day] = dueDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
};

export const TodoList = ({ tasks, onToggle, onDelete, onEdit }: TodoListProps) => {
    if (tasks.length === 0) {
        return <p className="tasks-empty">No tenés tareas todavía. ¡Creá la primera! 🎀</p>;
    }

    return (
        <ul className="todo-list">
            {tasks.map((task) => (
                <li key={task.id} className={`todo-item ${task.completed ? "completed" : ""}`}>
                    <input
                        className="todo-checkbox"
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task)}
                    />
                    <div className="todo-content">
                        <div className="todo-title-row">
                            <strong className={`todo-title ${task.completed ? "completed" : ""}`}>
                                {task.title}
                            </strong>
                            {task.dueDate && (
                                <span className="todo-due-badge">{formatDueDate(task.dueDate)}</span>
                            )}
                        </div>
                        {task.description && <p className="todo-description">{task.description}</p>}
                        <div className="todo-actions">
                            <button className="btn-edit" onClick={() => onEdit(task)}>Editar</button>
                            <button className="btn-delete" onClick={() => onDelete(task.id)}>Eliminar</button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};