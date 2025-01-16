import {
    useContext,
    createContext,
    type PropsWithChildren,
    useEffect,
} from "react";
import { useState } from "react";
import { auth } from "@/config/firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import { signInWithEmail, handleSignOut } from "@/utils/auth";
import { AuthResponse } from "@/utils/auth";

const AuthContext = createContext<{
    signIn: (email: string, password: string) => Promise<AuthResponse>;
    signOut: () => Promise<{ success: boolean }>;
    session?: User | null;
}>({
    signIn: async () => {
        return {} as AuthResponse;
    },
    signOut: async () => {
        return { success: true };
    },
    session: null,
});

export function useSession() {
    const value = useContext(AuthContext);
    // if (process.env.NODE_ENV !== 'production') {
    //   if (!value) {
    //     throw new Error('useSession must be wrapped in a <SessionProvider />');
    //   }
    // }
    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<User | null>(auth?.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                setSession(user);
            } else {
                setSession(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    return (
        <AuthContext.Provider
            value={{
                signIn: signInWithEmail,
                signOut: handleSignOut,
                session: session ? session : null,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
