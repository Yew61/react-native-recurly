import {View, Text, Dimensions, ScrollView} from 'react-native'
import { useState } from 'react';
import CustomSlider from '@/components/CustomSlider';
import { colors } from '@/constants/theme';
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context"
import {styled} from "nativewind";
const SafeAreaView = styled(RNSafeAreaView);
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {router} from "expo-router";
import { LineChart } from 'react-native-chart-kit';

const Emotions = () => {
    const [anxiety, setAnxiety] = useState(5);
    const [depression, setDepression] = useState(5);
    const [stress, setStress] = useState(5);
    const [overallMood, setOverallMood] = useState(5);

    return (
        <SafeAreaView className="flex-1">
            <View className="relative flex-row items-center justify-center px-5 py-4" >
                <MaterialIcons name="arrow-back-ios" size={24} color="black" className="absolute left-5" onPress={() => router.back()}/>
                <Text className="text-3xl font-semibold">Emotions</Text>
            </View>

            <View className="px-4 py-4">
                <Text className="font-semibold text-lg">Anxiety</Text>
                <CustomSlider value={anxiety} onValueChange={setAnxiety} trackColor={colors.lightPurple} />

                <Text className="font-semibold text-lg mt-5">Depression</Text>
                <CustomSlider value={depression} onValueChange={setDepression} trackColor={colors.sliderBlue} />

                <Text className="font-semibold text-lg">Stress</Text>
                <CustomSlider value={stress} onValueChange={setStress} trackColor={colors.red} />

                <Text className="font-semibold text-lg mt-5">Overall Mood</Text>
                <CustomSlider value={overallMood} onValueChange={setOverallMood} trackColor={colors.green} />

                <Text className="font-semibold text-lg mt-5">Trending emotions (last 14 days)</Text>
                <ScrollView horizontal={true}>
                    <LineChart
                        data={{
                            labels: ['Day 14', 'Day 13', 'Day 12', 'Day 11', 'Day 10', 'Day 9', 'Day 8', 'Day 7', 'Day 6', 'Day 5', 'Day 4', 'Day 3', 'Day 2', 'Day 1'],
                            datasets: [
                                {
                                    data: [2, 5, 4, 5, 7, 9, 10,1,1,1,1,1,1,1,],
                                    color: (opacity = 0) => `rgba(134, 65, 244, ${opacity})`,
                                    strokeWidth: 2
                                },
                                {
                                    data: [2, 4, 9, 5, 7, 9, 10,1,1,1,1,1,2,1],
                                    color: (opacity = 1) => `rgba(34, 128, 200, ${opacity})`,
                                    strokeWidth: 2
                                },
                                {
                                    data: [2, 5, 6, 5, 6, 9, 10,3,1,1,1,1,2,1],
                                    color: (opacity = 1) => `rgba(34, 148, 200, ${opacity})`,
                                    strokeWidth: 2
                                }
                            ],
                            legend: ["Anxiety", "Depression", "Stress"]
                        }}
                        width={Dimensions.get('window').width * 2}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        bezier
                        withShadow={false}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Emotions