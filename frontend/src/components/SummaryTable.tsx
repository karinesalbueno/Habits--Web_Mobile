import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { generateDatesFromYearBegining } from "../utils/generateDates"

import { api } from '../lib/axios'
import Habit from "./Habit"

type Summary = {
    id: string;
    date: string;
    amount: number;
    completed: number;
}[]

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const SummaryDates = generateDatesFromYearBegining()

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - SummaryDates.length;

export function SummaryTable() {
    const [summary, setSummary] = useState<Summary>([])

    useEffect(() => {
        api.get('summary').then((res: { data: any; }) => {
            setSummary(res.data)
        })
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => {
                    return (
                        <div
                            key={`${weekDay}-${i}`}
                            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
                        >
                            {weekDay}
                        </div>
                    )
                })}
            </div>

            <div
                className="grid grid-rows-7 grid-flow-col gap-3">
                {SummaryDates.map(date => {
                    //verificar se o dia q está percorrendo está dentro do retorno do back
                    const dayInSummary = summary.find(day => {
                        //validando se apenas a data q está sendo percorrida é igual a alguma data q está presente no retorno
                        return dayjs(date).isSame(day.date, 'day')
                    })

                    return (
                        <Habit
                            date={date}
                            amount={dayInSummary?.amount}
                            completed={dayInSummary?.completed}
                            key={date.toString()} />
                    )
                })}
                {/* Array.from: faz o array a partir do numero */}
                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
                    return (
                        <div
                            key={i}
                            className="w-10 h-10
                             bg-zinc-900 border border-zinc-800 rounded-lg
                            opacity-40 cursor-not-allowed"
                        />
                    )
                })}
            </div>
        </div>
    )
};