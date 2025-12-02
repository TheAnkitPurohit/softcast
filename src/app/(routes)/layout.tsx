import { headers } from 'next/headers'
import React from 'react'

import Footer from '@/components/landing/Footer'
import Navbar from '@/components/landing/Navbar'
import { auth } from '@/lib/auth'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  })

  const { user } = session || {}

  const userId = user?.id

  return (
    <main className='min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white selection:bg-purple-500/30'>
      <Navbar isSignedIn={!!userId} />

      {children}

      <Footer />
    </main>
  )
}

export default Layout
