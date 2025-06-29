import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

import PublicNavbar from '@/components/header/PublicNavbar'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth()

  if (userId) {
    redirect('/jobs')
  }

  return (
    <>
      <PublicNavbar />

      {children}
    </>
  )
}

export default Layout
