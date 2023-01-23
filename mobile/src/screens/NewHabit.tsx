import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

import { BackButton } from "../assets/components/BackButton";
import { CheckBox } from "../assets/components/Checkbox";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function NewHabit() {
    const [weekDays, setWeekDays] = useState<Number[]>([])
    const [title, setTitle] = useState('')

    const handleToggleWeekDay = (weekDayIndex: number) => {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(day => day !== weekDayIndex));
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }

    const handleCreateNewHabit = async () => {
        try {
            //trim() remove espaço
            if (!title.trim() || weekDays.length === 0) {
               return Alert.alert('Novo hábito', 'informe o nome do novo hábito e escolha o dia da semana :)')
            }

            await api.post('/habits', {title, weekDays});

            setTitle('')
            setWeekDays([])

            Alert.alert('Novo hábito', 'hábito criado com sucesso :D')

        } catch(error) {
            console.log(error)
            Alert.alert('Ops', 'não foi possível criar novo hábito')
        }
    }

    return (
        <View
            className="flex-1 bg-background px-8 pt-16 ">
            {/* rolagem */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}>

                <BackButton />

                <Text className="mt-6 text-white font-semibold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-bold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
                    placeholder="ex.: exercícios, estudos, alimentação..."
                    placeholderTextColor={colors.zinc[400]}
                    value={title}
                    onChangeText={setTitle} />

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

                <TouchableOpacity
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                    activeOpacity={0.7}
                    onPress={handleCreateNewHabit}>
                    <Feather name="check" size={20} color={colors.white} />
                    <Text className="font-semibold text-base text-white ml-2">
                        confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}