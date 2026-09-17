import { describe, it, expect, vi } from "vitest";
import { createTask } from "../src/services/taskService";

vi.mock("../src/services/firebase", () => ({
    db: {},
}));

vi.mock("firebase/firestore", () => ({
    collection: vi.fn(),
    addDoc: vi.fn().mockResolvedValue({ id: "mocked-id" }),
    serverTimestamp: vi.fn(),
}));

describe("createTask", () => {
    it("llama a addDoc con los datos de la tarea", async () => {
        const { addDoc } = await import("firebase/firestore");

        await createTask("user1", { title: "Test", description: "", dueDate: null, priority: "baja" });

        expect(addDoc).toHaveBeenCalled();
    });
});