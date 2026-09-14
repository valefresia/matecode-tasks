import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Auth.css";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register, loginGoogle, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await register(email, password);
            navigate("/tasks");
        } catch {
            // el error ya queda seteado en el contexto
        }
    };

    const handleGoogleRegister = async () => {
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
                <h1>Empezá a organizarte</h1>
                <p className="auth-subtitle">Anotá todo lo que tenés que hacer, sin excusas</p>
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
                        placeholder="Contraseña (mínimo 6 caracteres)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                    <button className="btn-primary" type="submit">Crear cuenta</button>
                </form>

                <button className="btn-google" onClick={handleGoogleRegister}>
                    Registrarse con Google
                </button>

                <p className="auth-switch">
                    ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
                </p>
            </div>
        </div>
    );
};