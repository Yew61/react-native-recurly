import {View, Text, FlatList} from 'react-native'
import {router} from "expo-router";
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context"
import {styled} from "nativewind";
const SafeAreaView = styled(RNSafeAreaView);
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {colors} from "@/constants/theme"
import {trackingCards} from "@/constants/data";
import TrackingCard from "@/components/trackingCard";


const Tracking = () => {

    const today = new Date();

    const fullDate = today.toLocaleDateString("en-AU", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <SafeAreaView className="flex-1">
            <View className="relative flex-row items-center justify-center px-5 py-4" >
                <MaterialIcons name="arrow-back-ios" size={24} color="black" className="absolute left-5" onPress={() => router.back()}/>
                <Text className="text-3xl font-semibold">Track</Text>
            </View>
            <View className="px-4 py-4">
                <View  className="w-full h-27 bg-[#e6edfb] rounded-3xl flex-row items-center">
                    <FontAwesome5 name="calendar" size={60} color={colors.lightBlue}  className="mx-4"/>
                    <View>
                        <Text className="text-xl font-medium">Today</Text>
                        <Text className="text-gray-500">{fullDate}</Text>
                    </View>
                </View>

                <Text className=" text-lg font-medium mt-5 mb-5">Select a section to update</Text>

                <FlatList
                    data={trackingCards}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                        <TrackingCard data={item} />
                    )}
                    ItemSeparatorComponent={() => <View className="h-2"/>}
                />
            </View>
        </SafeAreaView>
    )
}

export default Tracking