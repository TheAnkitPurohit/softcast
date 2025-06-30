'use client'

import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  MapPin,
  Users,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import Container from '@/components/container/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Job } from '@/interface/Job.interface'

interface JobDetailProps {
  job: Job
}

const JobDetail = ({ job }: JobDetailProps) => {
  const router = useRouter()

  const formatSalary = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  return (
    <Container>
      <div className='w-full flex flex-col gap-4'>
        {/* Back Button */}
        <div className=''>
          <Button
            variant='ghost'
            onClick={() => router.push('/jobs')}
            className='flex items-center gap-2 text-gray-600 hover:text-gray-900'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Jobs
          </Button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Job Header */}
            <Card className='p-8'>
              <div className='flex items-start justify-between mb-6'>
                <div className='flex-1'>
                  <h1 className='text-4xl font-bold text-gray-900 mb-3'>
                    {job.title}
                  </h1>
                  <div className='flex items-center gap-6 text-gray-600 mb-6'>
                    <div className='flex items-center gap-2'>
                      <MapPin className='h-5 w-5' />
                      <span className='text-lg'>{job.location}</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-6 text-sm text-gray-500'>
                    <div className='flex items-center gap-2'>
                      <Clock className='h-4 w-4' />
                      <span>Posted {getTimeAgo(new Date(job.postedDate))}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4' />
                      <span>
                        Deadline: {formatDate(new Date(job.deadline))}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant='secondary' className='text-sm px-3 py-1'>
                  {job.type}
                </Badge>
              </div>

              <div className='flex items-center gap-2 text-green-600 font-bold text-2xl mb-6'>
                <span>{formatSalary(job.minSalary, job.maxSalary)}</span>
              </div>

              <div className='flex flex-wrap gap-3'>
                <Badge
                  variant='outline'
                  className='flex items-center gap-2 px-3 py-1'
                >
                  <Briefcase className='h-4 w-4' />
                  {job.locationRequirements}
                </Badge>
                <Badge
                  variant='outline'
                  className='flex items-center gap-2 px-3 py-1'
                >
                  <Users className='h-4 w-4' />
                  {job.experience}
                </Badge>
                <Badge
                  variant='outline'
                  className='flex items-center gap-2 px-3 py-1'
                >
                  <GraduationCap className='h-4 w-4' />
                  {job.education}
                </Badge>
              </div>
            </Card>

            {/* Job Description */}
            <Card className='p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Job Description
              </h2>
              <p className='text-gray-700 leading-relaxed text-lg'>
                {job.description}
              </p>
            </Card>

            {/* Requirements */}
            <Card className='p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Requirements
              </h2>
              <ul className='space-y-4'>
                {job.requirements.map((requirement) => (
                  <li key={requirement} className='flex items-start gap-3'>
                    <CheckCircle className='h-6 w-6 text-green-500 mt-0.5 flex-shrink-0' />
                    <span className='text-gray-700 text-lg'>{requirement}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Responsibilities */}
            <Card className='p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Responsibilities
              </h2>
              <ul className='space-y-4'>
                {job.responsibilities.map((responsibility) => (
                  <li key={responsibility} className='flex items-start gap-3'>
                    <CheckCircle className='h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0' />
                    <span className='text-gray-700 text-lg'>
                      {responsibility}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Benefits */}
            <Card className='p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Benefits
              </h2>
              <ul className='space-y-4'>
                {job.benefits.map((benefit) => (
                  <li key={benefit} className='flex items-start gap-3'>
                    <CheckCircle className='h-6 w-6 text-purple-500 mt-0.5 flex-shrink-0' />
                    <span className='text-gray-700 text-lg'>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Skills */}
            <Card className='p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Required Skills
              </h2>
              <div className='flex flex-wrap gap-3'>
                {job.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant='secondary'
                    className='px-4 py-2 text-base'
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Apply Button */}
            <Card className='p-6'>
              <Button className='w-full py-3 text-lg font-semibold'>
                Apply for this position
              </Button>
              <p className='text-sm text-gray-600 mt-3 text-center'>
                Applications close on {formatDate(new Date(job.deadline))}
              </p>
            </Card>

            {/* Job Summary */}
            <Card className='p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Job Summary
              </h3>
              <div className='space-y-3 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Job Type:</span>
                  <span className='font-medium'>{job.type}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Experience:</span>
                  <span className='font-medium'>{job.experience}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Work Mode:</span>
                  <span className='font-medium'>
                    {job.locationRequirements}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Salary Range:</span>
                  <span className='font-medium'>
                    {formatSalary(job.minSalary, job.maxSalary)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default JobDetail
