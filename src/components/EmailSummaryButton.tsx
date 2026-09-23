import { useState } from "react";

type Todo = { id: string; title: string; completed: boolean };
type Props = { todos: Todo[]; userEmail: string };

function buildSummary(todos: Todo[]) {
    const pendientes = todos.filter((t) => !t.completed).length;
    const completadas = todos.filter((t) => t.completed).length;
    return `Pendientes: ${pendientes}\nCompletadas: ${completadas}`;
}

export function EmailSummaryButton({ todos, userEmail }: Props) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [isCooldown, setIsCooldown] = useState(false);

    async function handleSend() {
        if (isCooldown || status === "loading") return;
        setStatus("loading");
        setErrorMsg("");
        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ to: userEmail, subject: "Mis tareas pendientes", body: buildSummary(todos) }),
            });
            const data = await res.json();
            if (!res.ok || !data.ok) {
                setStatus("error");
                setErrorMsg(data?.message ?? "Ocurrió un error al enviar el email.");
                return;
            }
            setStatus("success");
            setIsCooldown(true);
            setTimeout(() => {
                setIsCooldown(false);
                setStatus("idle");
            }, 60_000);
        } catch {
            setStatus("error");
            setErrorMsg("No se pudo conectar con el servidor.");
        }
    }

    return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <button
                type="button"
                className={`btn-summary ${status === "success" ? "sent" : ""}`}
                onClick={handleSend}
                disabled={status === "loading" || isCooldown}
            >
                {status === "loading"
                    ? "Enviando..."
                    : status === "success"
                    ? "¡Email enviado!"
                    : isCooldown
                    ? "Espera 1 min..."
                    : "Enviar mi resumen"}
            </button>
            {status === "error" && <span style={{ color: "var(--color-danger, #C0392B)", fontSize: "0.8rem" }}>{errorMsg}</span>}
        </div>
    );
}