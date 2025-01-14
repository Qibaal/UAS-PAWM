import { useContext, createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { auth } from '@/config/firebaseConfig';
import { signInWithEmail, handleSignOut } from '@/utils/auth';
import { User } from '@react-native-google-signin/google-signin';
import { onAuthStateChanged } from '@react-native-firebase/auth';
import { AuthResponse } from '@/utils/auth';
import { useStorageState } from './useStorageState';

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  session?: User | null;
  isLoading: boolean;
}>({
  signIn: async () => {
    return {} as AuthResponse;
  },
  signOut: async () => {},
  session: null,
  isLoading: false,
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
  const [[isLoading, session], setSession] = useStorageState('session');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User) => {
      if (user) {
        setSession(JSON.stringify(user));
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
        session: session ? JSON.parse(session) : null,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}