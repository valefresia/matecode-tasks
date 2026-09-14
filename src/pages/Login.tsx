import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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
        <div>
            <h1>Iniciar sesión</h1>

            {error && <p role="alert">{error}</p>}

            <form onSubmit={handleSubmit}>
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
                <button type="submit">Ingresar</button>
            </form>

            <button onClick={handleGoogleLogin}>Ingresar con Google</button>

            <p>
                ¿No tenés cuenta? <Link to="/register">Registrate</Link>
            </p>
        </div>
    );
};