import { Stack } from "expo-router";

const AuthStack = () => {
    return (
        <Stack>
            <Stack.Screen
                name="virtual-lab"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="virtual-lab-test"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

export default AuthStack;
