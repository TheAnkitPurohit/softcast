import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

import ProtectedNavbar from '@/components/header/ProtectedNavbar'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth()

  if (!userId) {
    redirect('/')
  }

  return (
    <>
      <ProtectedNavbar />

      <div className='my-10'>{children}</div>
    </>
  )
}

export default Layout
