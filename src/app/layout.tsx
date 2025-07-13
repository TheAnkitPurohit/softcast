import type { Metadata } from 'next'
import { Karla } from 'next/font/google'
import './globals.css'
import { satoshi } from '../fonts/font'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'

const geistKarla = Karla({
  variable: '--font-geist-karla',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SkyCast',
  description: 'A Screen Sharing App',
  icons: {
    icon: '/assets/icons/logo.png',
  },
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${geistKarla.variable} ${satoshi.variable} font-karla antialiased`}
        >
          {children}
          <Toaster position='top-center' />
        </body>
      </html>
    </ClerkProvider>
  )
}
