'use client'

import { Briefcase, Filter } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

import FilterForm, {
  FilterState,
} from '@/app/(private-routes)/jobs/_components/FilterForm'
import FilterSidebar from '@/app/(private-routes)/jobs/_components/FilterSidebar'
import JobCard from '@/app/(private-routes)/jobs/_components/JobCard'
import Container from '@/components/container/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Job } from '@/interface/Job.interface'
import jobService, { JobFilters } from '@/services/job.service'

const List = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    jobType: [],
    locationRequirements: [],
    experience: [],
    minSalary: '',
    maxSalary: '',
    location: '',
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Initialize filters from URL params
  useEffect(() => {
    const search = searchParams.get('search') || ''
    const jobType =
      searchParams.get('jobType')?.split(',').filter(Boolean) || []
    const locationRequirements =
      searchParams.get('locationRequirements')?.split(',').filter(Boolean) || []
    const experience =
      searchParams.get('experience')?.split(',').filter(Boolean) || []
    const minSalary = searchParams.get('minSalary') || ''
    const maxSalary = searchParams.get('maxSalary') || ''
    const location = searchParams.get('location') || ''

    setFilters({
      search,
      jobType,
      locationRequirements,
      experience,
      minSalary,
      maxSalary,
      location,
    })
  }, [searchParams])

  // Convert frontend filters to backend filters
  const convertToBackendFilters = useCallback(
    (frontendFilters: FilterState, page: number = 1): JobFilters => {
      const backendFilters: JobFilters = {
        page,
        limit: 10,
      }

      if (frontendFilters.search) backendFilters.search = frontendFilters.search
      if (frontendFilters.location)
        backendFilters.location = frontendFilters.location
      if (frontendFilters.jobType.length > 0)
        backendFilters.type = frontendFilters.jobType.join(',')
      if (frontendFilters.locationRequirements.length > 0)
        backendFilters.workMode = frontendFilters.locationRequirements.join(',')
      if (frontendFilters.experience.length > 0)
        backendFilters.experience = frontendFilters.experience.join(',')
      if (frontendFilters.minSalary)
        backendFilters.minSalary = parseInt(frontendFilters.minSalary)
      if (frontendFilters.maxSalary)
        backendFilters.maxSalary = parseInt(frontendFilters.maxSalary)

      return backendFilters
    },
    []
  )

  // Fetch jobs from backend
  const fetchJobs = useCallback(
    async (page: number = 1, resetJobs: boolean = false) => {
      if (resetJobs) {
        setIsInitialLoading(true)
      } else {
        setIsLoading(true)
      }

      try {
        const backendFilters = convertToBackendFilters(filters, page)
        const response = await jobService.getJobs(backendFilters)

        if (response.success && response.data) {
          const paginatedJobs = response.data.jobs
          const newJobs = paginatedJobs.docs || []

          if (resetJobs) {
            setJobs(newJobs)
          } else {
            setJobs((prev) => [...prev, ...newJobs])
          }

          // Check if there are more jobs
          setHasMore(paginatedJobs.hasNextPage)
          setCurrentPage(page)
        }
      } catch (error) {
        console.error('Error fetching jobs:', error)
        // Fallback to empty array on error
        if (resetJobs) {
          setJobs([])
        }
      } finally {
        setIsInitialLoading(false)
        setIsLoading(false)
      }
    },
    [filters, convertToBackendFilters]
  )

  // Load initial data
  useEffect(() => {
    fetchJobs(1, true)
  }, [fetchJobs])

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams(searchParams.toString())

      // Clear existing filter params
      params.delete('search')
      params.delete('jobType')
      params.delete('locationRequirements')
      params.delete('experience')
      params.delete('minSalary')
      params.delete('maxSalary')
      params.delete('location')

      // Add new filter params
      if (newFilters.search) params.set('search', newFilters.search)
      if (newFilters.jobType.length > 0)
        params.set('jobType', newFilters.jobType.join(','))
      if (newFilters.locationRequirements.length > 0)
        params.set(
          'locationRequirements',
          newFilters.locationRequirements.join(',')
        )
      if (newFilters.experience.length > 0)
        params.set('experience', newFilters.experience.join(','))
      if (newFilters.minSalary) params.set('minSalary', newFilters.minSalary)
      if (newFilters.maxSalary) params.set('maxSalary', newFilters.maxSalary)
      if (newFilters.location) params.set('location', newFilters.location)

      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  // Handle filter changes with URL update and API call
  const handleFilterChange = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters)
      updateURL(newFilters)
      // Reset to page 1 and fetch new data
      fetchJobs(1, true)
    },
    [updateURL, fetchJobs]
  )

  const loadMoreJobs = useCallback(async () => {
    if (!isLoading && hasMore) {
      await fetchJobs(currentPage + 1, false)
    }
  }, [isLoading, hasMore, currentPage, fetchJobs])

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (
      key === 'jobType' ||
      key === 'locationRequirements' ||
      key === 'experience'
    ) {
      return Array.isArray(value) && value.length > 0
    }
    return value !== ''
  }).length

  return (
    <Container>
      <div className='w-full flex gap-8 '>
        {/* Desktop Filters */}
        <div className='hidden lg:block w-80 flex-shrink-0'>
          <div className='bg-white rounded-xl border border-gray-200 p-6 sticky top-20 shadow-sm'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold text-gray-900'>Filters</h2>
              {activeFiltersCount > 0 && (
                <Button
                  onClick={() =>
                    handleFilterChange({
                      search: '',
                      jobType: [],
                      locationRequirements: [],
                      experience: [],
                      minSalary: '',
                      maxSalary: '',
                      location: '',
                    })
                  }
                  variant='ghost'
                  size='sm'
                  className='text-blue-600 hover:text-blue-700'
                >
                  Clear all
                </Button>
              )}
            </div>

            <FilterForm
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={() =>
                handleFilterChange({
                  search: '',
                  jobType: [],
                  locationRequirements: [],
                  experience: [],
                  minSalary: '',
                  maxSalary: '',
                  location: '',
                })
              }
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className='flex-1'>
          {/* Mobile Search and Filter */}
          <div className='lg:hidden mb-6 space-y-4'>
            <div className='flex gap-2'>
              <Input
                placeholder='Search jobs...'
                value={filters.search}
                onChange={(e) =>
                  handleFilterChange({ ...filters, search: e.target.value })
                }
                className='flex-1'
              />
              <Button
                onClick={() => setIsFilterOpen(true)}
                variant='outline'
                size='icon'
                className='relative'
              >
                <Filter className='h-4 w-4' />
                {activeFiltersCount > 0 && (
                  <Badge
                    variant='secondary'
                    className='absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center'
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {isInitialLoading ? (
            <div className='text-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4'></div>
              <p className='text-gray-600'>Loading jobs...</p>
            </div>
          ) : (
            <>
              <div className='w-full flex flex-col gap-4'>
                {jobs.map((job) => (
                  <Link key={job._id} href={`/jobs/${job._id}`}>
                    <JobCard job={job} />
                  </Link>
                ))}
              </div>

              {jobs.length === 0 && (
                <div className='text-center py-12'>
                  <Briefcase className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                  <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    No jobs found
                  </h3>
                  <p className='text-gray-600'>
                    Try adjusting your search criteria or filters.
                  </p>
                </div>
              )}

              {hasMore && jobs.length > 0 && (
                <div className='text-center py-8'>
                  <Button
                    onClick={loadMoreJobs}
                    disabled={isLoading}
                    variant='outline'
                    className='px-8'
                  >
                    {isLoading ? 'Loading...' : 'Load More Jobs'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <FilterSidebar
        filters={filters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange}
        onClearFilters={() =>
          handleFilterChange({
            search: '',
            jobType: [],
            locationRequirements: [],
            experience: [],
            minSalary: '',
            maxSalary: '',
            location: '',
          })
        }
      />
    </Container>
  )
}

export default List
