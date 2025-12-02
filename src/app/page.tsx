import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

import FAQ from '@/components/landing/FAQ'
import Features from '@/components/landing/Features'
import Footer from '@/components/landing/Footer'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import Navbar from '@/components/landing/Navbar'
import { auth } from '@/lib/auth'

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  })

  if (session) {
    redirect('/videos')
  }

  return (
    <main className='min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white selection:bg-purple-500/30'>
      <Navbar />

      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />

      <Footer />
    </main>
  )
}

export default Page
