'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'

const Navbar = () => {
  return (
    <header className='navbar'>
      <nav>
        <div className='flex items-center gap-2.5'>
          <Image
            src='/assets/icons/logo.svg'
            alt='SoftCast Logo'
            width={32}
            height={32}
          />
          <div className='flex flex-col leading-tight'>
            <h1 className='font-black text-blue-100 text-xl'>Screencast</h1>
            <span className='text-xs text-gray-100 font-medium'>
              by softcolon
            </span>
          </div>
        </div>

        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className='px-6 py-2 rounded-4xl bg-primary text-white font-semibold text-base shadow-10 hover:opacity-90 transition-colors'>
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  )
}

export default Navbar
