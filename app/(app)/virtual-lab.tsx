import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./components/Header";
import Guide from "./components/Guide";
import LabArea from "./components/LabArea";

import { UserData, getCurrentUserData } from "@/utils/auth";

const VirtualLab = () => {
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
            <LinearGradient
                colors={["#8A2BE2", "#FF69B4"]}
                style={styles.background}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Header userData={userData} />
                    <View style={styles.content}>
                        <LabArea currentState={userData?.state}/>
                        <Guide />
                    </View>
                </ScrollView>
            </LinearGradient>

            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default VirtualLab;
