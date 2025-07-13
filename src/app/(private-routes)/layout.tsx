import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { Toaster } from 'react-hot-toast'

import Navbar from '@/components/Navbar'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth()

  if (!userId) {
    redirect('/')
  }

  return (
    <>
      <Navbar />

      <div className='my-10'>{children}</div>

      <Toaster position='top-center' />
    </>
  )
}

export default Layout
