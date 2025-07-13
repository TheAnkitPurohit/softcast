import { auth } from '@clerk/nextjs/server'
import React from 'react'

import { getUserById } from '@/app/actions'
import Navbar from '@/components/Navbar'
import UserProviderWrapper from '@/components/UserProviderWrapper'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth()

  // Fetch user data if userId exists
  const user = userId ? await getUserById(userId) : null

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
