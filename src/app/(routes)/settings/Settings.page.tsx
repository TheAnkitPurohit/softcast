'use client'

import { redirect } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import authClient from '@/lib/auth-client'

const SettingsPage = () => {
  const { data, isPending } = authClient.useSession()

  const { user } = data || {}

  const [loading, setLoading] = useState(false)
  const handleSignout = async () => {
    setLoading(true)
    await authClient.signOut({})
    setLoading(false)
    redirect('/')
  }

  return (
    <div>
      Settings
      <Button
        disabled={isPending || loading}
        onClick={handleSignout}
        className='bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6'
      >
        Signout
      </Button>
    </div>
  )
}

export default SettingsPage
