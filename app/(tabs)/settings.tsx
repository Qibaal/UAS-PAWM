import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
    View,
    Text,
    TextInput,
    Alert,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { getCurrentUserData, updateUserFields } from "@/utils/auth";
import { useSession } from "@/providers/ctx";

export default function SettingsScreen() {
    const { signOut } = useSession();
    const [userData, setUserData] = useState({ fullName: "", email: "" });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            const response = await getCurrentUserData();

            if (response.success && response.user) {
                setUserData({
                    fullName: response.user.fullName,
                    email: response.user.email,
                });
            } else {
                Alert.alert(
                    "Error",
                    response.error || "Failed to fetch user data."
                );
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, []);

    const handleFullNameChange = (text: string) => {
        setUserData((prev) => ({ ...prev, fullName: text }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        const response = await updateUserFields({
            fullName: userData.fullName,
        });

        if (response.success) {
            Alert.alert("Success", "Your full name has been updated.");
        } else {
            Alert.alert(
                "Error",
                response.error || "Failed to update full name."
            );
        }
        setIsLoading(false);
    };

    const handleSignOut = async () => {
        const response = await signOut();
        if (response.success) {
            router.replace("/startscreen");
        } else {
            Alert.alert("Error", "Failed to log out.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{userData.email}</Text>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Full Name:</Text>
                <TextInput
                    style={styles.input}
                    value={userData.fullName}
                    onChangeText={handleFullNameChange}
                    placeholder="Enter your full name"
                />
            </View>

            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={isLoading}
            >
                <Text style={styles.saveButtonText}>
                    {isLoading ? "Saving..." : "Save"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleSignOut}
            >
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    saveButton: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 20,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#ff4d4f",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    logoutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
