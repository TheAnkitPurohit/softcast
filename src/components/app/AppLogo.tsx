'use client'

import { Video } from 'lucide-react'

const AppLogo = () => {
  return (
    <>
      <div className='bg-purple-600 p-1.5 rounded-lg'>
        <Video className='w-5 h-5 text-white' />
      </div>
      <span className='text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-white/80'>
        SkyCast
      </span>
    </>
  )
}

export default AppLogo
