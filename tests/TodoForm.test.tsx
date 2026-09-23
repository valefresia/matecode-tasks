import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoForm } from "../src/components/TodoForm";
import { toISODate } from "../src/utils/dateHelpers";

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

    it("muestra un mensaje claro de error al seleccionar una fecha pasada y no llama a onSubmit", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        render(<TodoForm onSubmit={handleSubmit} />);

        await user.type(screen.getByPlaceholderText("Título de la tarea"), "Tarea con fecha pasada");

        const dateInput = screen.getByLabelText("Fecha límite");
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const pastDateStr = toISODate(yesterday);

        fireEvent.change(dateInput, { target: { value: pastDateStr } });

        expect(
            screen.getByText("No podés seleccionar una fecha anterior al día de hoy.")
        ).toBeInTheDocument();

        await user.click(screen.getByText("Agregar tarea"));

        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it("permite enviar el formulario si la fecha es hoy o futura", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        render(<TodoForm onSubmit={handleSubmit} />);

        await user.type(screen.getByPlaceholderText("Título de la tarea"), "Tarea para hoy");

        const dateInput = screen.getByLabelText("Fecha límite");
        const todayStr = toISODate(new Date());

        fireEvent.change(dateInput, { target: { value: todayStr } });

        expect(
            screen.queryByText("No podés seleccionar una fecha anterior al día de hoy.")
        ).not.toBeInTheDocument();

        await user.click(screen.getByText("Agregar tarea"));

        expect(handleSubmit).toHaveBeenCalledWith({
            title: "Tarea para hoy",
            description: "",
            dueDate: todayStr,
            priority: "media",
        });
    });

    it("bloquea y muestra mensaje de error en modo edición si se selecciona una fecha pasada", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();
        const today = new Date();
        const task = {
            id: "1",
            title: "Editar tarea",
            description: "",
            completed: false,
            userId: "user1",
            createdAt: Date.now(),
            dueDate: toISODate(today),
            priority: "media" as const,
        };

        render(<TodoForm onSubmit={handleSubmit} initialTask={task} />);

        const dateInput = screen.getByLabelText("Fecha límite");
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const pastDateStr = toISODate(yesterday);

        fireEvent.change(dateInput, { target: { value: pastDateStr } });

        expect(
            screen.getByText("No podés seleccionar una fecha anterior al día de hoy.")
        ).toBeInTheDocument();

        await user.click(screen.getByText("Guardar cambios"));

        expect(handleSubmit).not.toHaveBeenCalled();
    });
});