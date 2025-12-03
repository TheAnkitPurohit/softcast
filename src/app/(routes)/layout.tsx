import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

import Sidebar from '@/components/Sidebar'
import { auth } from '@/lib/auth'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  })

  if (!session) {
    redirect('/')
  }

  return (
    <main className='min-h-screen flex bg-white dark:bg-black text-zinc-900 dark:text-white selection:bg-purple-500/30'>
      <Sidebar />

      <div className='flex-1 p-5 min-h-screen h-screen overflow-y-scroll'>
        {children}
      </div>
    </main>
  )
}

export default Layout
