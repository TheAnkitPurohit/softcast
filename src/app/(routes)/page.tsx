'use client'

import { SignedIn, SignedOut } from '@clerk/nextjs'

import PublicPage from '@/app/(routes)/PublicPage'
import Videos from '@/app/(routes)/Videos'

const Page = () => {
  return (
    <>
      <SignedIn>
        <Videos />
      </SignedIn>

      <SignedOut>
        <PublicPage />
      </SignedOut>
    </>
  )
}

export default Page
