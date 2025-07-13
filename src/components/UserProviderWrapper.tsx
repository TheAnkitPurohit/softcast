'use client'

import React from 'react'

import { UserProvider } from '@/contexts/UserContext'
import { User } from '@/types/user'

interface UserProviderWrapperProps {
  children: React.ReactNode
  user: User | null
}

const UserProviderWrapper: React.FC<UserProviderWrapperProps> = ({
  children,
  user,
}) => {
  return <UserProvider user={user}>{children}</UserProvider>
}

export default UserProviderWrapper
