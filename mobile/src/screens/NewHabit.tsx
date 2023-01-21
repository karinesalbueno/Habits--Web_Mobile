import { ScrollView, View, Text, TextInput } from "react-native";
import { BackButton } from "../assets/components/BackButton";
import { CheckBox } from "../assets/components/Checkbox";

export function NewHabit() {
    return (
        <View
            className="flex-1 bg-background px-8 pt-16 ">
            {/* rolagem */}
            <ScrollView showsVerticalScrollIndicator={false}>

                <BackButton />

                <Text className="mt-6 text-white font-semibold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-bold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600" />

                <CheckBox title="Beber água"/>
            </ScrollView>
        </View>
    )
}