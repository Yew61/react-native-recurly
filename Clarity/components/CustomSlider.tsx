import React from 'react';
import { View, Text } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';

import { colors } from '@/constants/theme';

interface CustomSliderProps {
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    trackColor?: string;
    trackThickness?: number;
}

const CustomSlider = ({
    value,
    onValueChange,
    min = 0,
    max = 10,
    trackColor = colors.blue,
    trackThickness = 8,
}: CustomSliderProps) => {
    return (
        <View className="flex-row items-center w-full">
            <Slider
                containerStyle={{ flex: 1 }}
                minimumValue={min}
                maximumValue={max}
                value={value}
                onValueChange={(value) => onValueChange(Array.isArray(value) ? value[0] : value)}
                minimumTrackTintColor={trackColor}
                maximumTrackTintColor="#e5e7eb" // Tailwind gray-200
                thumbTintColor={trackColor}
                step={1}
                trackStyle={{ height: trackThickness }}
            />
            <Text className="text-lg font-semibold ml-2 w-8 text-center">
                {Math.round(value)}
            </Text>
        </View>
    );
};

export default CustomSlider;
