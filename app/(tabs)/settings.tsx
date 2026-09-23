import {Text, Pressable} from 'react-native'
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context"
import {styled} from "nativewind";
import {useAuth} from "@clerk/expo";
import {posthog} from "@/lib/posthog";
const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
    const {signOut} = useAuth();

    const onSignOut = async () => {
        posthog?.capture('signed_out');
        posthog?.reset();
        await signOut();
    };

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text>Settings</Text>
            <Pressable onPress={onSignOut} className="mt-5 p-3 bg-primary rounded">
                <Text className="text-white text-center">Logout</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default Settings