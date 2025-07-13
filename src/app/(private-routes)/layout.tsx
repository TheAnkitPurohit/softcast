import React from 'react'

import Navbar from '@/components/Navbar'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <Navbar isSignedIn />

      {children}
    </div>
  )
}

export default Layout
