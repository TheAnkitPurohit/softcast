'use client'

import Image from 'next/image'
import Link from 'next/link'
import { redirect, RedirectType } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import authClient from '@/lib/auth-client'

interface NavbarProps {
  isSignedIn?: boolean
}

const Navbar = ({ isSignedIn }: NavbarProps) => {
  const { data, isPending } = authClient.useSession()

  const { user } = data || {}

  const [loading, setLoading] = useState(false)

  async function handleSocialSignIn() {
    setLoading(true)

    const { error } = await authClient.signIn.social(
      {
        provider: 'google',
      },
      {
        onSuccess(context) {
          console.log('Sign-in successful!', context)
        },
        onError(err) {
          console.error('Sign-in error:', err)
        },
      }
    )

    setLoading(false)
  }

  const handleSignout = async () => {
    await authClient.signOut({})
    redirect('/', RedirectType.replace)
  }

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

        {user ? (
          <Button
            disabled={isPending}
            onClick={handleSignout}
            className='px-6 py-2 rounded-4xl bg-primary text-white font-semibold text-base shadow-10 hover:opacity-90 transition-colors'
          >
            Signout
          </Button>
        ) : (
          <Button
            disabled={isPending}
            onClick={handleSocialSignIn}
            className='px-6 py-2 rounded-4xl bg-primary text-white font-semibold text-base shadow-10 hover:opacity-90 transition-colors'
          >
            Sign In
          </Button>
        )}
      </nav>
    </header>
  )
}

export default Navbar
