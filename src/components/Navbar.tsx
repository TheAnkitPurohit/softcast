import { SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

interface NavbarProps {
  isSignedIn?: boolean
}

const Navbar = ({ isSignedIn }: NavbarProps) => {
  return (
    <header className='navbar'>
      <nav>
        <Link
          href={isSignedIn ? '/videos' : '/'}
          className='flex items-center gap-2.5'
        >
          <Image
            src='/assets/icons/logo.png'
            alt='SoftCast Logo'
            width={32}
            height={32}
          />
          <div className='flex flex-col leading-tight'>
            <h1 className='font-black text-blue-100 text-2xl'>SkyCast</h1>
            <span className='text-xs text-gray-100 font-medium'>
              by softcolon
            </span>
          </div>
        </Link>

        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton
            fallbackRedirectUrl={'/videos'}
            forceRedirectUrl={'/videos'}
          >
            <button className='px-6 py-2 rounded-4xl bg-primary text-white font-semibold text-base shadow-10 hover:opacity-90 transition-colors'>
              Sign In
            </button>
          </SignInButton>
        )}
      </nav>
    </header>
  )
}

export default Navbar
