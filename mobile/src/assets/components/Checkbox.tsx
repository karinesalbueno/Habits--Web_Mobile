import { View, TouchableOpacity, Text } from "react-native";

import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface ICheckcedProps {
    checked?: boolean;
    title?: string;
}

export function CheckBox({ checked = false, title }: ICheckcedProps) {

    return (
        <TouchableOpacity
            className="flex-row mb-2 items-center"
            activeOpacity={0.7}>
            {

                checked ?
                    <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
                        <Feather name="check" size={20} color={colors.white} />
                    </View>
                    :
                    <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
            }

            <Text className="text-white text-base ml-3">
                {title}
            </Text>

        </TouchableOpacity>
    )
}