import { useAuth } from "../hooks/useAuth";

export const Tasks = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Mis tareas</h1>
            <p>Sesión iniciada como: {user?.email}</p>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    );
};