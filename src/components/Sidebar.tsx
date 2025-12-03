'use client'

import { History, Menu, Settings, Video, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import AppLogo from '@/components/app/AppLogo'
import { ThemeToggle } from '@/components/ThemeToggle'

interface NavLink {
  name: string
  href: string
  icon: React.ReactNode
}

const navLinks: NavLink[] = [
  {
    name: 'Videos',
    href: '/videos',
    icon: <Video className='w-5 h-5' />,
  },
  {
    name: 'History',
    href: '/history',
    icon: <History className='w-5 h-5' />,
  },
  {
    name: 'Profile Settings',
    href: '/settings',
    icon: <Settings className='w-5 h-5' />,
  },
]

const Sidebar = () => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className='lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10'
      >
        {isMobileMenuOpen ? (
          <X className='w-6 h-6 text-zinc-900 dark:text-white' />
        ) : (
          <Menu className='w-6 h-6 text-zinc-900 dark:text-white' />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 min-h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-white/10 flex flex-col transition-transform duration-300 ${
          isMobileMenuOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className='p-6 border-b border-zinc-200 dark:border-white/10'>
          <Link href='/videos' className='flex items-center gap-2.5'>
            <AppLogo />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className='flex-1 p-4'>
          <ul className='space-y-2'>
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-600 text-white'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {link.icon}
                    <span className='font-medium'>{link.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Theme Toggle Footer */}
        <div className='p-4 border-t border-zinc-200 dark:border-white/10'>
          <div className='flex items-center justify-between px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800'>
            <span className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
              Theme
            </span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black/50 z-30'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
