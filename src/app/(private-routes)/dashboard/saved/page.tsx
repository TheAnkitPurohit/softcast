'use client'

import {
  Bookmark,
  Calendar,
  Clock,
  DollarSign,
  Eye,
  Filter,
  MapPin,
  Search,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

import Container from '@/components/container/Container'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Mock data for saved jobs
const mockSavedJobs = [
  {
    id: '1',
    title: 'Full Stack Developer',
    company: 'BigTech Company',
    location: 'Seattle, WA',
    type: 'Full Time',
    salary: '$130,000 - $160,000',
    savedDate: '2024-01-20',
    logo: 'https://via.placeholder.com/40',
  },
  {
    id: '2',
    title: 'DevOps Engineer',
    company: 'Cloud Solutions',
    location: 'Austin, TX',
    type: 'Full Time',
    salary: '$110,000 - $140,000',
    savedDate: '2024-01-18',
    logo: 'https://via.placeholder.com/40',
  },
  {
    id: '3',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full Time',
    salary: '$120,000 - $150,000',
    savedDate: '2024-01-15',
    logo: 'https://via.placeholder.com/40',
  },
  {
    id: '4',
    title: 'React Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Full Time',
    salary: '$90,000 - $110,000',
    savedDate: '2024-01-12',
    logo: 'https://via.placeholder.com/40',
  },
  {
    id: '5',
    title: 'UI/UX Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$80,000 - $100,000',
    savedDate: '2024-01-10',
    logo: 'https://via.placeholder.com/40',
  },
]

const SavedJobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const filteredJobs = mockSavedJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === '' || job.type === selectedType
    const matchesLocation =
      selectedLocation === '' || job.location.includes(selectedLocation)

    return matchesSearch && matchesType && matchesLocation
  })

  const handleRemoveJob = (jobId: string) => {
    // In a real app, this would call an API to remove the job from saved list
    console.log('Remove job:', jobId)
  }

  const handleApplyNow = (jobId: string) => {
    // In a real app, this would navigate to the job application page
    console.log('Apply to job:', jobId)
  }

  return (
    <Container>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Saved Jobs</h1>
          <p className='text-gray-600'>
            Your collection of interesting job opportunities
          </p>
        </div>

        {/* Stats Card */}
        <div className='mb-8'>
          <Card className='p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <Bookmark className='h-6 w-6 text-blue-600' />
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    Total Saved Jobs
                  </p>
                  <p className='text-3xl font-bold text-gray-900'>
                    {mockSavedJobs.length}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-sm text-gray-600'>Last saved</p>
                <p className='text-sm font-medium text-gray-900'>
                  {new Date(
                    Math.max(
                      ...mockSavedJobs.map((job) =>
                        new Date(job.savedDate).getTime()
                      )
                    )
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className='mb-6 space-y-4'>
          {/* Search Bar */}
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            <Input
              type='text'
              placeholder='Search jobs by title or company...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>

          {/* Filters */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Job Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              >
                <option value=''>All Types</option>
                <option value='Full Time'>Full Time</option>
                <option value='Part Time'>Part Time</option>
                <option value='Contract'>Contract</option>
                <option value='Internship'>Internship</option>
              </select>
            </div>

            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
              >
                <option value=''>All Locations</option>
                <option value='San Francisco'>San Francisco</option>
                <option value='Seattle'>Seattle</option>
                <option value='New York'>New York</option>
                <option value='Austin'>Austin</option>
                <option value='Remote'>Remote</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className='flex items-center justify-between'>
            <div className='text-sm text-gray-500'>
              Showing {filteredJobs.length} of {mockSavedJobs.length} saved jobs
            </div>
            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-2'
            >
              <Filter className='h-4 w-4' />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Jobs List */}
        <div className='space-y-4'>
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className='p-6 hover:shadow-md transition-shadow'
            >
              <div className='flex items-start justify-between'>
                <div className='flex items-start gap-4 flex-1'>
                  <img
                    src={job.logo}
                    alt={job.company}
                    className='w-12 h-12 rounded-lg object-cover'
                  />
                  <div className='flex-1'>
                    <h3 className='font-semibold text-gray-900 text-lg mb-1'>
                      {job.title}
                    </h3>
                    <p className='text-gray-600 mb-2 font-medium'>
                      {job.company}
                    </p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500'>
                      <div className='flex items-center gap-1'>
                        <MapPin className='h-4 w-4' />
                        {job.location}
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-4 w-4' />
                        {job.type}
                      </div>
                      <div className='flex items-center gap-1'>
                        <DollarSign className='h-4 w-4' />
                        {job.salary}
                      </div>
                      <div className='flex items-center gap-1'>
                        <Calendar className='h-4 w-4' />
                        Saved: {new Date(job.savedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex items-center gap-2'
                    onClick={() => handleApplyNow(job.id)}
                  >
                    <Eye className='h-4 w-4' />
                    Apply Now
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-red-600 hover:text-red-700'
                    onClick={() => handleRemoveJob(job.id)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <Card className='p-12 text-center'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Bookmark className='h-8 w-8 text-gray-400' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              {searchTerm || selectedType || selectedLocation
                ? 'No jobs found'
                : 'No saved jobs yet'}
            </h3>
            <p className='text-gray-500 mb-4'>
              {searchTerm || selectedType || selectedLocation
                ? 'Try adjusting your search or filters'
                : "Start saving jobs you're interested in to see them here"}
            </p>
            <Button>Browse Jobs</Button>
          </Card>
        )}
      </div>
    </Container>
  )
}

export default SavedJobsPage
