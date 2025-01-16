import { Text } from "react-native";
import { Redirect } from "expo-router";
import { router } from "expo-router";

import { useSession } from "@/providers/ctx";
import AuthStack from "./AuthStack";

function AppLayout() {
    const { session } = useSession();

    if (!session) {
        router.replace("/auth")
    }

    return <AuthStack />;
}

export default AppLayout;