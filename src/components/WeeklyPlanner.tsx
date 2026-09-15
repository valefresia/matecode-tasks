import type { Task } from "../types/task";
import {
    getWeekDates,
    formatDayLabel,
    formatDayNumber,
    isToday,
    toISODate,
    getWeekRangeLabel,
} from "../utils/dateHelpers";
import "./WeeklyPlanner.css";

interface WeeklyPlannerProps {
    tasks: Task[];
    weekOffset: number;
    onWeekChange: (offset: number) => void;
    onToggle: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onEdit: (task: Task) => void;
}

export const WeeklyPlanner = ({
    tasks,
    weekOffset,
    onWeekChange,
    onToggle,
    onDelete,
    onEdit,
}: WeeklyPlannerProps) => {
    const weekDates = getWeekDates(weekOffset);
    const unscheduled = tasks.filter((t) => !t.dueDate);

    return (
        <div className="planner">
            <div className="planner-nav">
                <button className="planner-nav-btn" onClick={() => onWeekChange(weekOffset - 1)}>
                    ←
                </button>
                <span className="planner-range">{getWeekRangeLabel(weekDates)}</span>
                <button className="planner-nav-btn" onClick={() => onWeekChange(weekOffset + 1)}>
                    →
                </button>
            </div>

            {unscheduled.length > 0 && (
                <div className="planner-unscheduled">
                    <h3>Sin fecha</h3>
                    <div className="planner-task-list">
                        {unscheduled.map((task) => (
                            <TaskBlock
                                key={task.id}
                                task={task}
                                onToggle={onToggle}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="planner-grid">
                {weekDates.map((date) => {
                    const dateISO = toISODate(date);
                    const dayTasks = tasks.filter((t) => t.dueDate === dateISO);

                    return (
                        <div
                            key={dateISO}
                            className={`planner-day ${isToday(date) ? "planner-day-today" : ""}`}
                        >
                            <div className="planner-day-header">
                                <span className="planner-day-label">{formatDayLabel(date)}</span>
                                <span className="planner-day-number">{formatDayNumber(date)}</span>
                            </div>

                            <div className="planner-task-list">
                                {dayTasks.length === 0 ? (
                                    <p className="planner-day-empty">Sin tareas</p>
                                ) : (
                                    dayTasks.map((task) => (
                                        <TaskBlock
                                            key={task.id}
                                            task={task}
                                            onToggle={onToggle}
                                            onDelete={onDelete}
                                            onEdit={onEdit}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface TaskBlockProps {
    task: Task;
    onToggle: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onEdit: (task: Task) => void;
}

const TaskBlock = ({ task, onToggle, onDelete, onEdit }: TaskBlockProps) => {
    return (
        <div
            className={`task-block priority-${task.priority} ${task.completed ? "task-block-completed" : ""
                }`}
        >
            <div className="task-block-top">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task)}
                />
                <strong className={task.completed ? "task-block-title-done" : ""}>
                    {task.title}
                </strong>
            </div>
            {task.description && <p className="task-block-desc">{task.description}</p>}
            <div className="task-block-actions">
                <button onClick={() => onEdit(task)}>Editar</button>
                <button onClick={() => onDelete(task.id)}>Eliminar</button>
            </div>
        </div>
    );
};