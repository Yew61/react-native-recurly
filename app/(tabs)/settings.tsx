import {Text, Pressable} from 'react-native'
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context"
import {styled} from "nativewind";
import {useAuth} from "@clerk/expo";
const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
    const {signOut} = useAuth();
    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text>Settings</Text>
            <Pressable onPress={() => signOut()} className="mt-5 p-3 bg-primary rounded">
                <Text className="text-white text-center">Logout</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default Settings