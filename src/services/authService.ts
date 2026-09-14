import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    type User,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export const registerWithEmail = async (
    email: string,
    password: string
): Promise<User> => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    return credential.user;
};

export const loginWithEmail = async (
    email: string,
    password: string
): Promise<User> => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
};

export const loginWithGoogle = async (): Promise<User> => {
    const credential = await signInWithPopup(auth, googleProvider);
    return credential.user;
};

export const logout = async (): Promise<void> => {
    await signOut(auth);
};