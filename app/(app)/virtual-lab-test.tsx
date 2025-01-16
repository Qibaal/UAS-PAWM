import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./components/Header";
import Guide from "./components/Guide";
import TestArea from "./components/TestArea";

const VirtualLabTest = () => {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={["#8A2BE2", "#FF69B4"]}
                style={styles.background}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Header />
                    <View style={styles.content}>
                        <TestArea />
                        <Guide />
                    </View>
                </ScrollView>
            </LinearGradient>
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
});

export default VirtualLabTest;
