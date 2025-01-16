import { Stack } from "expo-router";


const AuthStack = () => {
    return (
        <Stack>
            <Stack.Screen name="virtual-lab" />
            <Stack.Screen name="virtual-lab-test" />
        </Stack>
    );
};

export default AuthStack;