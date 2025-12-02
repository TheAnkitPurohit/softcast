'use client'

import * as React from 'react'
import { Toaster } from 'react-hot-toast'

import { ThemeProvider } from '@/providers/theme-provider'

export function Provider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider>
      {children}
      <Toaster position='top-center' />
    </ThemeProvider>
  )
}
