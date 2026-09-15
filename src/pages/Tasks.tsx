import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { TodoForm } from "../components/TodoForm";
import { WeeklyPlanner } from "../components/WeeklyPlanner";
import { getMotivationalPhrase } from "../utils/dateHelpers";
import type { Task, NewTask } from "../types/task";
import "./Tasks.css";

const todayLabel = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
});

export const Tasks = () => {
    const { user, logout } = useAuth();
    const { tasks, loading, error, addTask, editTask, removeTask, toggleComplete } =
        useTasks();
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [weekOffset, setWeekOffset] = useState(0);

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
        <div className="tasks-page grid-background">
            <div className="tasks-header">
                <div>
                    <span className="tasks-date">{todayLabel}</span>
                    <h1>Mi agenda ✨</h1>
                    <p className="tasks-motivation">{getMotivationalPhrase()}</p>
                </div>
                <div className="tasks-header-right">
                    <p className="tasks-user">{user?.email}</p>
                    <button className="btn-logout" onClick={logout}>Cerrar sesión</button>
                </div>
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
                <WeeklyPlanner
                    tasks={tasks}
                    weekOffset={weekOffset}
                    onWeekChange={setWeekOffset}
                    onToggle={toggleComplete}
                    onDelete={removeTask}
                    onEdit={handleEditClick}
                />
            )}
        </div>
    );
};