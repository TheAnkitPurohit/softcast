'use client'

import React from 'react'

import { useUser } from '@/contexts/UserContext'

const UserInfo: React.FC = () => {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return <div className='text-sm text-gray-500'>Loading user data...</div>
  }

  if (!user) {
    return <div className='text-sm text-gray-500'>Not signed in</div>
  }

  return (
    <div className='p-4 bg-gray-50 rounded-lg'>
      <h3 className='font-semibold text-gray-900 mb-2'>User Information</h3>
      <div className='space-y-1 text-sm'>
        <p>
          <span className='font-medium'>Name:</span> {user.firstName}{' '}
          {user.lastName}
        </p>
        <p>
          <span className='font-medium'>Email:</span> {user.email}
        </p>
        <p>
          <span className='font-medium'>Status:</span>{' '}
          {user.isActive ? 'Active' : 'Inactive'}
        </p>
        {user.avatarUrl && (
          <p>
            <span className='font-medium'>Avatar:</span> {user.avatarUrl}
          </p>
        )}
      </div>
    </div>
  )
}

export default UserInfo
