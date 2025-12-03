'use client'
import { ChevronDown, Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import DropdownList from '@/components/DropdownList'
import ImageWithFallback from '@/components/ImageWithFallback'
import RecordScreen from '@/components/RecordScreen'
import { filterOptions } from '@/constants'
import { updateURLParams } from '@/lib/screenRecordingUtils'

const SharedHeader = ({ subHeader, title, userImg }: SharedHeaderProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('query') || ''
  )
  const [selectedFilter, setSelectedFilter] = useState(
    searchParams.get('filter') || 'Most Recent'
  )

  useEffect(() => {
    setSearchQuery(searchParams.get('query') || '')
    setSelectedFilter(searchParams.get('filter') || 'Most Recent')
  }, [searchParams])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery !== searchParams.get('query')) {
        const url = updateURLParams(
          searchParams,
          { query: searchQuery || null },
          pathname
        )
        router.push(url)
      }
    }, 500)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, searchParams, pathname, router])

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
    const url = updateURLParams(
      searchParams,
      { filter: filter || null },
      pathname
    )
    router.push(url)
  }

  const renderFilterTrigger = () => (
    <div className='flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer'>
      <span className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
        {selectedFilter}
      </span>
      <ChevronDown className='w-4 h-4 text-zinc-500 dark:text-zinc-400' />
    </div>
  )

  return (
    <header className='flex flex-col gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800'>
      {/* Top Section */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        {/* Title Section */}
        <div className='flex items-center gap-4'>
          {userImg && (
            <ImageWithFallback
              src={userImg}
              alt='user'
              width={56}
              height={56}
              className='rounded-full'
            />
          )}
          <div className='flex flex-col'>
            <p className='text-sm text-zinc-500 dark:text-zinc-400'>
              {subHeader}
            </p>
            <h1 className='text-2xl font-bold text-zinc-900 dark:text-white'>
              {title}
            </h1>
          </div>
        </div>

        {/* Actions */}
        <div className='flex items-center gap-3'>
          <RecordScreen />
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className='flex flex-col sm:flex-row gap-3'>
        {/* Search Bar */}
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400' />
          <input
            type='text'
            placeholder='Search for videos, tags, folders...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
          />
        </div>

        {/* Filter Dropdown */}
        <DropdownList
          options={filterOptions}
          selectedOption={selectedFilter}
          onOptionSelect={handleFilterChange}
          triggerElement={renderFilterTrigger()}
        />
      </div>
    </header>
  )
}

export default SharedHeader
