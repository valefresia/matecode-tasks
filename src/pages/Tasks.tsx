import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import type { Task, NewTask } from "../types/task";
import "./Tasks.css";

export const Tasks = () => {
    const { user, logout } = useAuth();
    const { tasks, loading, error, addTask, editTask, removeTask, toggleComplete } =
        useTasks();
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleFormSubmit = async (newTask: NewTask) => {
        if (editingTask) {
            await editTask(editingTask.id, newTask);
            setEditingTask(null);
        } else {
            await addTask(newTask);
        }
    };

    const handleEditClick = (task: Task) => {
        setEditingTask(task);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    return (
        <div className="tasks-page">
            <div className="tasks-header">
                <div>
                    <h1>Mi agenda ✨</h1>                    <p className="tasks-user">{user?.email}</p>
                </div>
                <button className="btn-logout" onClick={logout}>Cerrar sesión</button>
            </div>

            {error && <p className="tasks-error" role="alert">{error}</p>}

            <TodoForm
                key={editingTask?.id ?? "new"}
                onSubmit={handleFormSubmit}
                initialTask={editingTask ?? undefined}
            />
            {editingTask && (
                <button className="btn-cancel-edit" onClick={handleCancelEdit}>
                    Cancelar edición
                </button>
            )}

            {loading ? (
                <p className="tasks-loading">Cargando tareas...</p>
            ) : (
                <TodoList
                    tasks={tasks}
                    onToggle={toggleComplete}
                    onDelete={removeTask}
                    onEdit={handleEditClick}
                />
            )}
        </div>
    );
};