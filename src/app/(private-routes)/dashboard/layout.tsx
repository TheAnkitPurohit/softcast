'use client'

import { Bookmark, Briefcase, Menu, User, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Mock data for navigation counts
const mockAppliedJobsCount = 3
const mockSavedJobsCount = 2

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login')
  //   }
  // }, [isAuthenticated, router])

  // if (!isAuthenticated || !user) {
  //   return null
  // }

  const navigation = [
    {
      name: 'Profile',
      href: '/dashboard',
      icon: User,
      count: null,
    },
    {
      name: 'Applied Jobs',
      href: '/dashboard/applied',
      icon: Briefcase,
      count: mockAppliedJobsCount,
    },
    {
      name: 'Saved Jobs',
      href: '/dashboard/saved',
      icon: Bookmark,
      count: mockSavedJobsCount,
    },
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Mobile Navigation Header */}
      <div className='md:hidden bg-white border-b border-gray-200 sticky top-0 z-40'>
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-3'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='p-2'
            >
              {isMobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
            <div>
              <h1 className='text-lg font-semibold text-gray-900'>Dashboard</h1>
              {/* <p className='text-sm text-gray-500'>Welcome back, {user.name}</p> */}
            </div>
          </div>
        </div>
      </div>

      <div className='flex'>
        {/* Desktop Sidebar */}
        <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
          <div className='flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto'>
            <div className='flex items-center flex-shrink-0 px-4 mb-6'>
              <h1 className='text-xl font-bold text-gray-900'>Dashboard</h1>
            </div>

            <div className='flex-grow flex flex-col'>
              <nav className='flex-1 px-2 space-y-1'>
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          isActive
                            ? 'text-blue-700'
                            : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.name}
                      {item.count !== null && (
                        <Badge variant='secondary' className='ml-auto text-xs'>
                          {item.count}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className='md:hidden fixed inset-0 z-50'>
            <div
              className='fixed inset-0 bg-gray-600 bg-opacity-75'
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className='fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white'>
              <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>Menu</h2>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className='h-5 w-5' />
                </Button>
              </div>

              <nav className='flex-1 px-2 py-4 space-y-1'>
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          isActive
                            ? 'text-blue-700'
                            : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.name}
                      {item.count !== null && (
                        <Badge variant='secondary' className='ml-auto text-xs'>
                          {item.count}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className='md:pl-64 flex-1'>
          <div className='py-6'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
