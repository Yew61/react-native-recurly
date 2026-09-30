import {View, Pressable, Text, Image} from 'react-native'
import {router} from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {colors} from "@/constants/theme";

const WellbeingCard = ({ data }: { data: userData }) => {

    const day = data.date.toLocaleDateString("en-AU", {
        weekday: "short",
    });

    const shortDate = data.date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
    });
    //

    let image;
    let feeling;

    if(data.wellbeing < 4){
        feeling = "Low"
        image = require("@/assets/images/low.png")
    } else if(data.wellbeing < 7){
        feeling = 'Ok'
        image = require("@/assets/images/ok.png")
    } else {
        feeling = "Good"
        image = require("@/assets/images/good.png")
    }
    return (
        <View>
            <Pressable
                className="w-full h-23 bg-white rounded-3xl"
                onPress={() => router.push("/statistics")}
            >
                <View className="flex-row items-center h-full">
                    <View >
                        <Text className="text-gray-500 text-lg pl-4" >{day}</Text>
                        <Text className="pl-4 font-medium">{shortDate}</Text>
                    </View>
                    <View className="w-[1px] h-[60%] bg-gray-300 mx-4" />
                    <View>
                        <Image source={image} className="w-14 h-14"/>
                    </View>
                    <View >
                        <Text className="text-sm font-medium">{feeling}</Text>
                        <Text className="text-sm text-gray-500">{data.wellbeing}/10</Text>
                    </View>
                    <View className="ml-4">
                        <Text className="text-xs text-gray-500">Sleep: {data.sleep}h</Text>
                        <Text className="text-xs text-gray-500">Symptoms: {data.symptom}/10</Text>
                        <Text className="text-xs text-gray-500">Functioning: {data.function}/10</Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="grey"/>
                </View>
            </Pressable>
        </View>
    )
}

export default WellbeingCard