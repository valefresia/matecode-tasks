import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Auth.css";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loginGoogle, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/tasks");
        } catch {
            // el error ya queda seteado en el contexto
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginGoogle();
            navigate("/tasks");
        } catch {
            // el error ya queda seteado en el contexto
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Hola de nuevo 🧉</h1>
                <p className="auth-subtitle">Iniciá sesión para ver tus tareas</p>

                {error && <p className="auth-error" role="alert">{error}</p>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="btn-primary" type="submit">Ingresar</button>
                </form>

                <button className="btn-google" onClick={handleGoogleLogin}>
                    Ingresar con Google
                </button>

                <p className="auth-switch">
                    ¿No tenés cuenta? <Link to="/register">Registrate</Link>
                </p>
            </div>
        </div>
    );
};