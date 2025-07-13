'use client'

import React, { createContext, ReactNode, useContext } from 'react'

import { User } from '@/types/user'

interface UserContextType {
  user: User | null
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
  user: User | null
  isLoading?: boolean
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  user,
  isLoading = false,
}) => {
  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
