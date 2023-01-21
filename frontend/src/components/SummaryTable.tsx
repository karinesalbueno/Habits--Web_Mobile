import { generateDatesFromYearBegining } from "../utils/generateDates"
import Habit from "./Habit"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const SummaryDates = generateDatesFromYearBegining()

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - SummaryDates.length;

export function SummaryTable() {
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
                    return (
                        <Habit key={date.toString()} />
                    )
                })}
                {/* Array.from: faz o array a partir do numero */}
                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map(() => {
                    return (
                        <div
                            className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg
            opacity-40 cursor-not-allowed"/>
                    )
                })}
            </div>
        </div>
    )
};