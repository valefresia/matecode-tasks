import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoForm } from "../src/components/TodoForm";

describe("TodoForm", () => {
    it("renderiza los campos vacíos por defecto", () => {
        render(<TodoForm onSubmit={vi.fn()} />);

        expect(screen.getByPlaceholderText("Título de la tarea")).toHaveValue("");
        expect(screen.getByPlaceholderText("Descripción (opcional)")).toHaveValue("");
        expect(screen.getByText("Agregar tarea")).toBeInTheDocument();
    });

    it("llama a onSubmit con los datos correctos al enviar el formulario", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        render(<TodoForm onSubmit={handleSubmit} />);

        await user.type(screen.getByPlaceholderText("Título de la tarea"), "Comprar pan");
        await user.type(screen.getByPlaceholderText("Descripción (opcional)"), "Antes de las 8");
        await user.click(screen.getByText("Agregar tarea"));

        expect(handleSubmit).toHaveBeenCalledWith({
            title: "Comprar pan",
            description: "Antes de las 8",
            dueDate: null,
            priority: "media",
        });
    });

    it("no llama a onSubmit si el título está vacío", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        render(<TodoForm onSubmit={handleSubmit} />);

        await user.click(screen.getByText("Agregar tarea"));

        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it("precarga los datos cuando recibe initialTask (modo edición)", () => {
        const task = {
            id: "1",
            title: "Tarea existente",
            description: "Descripción existente",
            completed: false,
            userId: "user1",
            createdAt: Date.now(),
            dueDate: "2026-09-20",
            priority: "alta" as const,
        };

        render(<TodoForm onSubmit={vi.fn()} initialTask={task} />);

        expect(screen.getByPlaceholderText("Título de la tarea")).toHaveValue("Tarea existente");
        expect(screen.getByText("Guardar cambios")).toBeInTheDocument();
    });
});