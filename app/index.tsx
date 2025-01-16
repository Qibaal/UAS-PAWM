import { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen() {
    const videoRef = useRef(null);
    const player = useVideoPlayer(
        require("../assets/videos/stoichichoice.mp4"),
        (player) => {
            player.play();
        }
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/startscreen");
        }, 7500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <LinearGradient
            colors={["#FFC8DD", "#BDE0FE"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <VideoView
                ref={videoRef}
                player={player}
                style={styles.video}
                nativeControls={false}
                allowsFullscreen
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    video: {
        position: "absolute",
        top: 0,
        left: 0,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});
