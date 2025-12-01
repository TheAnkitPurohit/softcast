import { headers } from 'next/headers'
import React from 'react'

import Navbar from '@/components/Navbar'
import { auth } from '@/lib/auth'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  })

  const { user } = session || {}

  const userId = user?.id

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <Navbar isSignedIn={!!userId} />

      {children}
    </div>
  )
}

export default Layout
