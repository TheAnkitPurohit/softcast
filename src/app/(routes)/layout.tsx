import React from 'react'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <Navbar />

      {children}

      <Footer />
    </div>
  )
}

export default Layout
