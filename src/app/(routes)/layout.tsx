import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

import { getUserById } from '@/app/actions'
import Navbar from '@/components/Navbar'
import UserProviderWrapper from '@/components/UserProviderWrapper'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth()

  console.log({ userId })

  if (!userId) {
    redirect('/')
  }

  const user = await getUserById(userId)

  return (
    <UserProviderWrapper user={user}>
      <div className='min-h-screen bg-white flex flex-col'>
        <Navbar isSignedIn={!!userId} />

        {children}
      </div>
    </UserProviderWrapper>
  )
}

export default Layout
