import { router } from "expo-router";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import BeakerLogo from "../assets/images/startscreenlogo.png";
import Bg from "@/assets/images/startscreenbg.jpg";

export default function StartScreen() {
    return (
        <ImageBackground source={Bg} style={styles.container}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image source={BeakerLogo} style={styles.logo} />
                    <Text style={styles.appName}>Stoichify</Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.replace("/auth")}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>

                <Text
                    onPress={() => router.replace("/auth")}
                    style={styles.subText}
                >
                    I already have an account
                </Text>
            </View>
        </ImageBackground>
    );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: width * 0.05,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: height * 0.08,
    },
    logo: {
        width: 256,
        height: 256,
        resizeMode: "contain",
    },
    appName: {
        fontSize: width * 0.08,
        color: "#fff",
        fontWeight: "bold",
        marginTop: height * 0.02,
    },
    button: {
        backgroundColor: "#fff",
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        borderRadius: 50,
        width: width * 0.8,
        alignItems: "center",
        marginTop: height * 0.04,
    },
    buttonText: {
        color: "#6366f1",
        fontSize: width * 0.07,
        fontWeight: "600",
    },
    subText: {
        color: "#fff",
        marginTop: height * 0.02,
        fontSize: width * 0.035,
    },
});
