import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import type { Task, NewTask } from "../types/task";

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
        <div>
            <h1>Mis tareas</h1>
            <p>Sesión iniciada como: {user?.email}</p>
            <button onClick={logout}>Cerrar sesión</button>

            {error && <p role="alert">{error}</p>}

            <TodoForm
                key={editingTask?.id ?? "new"}
                onSubmit={handleFormSubmit}
                initialTask={editingTask ?? undefined}
            />
            {editingTask && <button onClick={handleCancelEdit}>Cancelar edición</button>}

            {loading ? (
                <p>Cargando tareas...</p>
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