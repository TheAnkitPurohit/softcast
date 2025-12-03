'use client'

import Link from 'next/link'
import { useState } from 'react'

import AppLogo from '@/components/app/AppLogo'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import authClient from '@/lib/auth-client'

const Navbar = () => {
  const { isPending } = authClient.useSession()

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

  return (
    <nav className='fixed top-0 w-full z-50 border-b border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md supports-[backdrop-filter]:bg-white/20 dark:supports-[backdrop-filter]:bg-black/20'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <Link href={'/'} className='flex items-center gap-2.5'>
          <AppLogo />
        </Link>

        <div className='flex items-center gap-4'>
          <ThemeToggle />

          <Button
            disabled={isPending || loading}
            onClick={handleSocialSignIn}
            className='bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6'
          >
            {loading ? 'Loading...' : 'Login '}
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
