import React from "react";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserData } from "@/utils/auth";

const Header: React.FC<{ userData: UserData | null }> = ({ userData }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.replace("../(tabs)/home")}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.profileSection}>
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>{userData?.fullName}</Text>
                    <Text style={styles.userScore}>
                        Highest Score: {userData?.score}
                    </Text>
                </View>
                <Ionicons
                    name="person-circle-outline"
                    size={48}
                    color="white"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    backText: {
        color: "white",
        marginLeft: 8,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textContainer: {
        alignItems: "flex-end",
    },
    userName: {
        color: "white",
        marginBottom: 4,
        textAlign: "right",
    },
    userScore: {
        color: "white",
        textAlign: "right",
    },
});

export default Header;
