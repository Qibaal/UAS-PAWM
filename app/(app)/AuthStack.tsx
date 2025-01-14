import { Stack } from "expo-router";


const AuthStack = () => {
    return (
        <Stack>
            <Stack.Screen name="home" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
};

export default AuthStack;