import { useState } from "react";
import { router } from "expo-router";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    ScrollView,
    Dimensions,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useSession } from "@/providers/ctx";
import { signUpWithEmail } from "../utils/auth";

import AuthBg from "../assets/images/auth/authbg.jpg";
import BeakerLogo from "../assets/images/startscreenlogo.png";
import Eye from "../assets/images/eye.png";
import EyeOff from "../assets/images/hide.png";

export default function AuthScreen() {
    const { signIn } = useSession();

    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [agreed, setAgreed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const result = await signIn(email, password);
            if (result.success) {
                router.replace("/(tabs)/home");
            } else {
                Alert.alert("Error", result.error || "Failed to sign in");
            }
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!email || !password || !fullName) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            if (!fullName) {
                Alert.alert("Error", "Please enter your full name");
                return;
            }
            const result = await signUpWithEmail(email, password, fullName);
            if (result.success) {
                console.log("success");
                setIsSignUp(false);
            } else {
                Alert.alert(
                    "Error",
                    result.error || "Failed to create account"
                );
            }
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground source={AuthBg} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image source={BeakerLogo} style={styles.logo} />
                    <Text style={styles.headerText}>
                        {isSignUp ? "Create Account" : "Welcome Back"}
                    </Text>
                </View>

                <View style={styles.form}>
                    {isSignUp && (
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="none"
                            />
                        </View>
                    )}

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <Image source={EyeOff} style={styles.eyeicon} />
                            ) : (
                                <Image source={Eye} style={styles.eyeicon} />
                            )}
                        </TouchableOpacity>
                    </View>

                    {isSignUp && (
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setAgreed(!agreed)}
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    agreed && styles.checked,
                                ]}
                            />
                            <Text style={styles.checkboxText}>
                                I agree to the terms and conditions
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => {
                            isSignUp ? handleRegister() : handleSignIn();
                        }}
                    >
                        <Text style={styles.submitButtonText}>
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <TouchableOpacity
                        style={styles.switchButton}
                        onPress={() => setIsSignUp(!isSignUp)}
                    >
                        <Text style={styles.switchButtonText}>
                            {isSignUp
                                ? "Already have an account? Sign In"
                                : "Don't have an account? Sign Up"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </ImageBackground>
    );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        flexGrow: 1,
        padding: width * 0.05,
    },
    header: {
        alignItems: "center",
        marginVertical: height * 0.04,
    },
    logo: {
        width: 256,
        height: 256,
        resizeMode: "contain",
    },
    headerText: {
        fontSize: width * 0.06,
        fontWeight: "bold",
        color: "#fff",
        marginTop: height * 0.02,
    },
    form: {
        width: "100%",
        color: "#e5e7eb",
    },
    inputContainer: {
        marginBottom: height * 0.02,
        position: "relative",
    },
    input: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 12,
        padding: height * 0.018,
        fontSize: width * 0.04,
        backgroundColor: "#f9fafb",
    },
    eyeIcon: {
        position: "absolute",
        right: width * 0.04,
        top: height * 0.018,
    },
    eyeicon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: height * 0.02,
    },
    checkbox: {
        width: width * 0.05,
        height: width * 0.05,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#6366f1",
        marginRight: width * 0.02,
    },
    checked: {
        backgroundColor: "#6366f1",
    },
    checkboxText: {
        fontSize: width * 0.035,
        color: "#fff",
    },
    submitButton: {
        backgroundColor: "#6366f1",
        padding: height * 0.018,
        borderRadius: 12,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: width * 0.04,
        fontWeight: "600",
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: height * 0.01,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#e5e7eb",
    },
    dividerText: {
        marginHorizontal: width * 0.03,
        color: "#fff",
        fontSize: width * 0.035,
    },
    socialButtons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: width * 0.04,
    },
    socialButton: {
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: 12,
    },
    switchButton: {
        marginTop: 0,
        alignItems: "center",
    },
    switchButtonText: {
        color: "#fff",
        fontWeight: 600,
        fontSize: width * 0.035,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
});
