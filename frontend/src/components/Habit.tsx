import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { ProgressBar } from './ProgressBar';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface HabitDayProps {
    date: Date,
    defaultCompleted?: number,
    amount?: number
}

//inicando com 0 qnd não tiver dado
export function Habit({ defaultCompleted = 0, amount = 0, date }: HabitDayProps) {
    const [completed, setCompleted] = useState(defaultCompleted)

    const completdPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

    //dia e mês
    const dayAndMonth = dayjs(date).format('DD/MM');
    //dia da semana
    const dayOfWeek = dayjs(date).format('dddd');

    const handleCompletedChaged = (completed: number) => {
        setCompleted(completed)
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx('w-10 h-10 border-2 rounded-lg transition-colors', {
                    'bg-zinc-900 border-zinc-800': completdPercentage === 0,
                    'bg-violet-900 border-violet-700': completdPercentage > 0 && completdPercentage < 20,
                    'bg-violet-800 border-violet-600': completdPercentage >= 20 && completdPercentage < 40,
                    'bg-violet-700 border-violet-500': completdPercentage >= 40 && completdPercentage < 60,
                    'bg-violet-600 border-violet-500': completdPercentage >= 60 && completdPercentage < 80,
                    'bg-violet-500 border-violet-400': completdPercentage >= 80
                })} />

            <Popover.Portal>
                <Popover.Content
                    className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <span className='font-semibold text-zinc-400'> {dayOfWeek} </span>
                    <span className='mt-1 font-bold leading-tight text-1xl'>{dayAndMonth}</span>
                    <ProgressBar progress={completdPercentage} />

                    <HabitsList date={date} onCompletedChanged={handleCompletedChaged} />

                    <Popover.Arrow
                        height={8}
                        width={16}
                        className='fill-zinc-900' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default Habit