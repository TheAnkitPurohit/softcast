import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

import Videos from '@/app/(routes)/videos/Videos'

const Page = async () => {
  const { userId } = await auth()

  if (!userId) {
    redirect('/')
  }

  return <Videos />
}

export default Page
