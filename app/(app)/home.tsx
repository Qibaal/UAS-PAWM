import { useRouter } from "expo-router";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useSession } from "@/providers/ctx";

const HomePage = () => {
    const router = useRouter();
    const { signOut } = useSession();

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
                    <View style={styles.content}>
                        <Text style={styles.title}>Stoichify</Text>
                        <Text style={styles.subtitle}>
                            Master Stoichiometry with Ease
                        </Text>

                        {/* Navigate to VirtualLab */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => router.push("/")}
                        >
                            <Text style={styles.buttonText}>Virtual Lab</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => console.log("Test Page pressed")}
                        >
                            <Text style={styles.buttonText}>
                                Test Your Knowledge
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => signOut()}
                        >
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
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
    button: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "white",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default HomePage;
