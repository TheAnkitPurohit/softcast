import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'JobInsider - Find Your Dream Job',
  description:
    'Discover the best job opportunities with JobInsider. Browse thousands of jobs, filter by location, salary, and more.',
  keywords: 'jobs, career, employment, job search, hiring',
  authors: [{ name: 'JobInsider Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${inter.variable} antialiased bg-gray-50 font-sans min-h-screen`}
        >
          <main className='min-h-screen'>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
