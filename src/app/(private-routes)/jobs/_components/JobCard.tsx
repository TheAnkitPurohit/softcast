'use client'

import { Briefcase, Clock, MapPin } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Job } from '@/interface/Job.interface'

const JobCard = ({ job }: { job: Job }) => {
  const formatSalary = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return (
    <Card className='p-4 hover:shadow-md transition-shadow cursor-pointer'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <h3 className='font-semibold text-lg text-gray-900 mb-1'>
              {job.title}
            </h3>
          </div>
          <Badge variant='secondary' className='ml-2'>
            {job.type}
          </Badge>
        </div>

        <div className='flex flex-wrap gap-2 text-sm text-gray-600'>
          <div className='flex items-center gap-1'>
            <MapPin className='h-4 w-4' />
            <span>{job.location}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Briefcase className='h-4 w-4' />
            <span>{job.locationRequirements}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Clock className='h-4 w-4' />
            <span>Posted {formatDate(new Date(job.postedDate))}</span>
          </div>
        </div>

        <div className='flex items-center gap-1 text-green-600 font-medium'>
          <span>{formatSalary(job.minSalary, job.maxSalary)}</span>
        </div>

        <p className='text-gray-700 text-sm line-clamp-2'>{job.description}</p>

        <div className='flex flex-wrap gap-1'>
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant='outline' className='text-xs'>
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge variant='outline' className='text-xs'>
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}

export default JobCard
