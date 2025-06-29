'use client'

import { SignedOut, SignInButton } from '@clerk/nextjs'
import { Briefcase } from 'lucide-react'
import Link from 'next/link'

import Container from '@/components/container/Container'
import { Button } from '@/components/ui/button'

const PublicNavbar = () => {
  return (
    <nav className='w-full py-4 bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50'>
      <Container>
        <div className='w-full flex items-center justify-between'>
          {/* Logo */}
          <div className='flex justify-start'>
            <Link href='/' className='flex items-center gap-2'>
              <Briefcase className='h-8 w-8 text-blue-600' />
              <span className='text-zinc-900 text-2xl font-bold leading-10'>
                JobInsider
              </span>
            </Link>
          </div>

          <div className='flex items-center gap-2'>
            <SignedOut>
              <SignInButton>
                <Button className='bg-[#6c47ff] active:bg-[#6c47ff] hover:bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base  px-4 sm:px-5 cursor-pointer'>
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <Link href='/contact'>
              <Button className='text-white rounded-full font-medium text-sm sm:text-base  px-4 sm:px-5 cursor-pointer'>
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default PublicNavbar
