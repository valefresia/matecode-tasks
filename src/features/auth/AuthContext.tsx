import { createContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../services/firebase";
import {
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout as logoutService,
} from "../../services/authService";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    register: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    loginGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const register = async (email: string, password: string) => {
        setError(null);
        try {
            await registerWithEmail(email, password);
        } catch (err) {
            setError(mapAuthError(err));
            throw err;
        }
    };

    const login = async (email: string, password: string) => {
        setError(null);
        try {
            await loginWithEmail(email, password);
        } catch (err) {
            setError(mapAuthError(err));
            throw err;
        }
    };

    const loginGoogle = async () => {
        setError(null);
        try {
            await loginWithGoogle();
        } catch (err) {
            setError(mapAuthError(err));
            throw err;
        }
    };

    const logout = async () => {
        setError(null);
        await logoutService();
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, error, register, login, loginGoogle, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function mapAuthError(err: unknown): string {
    const code = (err as { code?: string })?.code ?? "";

    switch (code) {
        case "auth/email-already-in-use":
            return "Ese email ya está registrado.";
        case "auth/invalid-email":
            return "El email no es válido.";
        case "auth/weak-password":
            return "La contraseña debe tener al menos 6 caracteres.";
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "Email o contraseña incorrectos.";
        case "auth/popup-closed-by-user":
            return "Cerraste la ventana de Google antes de completar el login.";
        default:
            return "Ocurrió un error inesperado. Intentá de nuevo.";
    }
}