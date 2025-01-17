import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";

import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

// Define props type
interface GameOverDialogProps {
    currentScore: number;
    onRetry: () => void;
}

const GameOverDialog: React.FC<GameOverDialogProps> = ({
    currentScore,
    onRetry,
}) => {
    const onMenu = () => {
        router.replace("/(tabs)/home");
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.dialog}>
                <Image
                    source={require("../../../assets/images/virtual-lab/scientist.png")} // Replace with your image path
                    style={styles.dialogImage}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Game Over</Text>
                    <Text style={styles.currentScore}>
                        Current Score: {currentScore}
                    </Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={onRetry}
                    >
                        <Text style={styles.retryButtonText}>RETRY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={onMenu}
                    >
                        <Text style={styles.menuButtonText}>Back to Menu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
    },
    dialog: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        width: width * 0.8, // Responsive width
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    },
    dialogImage: {
        width: 120,
        height: 120,
        marginBottom: 20,
        resizeMode: "contain",
    },
    textContainer: {
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        fontFamily: "Montserrat",
        marginBottom: 20,
    },
    currentScore: {
        fontSize: 16,
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: "#c4c4c4",
        padding: 10,
        borderRadius: 10,
        width: "100%",
        marginBottom: 10,
        alignItems: "center",
    },
    retryButtonText: {
        color: "white",
        fontSize: 16,
    },
    menuButton: {
        backgroundColor: "#d3d3d3",
        padding: 10,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
    },
    menuButtonText: {
        color: "black",
        fontSize: 16,
    },
});

export default GameOverDialog;
