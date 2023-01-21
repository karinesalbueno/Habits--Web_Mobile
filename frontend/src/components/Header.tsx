import logoImg from '../assets/logo.svg'
import logoPlus from '../assets/Plus.svg'

export function Header() {
  return (
        <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
          <img src={logoImg} alt='habits' />
        
          <button
            type='button'
            className='border border-violet-500 font-semibold rounded-lg px-6 py-4
          flex items-center gap-3 hover:border-violet-300'
          >
            <img src={logoPlus} alt='plus' className='text-violet-500' />
            novo hábito
          </button>
        </div>
  )
};