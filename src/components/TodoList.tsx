import type { Task } from "../types/task";

interface TodoListProps {
    tasks: Task[];
    onToggle: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onEdit: (task: Task) => void;
}

export const TodoList = ({ tasks, onToggle, onDelete, onEdit }: TodoListProps) => {
    if (tasks.length === 0) {
        return <p>No tenés tareas todavía. ¡Creá la primera!</p>;
    }

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task)}
                    />
                    <strong style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        {task.title}
                    </strong>
                    <p>{task.description}</p>
                    <button onClick={() => onEdit(task)}>Editar</button>
                    <button onClick={() => onDelete(task.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};