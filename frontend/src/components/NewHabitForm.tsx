import { FormEvent, useState } from 'react';

import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from "phosphor-react";

const availableWeekDays = [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado'
];

export function NewHabitForm() {

    const [title, setTitle] = useState('');
    //array numérico
    const [days, setDays] = useState<number[]>([]);

    const createNewHabit = (event: FormEvent) => {
        event.preventDefault();
    }

    const handleToggleWeekDay = (weekday: number) => {
        if (days.includes(weekday)) {
            const weekDaysWithRemovedOne = days.filter(day => day !== weekday)

            setDays(weekDaysWithRemovedOne)
        } else {
            const weekDaysWithAddOne = [...days, weekday]

            setDays(weekDaysWithAddOne)
        }
    }

    return (
        <form
            className="w-full flex flex-col mt-6"
            onSubmit={createNewHabit}>

            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>

            <input type="text"
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placehoder:text-zinc-400"
                id="title"
                placeholder="ex.: exercício, estudo, alimentação..."
                autoFocus
                onChange={event => setTitle(event.target.value)}
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className="flex flex-col">

                {availableWeekDays.map((weekday, i) => {
                    return (
                        <Checkbox.Root
                            key={weekday}
                            className='flex items-center gap-3 group p-1'
                            onCheckedChange={() => handleToggleWeekDay(i)}>

                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50'>
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white" />
                                </Checkbox.Indicator>
                            </div>

                            <span className="text-white leading-tight">
                                {weekday}
                            </span>
                        </Checkbox.Root>
                    )
                })}
            </div>

            <button type="submit"
                className="mt-6 rounded-lg p-4 gap-3 flex items-center font-semibold bg-green-600 justify-center hover:bg-green-500">
                <Check size={20} weight="bold" />
                confirmar
            </button>
        </form>
    )
}