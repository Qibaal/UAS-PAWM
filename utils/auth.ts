import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export interface AuthResponse {
    success: boolean;
    user?: UserData;
    error?: string;
}

interface UserData {
    fullName: string;
    email: string;
    uid: string;
}

GoogleSignin.configure({
    webClientId: "YOUR_WEB_CLIENT_ID",
});

export const signUpWithEmail = async (
    email: string,
    password: string,
    fullName: string
): Promise<AuthResponse> => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(
            email,
            password
        );
        const user = userCredential.user;

        await firestore().collection("users").doc(user.uid).set({
            fullName: fullName,
            email: user.email,
            uid: user.uid,
            score: 0,
            state: null,
            currentQuestion: 0,
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
        const userCredential = await auth().signInWithEmailAndPassword(
            email,
            password
        );
        return { success: true };
    } catch (error: any) {
        console.error("Error signing in:", error.message);
        return { success: false, error: error.message };
    }
};

export const signInWithGoogle = async (): Promise<AuthResponse> => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data?.idToken ?? null);

        const userCredential = await auth().signInWithCredential(
            googleCredential
        );
        const user = userCredential.user;

        const userDoc = await firestore()
            .collection("users")
            .doc(user.uid)
            .get();

        if (!userDoc.exists) {
            await firestore()
                .collection("users")
                .doc(user.uid)
                .set({
                    fullName: user.displayName || "",
                    email: user.email || "",
                    uid: user.uid,
                    score: 0,
                    state: null,
                    currentQuestion: 0,
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

export const handleSignOut = async (): Promise<void> => {
    try {
        await auth().signOut();
        console.log("User signed out successfully");
    } catch (error: any) {
        console.error("Error signing out:", error.message);
    }
};

export const getCurrentUserData = async (): Promise<any> => {
    try {
        const currentUser = auth().currentUser;

        if (!currentUser) {
            throw new Error("No authenticated user found.");
        }

        const uid = currentUser.uid;
        const userDocRef = firestore().collection("users").doc(uid);
        const userSnapshot = await userDocRef.get();

        if (userSnapshot.exists) {
            return { id: userSnapshot.id, ...userSnapshot.data() };
        } else {
            console.error("No user data found in Firestore for UID:", uid);
            return null;
        }
    } catch (error) {
        console.error("Error fetching current user data:", error);
        throw error;
    }
};

export const updateUserFields = async (
    updates: Record<string, any>
): Promise<void> => {
    try {
        const currentUser = auth().currentUser;

        if (!currentUser) {
            throw new Error("No user is currently signed in.");
        }

        const uid = currentUser.uid;
        const userDocRef = firestore().collection("users").doc(uid);

        await userDocRef.update(updates);
        console.log("User fields updated successfully.");
    } catch (error) {
        console.error("Error updating user fields:", error);
        throw error;
    }
};
