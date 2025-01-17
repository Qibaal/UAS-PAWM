import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { UserData, getCurrentUserData } from "@/utils/auth";

const HomePage = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);

                const data = await getCurrentUserData();

                setUserData(data.user || null);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.backgroundImage}>
                <LinearGradient
                    colors={[
                        "rgba(128, 0, 128, 0.8)",
                        "rgba(255, 192, 203, 0.8)",
                    ]}
                    style={styles.gradient}
                >
                    <View style={styles.header}>
                        <Ionicons
                            name="person-circle-outline"
                            size={48}
                            color="white"
                        />
                        <View style={styles.headerText}>
                            <Text style={styles.greeting}>
                                Hello, {userData?.fullName}
                            </Text>
                            <Text style={styles.score}>
                                Highest Score: {userData?.score}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Virtual-Lab</Text>
                            <Text style={styles.cardDescription}>
                                Interactive simulation for scientific
                                experiments and exploration.
                            </Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() =>
                                    router.replace("../(app)/virtual-lab")
                                }
                            >
                                <Text style={styles.buttonText}>
                                    Go to Virtual Lab
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Virtual-Test</Text>
                            <Text style={styles.cardDescription}>
                                Assessment of knowledge in a virtual experiment
                                setting.
                            </Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() =>
                                    router.replace("../(app)/virtual-lab-test")
                                }
                            >
                                <Text style={styles.buttonText}>
                                    Go to Virtual Test
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 48,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
        textShadowColor: "rgba(0, 0, 0, 0.75)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "white",
        marginBottom: 40,
        textAlign: "center",
    },
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    gradient: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E9C7ED",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    profileCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#FFFFFF",
        marginRight: 15,
    },
    headerText: {
        flex: 1,
    },
    greeting: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000000",
    },
    score: {
        fontSize: 14,
        color: "#666666",
        marginTop: 4,
    },
    content: {
        flex: 1,
        gap: 20,
    },
    card: {
        backgroundColor: "#CE7FCF",
        borderRadius: 10,
        padding: 20,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: "#FFFFFF",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#6366f1",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "500",
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomePage;
