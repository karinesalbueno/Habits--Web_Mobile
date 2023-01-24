import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView, View, Text, Alert } from "react-native";
import clsx from "clsx";
import dayjs from "dayjs";

import { api } from "../lib/axios";
import { BackButton } from "../assets/components/BackButton";
import { ProgressBar } from "../assets/components/ProgressBar";
import { CheckBox } from "../assets/components/Checkbox";
import { Loading } from "../assets/components/Loading";

import { generateProgressPercentage } from '../utils/generate-percentagem'
import { HabitsEmpty } from "../assets/components/HabitEmpty";

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
    const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
    const dayOfWeek = parsedDate.format('dddd');
    const dayAndMonth = parsedDate.format('DD/MM')

    const fetchHabits = async () => {
        try {
            setLoading(true)

            const response = await api.get('/day', {
                params: { date }
            })

            setDayInfo(response.data)
            setCompletedHabits(response.data.completedHabit ?? [])

        } catch (error) {
            console.log(error)
            Alert.alert('ops..', 'não foi possível carregar as informações :(')
        } finally {
            setLoading(false)
        }
    }

    const handleToggleHabit = async (habitId: string) => {
        try {
            await api.patch(`/habits/${habitId}/toggle`);

            if (completedHabits.includes(habitId)) {
                setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
            } else {
                setCompletedHabits(prevState => [...prevState, habitId])
            }

        } catch (error) {
            console.log(error)
            Alert.alert('Ops', 'Não foi possível atualizar o status do hábito.')
        }
    }

    useEffect(() => { fetchHabits() }, [])

    const habitsProgress = dayInfo?.possibleHabits?.length ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

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

                <ProgressBar progress={habitsProgress} />

                {/* foco baixo em data passada */}
                <View className={clsx("mt-6", {
                    ["opacity-50"]: isDateInPast
                })}>
                    {
                        dayInfo?.possibleHabits.length !== 0 ?
                            dayInfo?.possibleHabits.map(habit => (
                                <CheckBox
                                    key={habit.id}
                                    title={habit.title}
                                    disabled={isDateInPast}
                                    checked={completedHabits.includes(habit.id)}
                                    onPress={() => handleToggleHabit(habit.id)} />
                            ))
                            : <HabitsEmpty />
                    }

                </View>
                {
                    isDateInPast && (
                        <Text className="text-white mt-10 text-center">
                            Você não pode editar hábitos de uma data passada.
                        </Text>
                    )
                }
            </ScrollView>
        </View>
    )
}