import { headers } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import React from 'react'

import Videos from '@/app/(routes)/videos/Videos'
import { auth } from '@/lib/auth'

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  })

  if (!session) {
    redirect('/', RedirectType.replace)
  }

  return <Videos />
}

export default Page
