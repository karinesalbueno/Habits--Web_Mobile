import { useState } from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import { BackButton } from "../assets/components/BackButton";
import { CheckBox } from "../assets/components/Checkbox";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function NewHabit() {
    const [weekDays, setWeekDays] = useState<Number[]>([])

    const handleToggleWeekDay = (weekDayIndex: number) => {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(day => day !== weekDayIndex));
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }
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

                <Text className="mt-4 mb-3 font-semibold text-white text-base">
                    Qual a recorrência?
                </Text>

                {
                    availableWeekDays.map((weekday, i) => (
                        <CheckBox
                            key={weekday}
                            title={weekday}
                            checked={weekDays.includes(i)}
                            onPress={() => handleToggleWeekDay(i)}
                        />
                    )
                    )}
            </ScrollView>
        </View>
    )
}