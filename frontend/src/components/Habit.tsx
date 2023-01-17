interface HabitProps {
    completed: number
}

export function Habit(props: HabitProps) {
    return (
        <div
            className='
        bg-zinc-900 text-white
        w-10 h-10 rounded m-2 text-center flex items-center justify-center'>
            {props.completed}
        </div>
    )
}

export default Habit