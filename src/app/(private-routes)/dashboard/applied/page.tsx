'use client'

import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Eye,
  Filter,
  MapPin,
} from 'lucide-react'

import Container from '@/components/container/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Mock data for applied jobs
const mockAppliedJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full Time',
    salary: '$120,000 - $150,000',
    appliedDate: '2024-01-15',
    status: 'Under Review',
    logo: 'https://via.placeholder.com/40',
  },
  {
    id: '2',
    title: 'React Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Full Time',
    salary: '$90,000 - $110,000',
    appliedDate: '2024-01-10',
    status: 'Interview Scheduled',
    logo: 'https://via.placeholder.com/40',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$80,000 - $100,000',
    appliedDate: '2024-01-05',
    status: 'Rejected',
    logo: 'https://via.placeholder.com/40',
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    company: 'BigTech Company',
    location: 'Seattle, WA',
    type: 'Full Time',
    salary: '$130,000 - $160,000',
    appliedDate: '2024-01-20',
    status: 'Under Review',
    logo: 'https://via.placeholder.com/40',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Cloud Solutions',
    location: 'Austin, TX',
    type: 'Full Time',
    salary: '$110,000 - $140,000',
    appliedDate: '2024-01-18',
    status: 'Interview Scheduled',
    logo: 'https://via.placeholder.com/40',
  },
]

const AppliedJobsPage = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800'
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      case 'Accepted':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusCount = (status: string) => {
    return mockAppliedJobs.filter((job) => job.status === status).length
  }

  return (
    <Container>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Applied Jobs
          </h1>
          <p className='text-gray-600'>
            Track your job applications and their current status
          </p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <Card className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Total Applications
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {mockAppliedJobs.length}
                </p>
              </div>
              <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                <span className='text-blue-600 font-semibold text-sm'>T</span>
              </div>
            </div>
          </Card>

          <Card className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Under Review
                </p>
                <p className='text-2xl font-bold text-yellow-600'>
                  {getStatusCount('Under Review')}
                </p>
              </div>
              <div className='w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center'>
                <span className='text-yellow-600 font-semibold text-sm'>R</span>
              </div>
            </div>
          </Card>

          <Card className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Interviews</p>
                <p className='text-2xl font-bold text-blue-600'>
                  {getStatusCount('Interview Scheduled')}
                </p>
              </div>
              <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                <span className='text-blue-600 font-semibold text-sm'>I</span>
              </div>
            </div>
          </Card>

          <Card className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Rejected</p>
                <p className='text-2xl font-bold text-red-600'>
                  {getStatusCount('Rejected')}
                </p>
              </div>
              <div className='w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center'>
                <span className='text-red-600 font-semibold text-sm'>R</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-2'
            >
              <Filter className='h-4 w-4' />
              Filter
            </Button>
            <select className='border border-gray-300 rounded-md px-3 py-2 text-sm'>
              <option value=''>All Status</option>
              <option value='Under Review'>Under Review</option>
              <option value='Interview Scheduled'>Interview Scheduled</option>
              <option value='Rejected'>Rejected</option>
              <option value='Accepted'>Accepted</option>
            </select>
          </div>

          <div className='text-sm text-gray-500'>
            Showing {mockAppliedJobs.length} applications
          </div>
        </div>

        {/* Jobs List */}
        <div className='space-y-4'>
          {mockAppliedJobs.map((job) => (
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
                    <div className='flex items-center gap-2 mb-1'>
                      <h3 className='font-semibold text-gray-900 text-lg'>
                        {job.title}
                      </h3>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
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
                        Applied:{' '}
                        {new Date(job.appliedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex items-center gap-2'
                  >
                    <Eye className='h-4 w-4' />
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockAppliedJobs.length === 0 && (
          <Card className='p-12 text-center'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Briefcase className='h-8 w-8 text-gray-400' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No applications yet
            </h3>
            <p className='text-gray-500 mb-4'>
              Start applying to jobs to see them appear here
            </p>
            <Button>Browse Jobs</Button>
          </Card>
        )}
      </div>
    </Container>
  )
}

export default AppliedJobsPage
