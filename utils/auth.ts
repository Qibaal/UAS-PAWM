import { auth, db } from "@/config/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";

export interface AuthResponse {
    success: boolean;
    user?: UserData;
    error?: string;
}

export interface UserData {
    fullName: string;
    email: string;
    uid: string;
    currentQuestion: number;
    score: number;
    state?: string;
}

export const signUpWithEmail = async (
    email: string,
    password: string,
    fullName: string
): Promise<AuthResponse> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        await addDoc(collection(db, "users"), {
            fullName: fullName,
            email: user.email,
            uid: user.uid,
            currentQuestion: 0,
            score: 0,
            state: null,
        });

        return { success: true };
    } catch (error: any) {
        console.error("Error signing up:", error.message);
        return { success: false, error: error.message };
    }
};

export const signInWithEmail = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        return { success: true };
    } catch (error: any) {
        console.error("Error signing in:", error.message);
        return { success: false, error: error.message };
    }
};

export const signInWithGoogle = async (): Promise<AuthResponse> => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            await addDoc(usersRef, {
                fullName: user.displayName || "",
                email: user.email || "",
                uid: user.uid,
            });
        } else {
            console.log("User already exists in Firestore.");
        }

        return { success: true };
    } catch (error: any) {
        console.error("Error signing in with Google:", error.message);
        return { success: false, error: error.message };
    }
};

export const handleSignOut = async (): Promise<{ success: boolean }> => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
        return { success: true };
    } catch (error: any) {
        console.error("Error signing out:", error.message);
        return { success: false };
    }
};

export const getCurrentUserData = async (): Promise<AuthResponse> => {
    try {
        const currentUserID = auth?.currentUser?.uid;

        if (!currentUserID) {
            console.error("No authenticated user found.");
            return { success: false, error: "No authenticated user found." };
        }

        const q = query(
            collection(db, "users"),
            where("uid", "==", currentUserID)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userInfo = querySnapshot.docs[0].data();
            return {
                success: true,
                user: {
                    fullName: userInfo?.fullName,
                    email: userInfo?.email,
                    uid: userInfo?.uid,
                    currentQuestion: userInfo?.currentQuestion,
                    score: userInfo?.score,
                    state: userInfo?.state,
                },
            };
        } else {
            console.log("No user found with id: ", currentUserID);
            return {
                success: false,
                error: "No user found with the provided user ID.",
            };
        }
    } catch (error: any) {
        console.error("Error fetching current user data:", error.message);
        return { success: false, error: error.message };
    }
};

export const updateUserFields = async (
    updates: Record<string, any>
): Promise<{ success: boolean; error?: string }> => {
    try {
        const currentUserID = auth?.currentUser?.uid;

        if (!currentUserID) {
            throw new Error("No user is currently signed in.");
        }

        const q = query(
            collection(db, "users"),
            where("uid", "==", currentUserID)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDocRef = querySnapshot.docs[0].ref;
            await updateDoc(userDocRef, updates);
            return { success: true };
        } else {
            console.error("No user found with the provided user ID.");
            return {
                success: false,
                error: "No user found with the provided user ID.",
            };
        }
    } catch (error: any) {
        console.error("Error updating user fields:", error.message);
        return { success: false, error: error.message };
    }
};
