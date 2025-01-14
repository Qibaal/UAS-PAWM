import { useState } from "react";
import { useRouter } from "expo-router";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from "react-native";
import {
    signInWithEmail,
    signInWithGoogle,
    signUpWithEmail,
} from "../utils/auth";

const SignInScreen = () => {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const handleEmailAuth = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            if (isSignUp) {
                if (!fullName) {
                    Alert.alert("Error", "Please enter your full name");
                    return;
                }
                const result = await signUpWithEmail(email, password, fullName);
                if (result.success) {
                    router.push("/home");
                } else {
                    Alert.alert(
                        "Error",
                        result.error || "Failed to create account"
                    );
                }
            } else {
                const result = await signInWithEmail(email, password);
                if (result.success) {
                    router.push("/(app)/home");
                } else {
                    Alert.alert("Error", result.error || "Failed to sign in");
                }
            }
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };  

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithGoogle();
            if (result.success) {
                router.push("/home");
            } else {
                Alert.alert(
                    "Error",
                    result.error || "Failed to sign in with Google"
                );
            }
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.innerContainer}
            >
                <Text style={styles.title}>
                    {isSignUp ? "Create Account" : "Welcome Back"}
                </Text>

                {isSignUp && (
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={setFullName}
                        placeholderTextColor="#666"
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#666"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#666"
                />

                <TouchableOpacity
                    style={styles.emailButton}
                    onPress={handleEmailAuth}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleSignIn}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setIsSignUp(!isSignUp)}
                >
                    <Text style={styles.toggleText}>
                        {isSignUp
                            ? "Already have an account? Sign In"
                            : "Don't have an account? Sign Up"}
                    </Text>
                </TouchableOpacity>

                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ff69b4", // Pink
        textAlign: "center",
        marginBottom: 30,
    },
    input: {
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    emailButton: {
        backgroundColor: "#ff69b4", // Pink
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    googleButton: {
        backgroundColor: "#1e90ff", // Blue
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    toggleButton: {
        padding: 10,
    },
    toggleText: {
        color: "#1e90ff", // Blue
        textAlign: "center",
        fontSize: 14,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SignInScreen;
