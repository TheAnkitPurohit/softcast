'use client'

import { SignedIn, UserButton } from '@clerk/nextjs'
import { Briefcase, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Container from '@/components/container/Container'

const ProtectedNavbar = () => {
  const router = useRouter()

  return (
    <nav className='w-full py-4 bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50'>
      <Container>
        <div className='w-full flex items-center justify-between'>
          {/* Logo */}
          <div className='flex justify-start'>
            <Link href='/jobs' className='flex items-center gap-2'>
              <Briefcase className='h-8 w-8 text-blue-600' />
              <span className='text-zinc-900 text-2xl font-bold leading-10'>
                JobInsider
              </span>
            </Link>
          </div>

          <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label='Dashboard'
                  labelIcon={<User className='h-4 w-4' />}
                  onClick={() => router.push('/dashboard')}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </Container>
    </nav>
  )
}

export default ProtectedNavbar
