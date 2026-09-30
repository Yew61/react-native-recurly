import {View, Pressable, Text, FlatList} from 'react-native'
import {colors} from "@/constants/theme";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {USER_DATA} from "@/constants/data";
import WellbeingCard from "@/components/wellbeingCard";

const Onboarding = () => {
    return (
        <View className="flex-1 x w-full px-4 py-4">
            <Pressable
                className="w-full h-27 bg-[#e6edfb] rounded-3xl"
                onPress={() => router.push("/tracking")}
            >
                <View className="flex-row items-center h-full">
                    <AntDesign name="plus-circle" size={60} color={colors.lightBlue} className="mx-4"/>
                    <View className="flex-1">
                        <Text className="text-xl font-medium">Add today's entry</Text>
                        <Text className="text-gray-500 text-sm">Track you symptoms, mood, sleep and more</Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={24} color={colors.lightBlue} className="mx-3"/>
                </View>
            </Pressable>

            <Text className=" text-lg font-medium mt-5 mb-5">Recent Entries</Text>

            <FlatList
                className="flex-1"
                data={USER_DATA}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <WellbeingCard data={item} />
                )}
                ItemSeparatorComponent={() => <View className="h-2"/>}
            />
        </View>
    )
}

export default Onboarding