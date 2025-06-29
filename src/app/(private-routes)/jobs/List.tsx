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
import {
  ExperienceLevel,
  Job,
  JobLocationRequirements,
  JobType,
} from '@/interface/Job.interface'

// Mock data for demonstration
const mockJobs: Job[] = [
  {
    _id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    type: JobType.FULL_TIME,
    location: 'San Francisco, CA',
    locationRequirements: JobLocationRequirements.HYBRID,
    minSalary: 120000,
    maxSalary: 180000,
    description:
      'We are looking for a senior frontend developer to join our team...',
    experience: ExperienceLevel.SENIOR,
    education: "Bachelor's degree in Computer Science or related field",
    postedDate: new Date('2024-01-15'),
    deadline: new Date('2024-02-15'),
    status: 'active',
    requirements: ['React', 'TypeScript', '5+ years experience'],
    responsibilities: ['Lead frontend development', 'Mentor junior developers'],
    benefits: ['Health insurance', '401k', 'Remote work'],
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    _id: '2',
    title: 'UX/UI Designer',
    company: 'DesignStudio',
    type: JobType.CONTRACT,
    location: 'New York, NY',
    locationRequirements: JobLocationRequirements.REMOTE,
    minSalary: 80000,
    maxSalary: 120000,
    description: 'Join our creative team as a UX/UI designer...',
    experience: ExperienceLevel.MID_LEVEL,
    education: 'Design degree or equivalent experience',
    postedDate: new Date('2024-01-10'),
    deadline: new Date('2024-02-10'),
    status: 'active',
    requirements: ['Figma', 'Adobe Creative Suite', '3+ years experience'],
    responsibilities: ['Design user interfaces', 'Conduct user research'],
    benefits: ['Flexible hours', 'Creative environment'],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    _id: '3',
    title: 'Backend Engineer',
    company: 'DataFlow',
    type: JobType.FULL_TIME,
    location: 'Austin, TX',
    locationRequirements: JobLocationRequirements.IN_OFFICE,
    minSalary: 100000,
    maxSalary: 150000,
    description: 'Build scalable backend systems...',
    experience: ExperienceLevel.SENIOR,
    education: 'Computer Science degree',
    postedDate: new Date('2024-01-12'),
    deadline: new Date('2024-02-12'),
    status: 'active',
    requirements: ['Node.js', 'Python', 'Database design'],
    responsibilities: ['API development', 'Database optimization'],
    benefits: ['Competitive salary', 'Stock options'],
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
  {
    _id: '4',
    title: 'Product Manager',
    company: 'InnovateTech',
    type: JobType.FULL_TIME,
    location: 'Seattle, WA',
    locationRequirements: JobLocationRequirements.HYBRID,
    minSalary: 130000,
    maxSalary: 200000,
    description: 'Lead product strategy and development...',
    experience: ExperienceLevel.SENIOR,
    education: 'Business or technical degree',
    postedDate: new Date('2024-01-08'),
    deadline: new Date('2024-02-08'),
    status: 'active',
    requirements: [
      'Product management',
      'Agile methodology',
      '5+ years experience',
    ],
    responsibilities: ['Product roadmap', 'Stakeholder management'],
    benefits: ['Health benefits', 'Annual bonus'],
    skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership'],
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
  },
  {
    _id: '5',
    title: 'DevOps Engineer',
    company: 'CloudScale',
    type: JobType.CONTRACT,
    location: 'Denver, CO',
    locationRequirements: JobLocationRequirements.REMOTE,
    minSalary: 90000,
    maxSalary: 140000,
    description: 'Manage cloud infrastructure and CI/CD pipelines...',
    experience: ExperienceLevel.MID_LEVEL,
    education: 'Computer Science or related field',
    postedDate: new Date('2024-01-14'),
    deadline: new Date('2024-02-14'),
    status: 'active',
    requirements: ['AWS', 'Docker', 'Kubernetes'],
    responsibilities: ['Infrastructure management', 'Deployment automation'],
    benefits: ['Remote work', 'Learning budget'],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
    createdAt: '2024-01-14T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
  },
]

const List = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
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
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

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

  // Load initial data
  useEffect(() => {
    setJobs(mockJobs)
  }, [])

  // Filter jobs based on current filters
  useEffect(() => {
    let filtered = [...jobs]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.skills.some((skill) => skill.toLowerCase().includes(searchLower))
      )
    }

    if (filters.jobType.length > 0) {
      filtered = filtered.filter((job) => filters.jobType.includes(job.type))
    }

    if (filters.locationRequirements.length > 0) {
      filtered = filtered.filter((job) =>
        filters.locationRequirements.includes(job.locationRequirements)
      )
    }

    if (filters.experience.length > 0) {
      filtered = filtered.filter((job) =>
        filters.experience.includes(job.experience)
      )
    }

    if (filters.location) {
      const locationLower = filters.location.toLowerCase()
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(locationLower)
      )
    }

    if (filters.minSalary) {
      filtered = filtered.filter(
        (job) => job.minSalary >= parseInt(filters.minSalary)
      )
    }

    if (filters.maxSalary) {
      filtered = filtered.filter(
        (job) => job.maxSalary <= parseInt(filters.maxSalary)
      )
    }

    setFilteredJobs(filtered)
  }, [jobs, filters])

  const loadMoreJobs = useCallback(async () => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would fetch more jobs from the API
    // For now, we'll just duplicate the existing jobs to simulate infinite scroll
    setJobs((prev) => {
      const newJobs = mockJobs.map((job) => ({
        ...job,
        _id: `${job._id}-${Date.now()}`,
        title: `${job.title} (Copy)`,
      }))
      // Stop loading more after 5 pages for demo
      if (prev.length > 25) {
        setHasMore(false)
        setIsLoading(false)
        return prev
      }
      setIsLoading(false)
      return [...prev, ...newJobs]
    })
  }, [])

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

  // Handle filter changes with URL update
  const handleFilterChange = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters)
      updateURL(newFilters)
    },
    [updateURL]
  )

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

          <div className='w-full flex flex-col gap-4'>
            {filteredJobs.map((job) => (
              <Link key={job._id} href={`/jobs/${job._id}`}>
                <JobCard job={job} />
              </Link>
            ))}
          </div>

          {filteredJobs.length === 0 && (
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

          {hasMore && filteredJobs.length > 0 && (
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
