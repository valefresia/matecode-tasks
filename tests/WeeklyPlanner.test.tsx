import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { WeeklyPlanner } from "../src/components/WeeklyPlanner";
import type { Task } from "../src/types/task";

const mockTask: Task = {
    id: "1",
    title: "Tarea de prueba",
    description: "",
    completed: false,
    userId: "user1",
    createdAt: Date.now(),
    dueDate: null,
    priority: "media",
};

describe("WeeklyPlanner", () => {
    it("muestra las tareas sin fecha en la sección correspondiente", () => {
        render(
            <WeeklyPlanner
                tasks={[mockTask]}
                weekOffset={0}
                onWeekChange={vi.fn()}
                onToggle={vi.fn()}
                onDelete={vi.fn()}
                onEdit={vi.fn()}
            />
        );

        expect(screen.getByText("Sin fecha")).toBeInTheDocument();
        expect(screen.getByText("Tarea de prueba")).toBeInTheDocument();
    });

    it("no muestra la sección 'Sin fecha' si no hay tareas sin fecha", () => {
        render(
            <WeeklyPlanner
                tasks={[]}
                weekOffset={0}
                onWeekChange={vi.fn()}
                onToggle={vi.fn()}
                onDelete={vi.fn()}
                onEdit={vi.fn()}
            />
        );

        expect(screen.queryByText("Sin fecha")).not.toBeInTheDocument();
    });
});