import {View, Pressable, Image, Text} from 'react-native'
import {router} from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TrackingCard = ({ data }: { data: TrackingCards }) => {
    return (
        <View>
            <Pressable
                className="flex-row items-center w-full h-27 rounded-3xl bg-white"
                onPress={() => router.push("/(trackingPages)/emotions")}
            >
                <Image source={data.icon} className="w-18 h-18 mx-4"/>
                <View>
                    <Text className="text-xl font-medium">Emotions</Text>
                    <Text className="text-gray-500">How are your feeling?</Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={24} color="grey" className="mx-3"/>
            </Pressable>
        </View>
    )
}

export default TrackingCard