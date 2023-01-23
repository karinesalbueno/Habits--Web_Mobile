import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView, View, Text, Alert } from "react-native";
import dayjs from "dayjs";

import { api } from "../lib/axios";
import { BackButton } from "../assets/components/BackButton";
import { ProgressBar } from "../assets/components/ProgressBar";
import { CheckBox } from "../assets/components/Checkbox";
import { Loading } from "../assets/components/Loading";

import { generateProgressPercentage } from '../utils/generate-percentagem'

interface Params { date: string }
interface DayInfoProps {
    possibleHabits: {
        id: string;
        title: string;
    }[];
    completedHabit: string[];
}

export function Habit() {
    const [loading, setLoading] = useState(true)
    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
    const [completedHabits, setCompletedHabits] = useState<string[]>([])

    const route = useRoute();
    const { date } = route.params as Params;

    const parsedDate = dayjs(date);
    const dayOfWeek = parsedDate.format('dddd');
    const dayAndMonth = parsedDate.format('DD/MM')

    const habitProgress =
        dayInfo?.possibleHabits.length ?
            generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length)
            : 0;

    const fetchHabits = async () => {
        try {
            setLoading(true)

            const response = await api.get('/day', {
                params: { date }
            })

            setDayInfo(response.data)
            setCompletedHabits(response.data.completedHabit)

        } catch (error) {
            console.log(error)
            Alert.alert('ops..', 'não foi possível carregar as informações :(')
        } finally {
            setLoading(false)
        }
    }

    const handleToggleHabit = async (habitId: string) => {
        if (completedHabits.includes(habitId)) {
            setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
        } else {
            setCompletedHabits(prevState => [...prevState, habitId])
        }
    }

    useEffect(() => { fetchHabits() }, [])

    if (loading) {
        return (<Loading />)
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16 ">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}>

                <BackButton />

                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                    {dayOfWeek}
                </Text>

                <Text className="mt-1 text-white font-extrabold text-3xl">
                    {dayAndMonth}
                </Text>

                <ProgressBar progress={habitProgress} />

                <View className="mt-6">
                    {
                        dayInfo?.possibleHabits &&
                        dayInfo.possibleHabits.map(habit => (
                            <CheckBox
                                key={habit.id}
                                title={habit.title}
                                checked={completedHabits.includes(habit.id)}
                                onPress={() => handleToggleHabit(habit.id)} />
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}