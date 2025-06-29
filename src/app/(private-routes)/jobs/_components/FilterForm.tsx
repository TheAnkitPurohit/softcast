'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  ExperienceLevel,
  JobLocationRequirements,
  JobType,
} from '@/interface/Job.interface'

export interface FilterState {
  search: string
  jobType: string[]
  locationRequirements: string[]
  experience: string[]
  minSalary: string
  maxSalary: string
  location: string
}

interface FilterFormProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onClearFilters: () => void
  showClearButton?: boolean
  showApplyButton?: boolean
  onApply?: () => void
  className?: string
}

const FilterForm = ({
  filters,
  onFilterChange,
  onClearFilters,
  showClearButton = false,
  showApplyButton = false,
  onApply,
  className = '',
}: FilterFormProps) => {
  const handleArrayFilterChange = (
    key: 'jobType' | 'locationRequirements' | 'experience',
    value: string,
    checked: boolean
  ) => {
    const newFilters = { ...filters }
    if (checked) {
      newFilters[key] = [...newFilters[key], value]
    } else {
      newFilters[key] = newFilters[key].filter((item) => item !== value)
    }
    onFilterChange(newFilters)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <Label className='text-sm font-medium text-gray-700 mb-2 block'>
          Search
        </Label>
        <Input
          placeholder='Job title, company, or keywords'
          value={filters.search}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          className='h-10'
        />
      </div>

      <div>
        <Label className='text-sm font-medium text-gray-700 mb-2 block'>
          Location
        </Label>
        <Input
          placeholder='City, state, or remote'
          value={filters.location}
          onChange={(e) =>
            onFilterChange({ ...filters, location: e.target.value })
          }
          className='h-10'
        />
      </div>

      <div>
        <Label className='text-sm font-medium text-gray-700 mb-2 block'>
          Job Type
        </Label>
        <div className='space-y-2'>
          {Object.values(JobType).map((type) => (
            <div key={type} className='flex items-center space-x-2'>
              <Checkbox
                id={`filter-jobType-${type}`}
                checked={filters.jobType.includes(type)}
                onCheckedChange={(checked) =>
                  handleArrayFilterChange('jobType', type, checked as boolean)
                }
              />
              <Label htmlFor={`filter-jobType-${type}`} className='text-sm'>
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className='text-sm font-medium text-gray-700 mb-2 block'>
          Work Mode
        </Label>
        <div className='space-y-2'>
          {Object.values(JobLocationRequirements).map((mode) => (
            <div key={mode} className='flex items-center space-x-2'>
              <Checkbox
                id={`filter-locationRequirements-${mode}`}
                checked={filters.locationRequirements.includes(mode)}
                onCheckedChange={(checked) =>
                  handleArrayFilterChange(
                    'locationRequirements',
                    mode,
                    checked as boolean
                  )
                }
              />
              <Label
                htmlFor={`filter-locationRequirements-${mode}`}
                className='text-sm'
              >
                {mode}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className='text-sm font-medium text-gray-700 mb-2 block'>
          Experience Level
        </Label>
        <div className='space-y-2'>
          {Object.values(ExperienceLevel).map((level) => (
            <div key={level} className='flex items-center space-x-2'>
              <Checkbox
                id={`filter-experience-${level}`}
                checked={filters.experience.includes(level)}
                onCheckedChange={(checked) =>
                  handleArrayFilterChange(
                    'experience',
                    level,
                    checked as boolean
                  )
                }
              />
              <Label htmlFor={`filter-experience-${level}`} className='text-sm'>
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className='text-sm font-medium text-gray-700 mb-2 block'>
          Salary Range
        </Label>
        <div className='space-y-3'>
          <Input
            placeholder='Min salary'
            type='number'
            value={filters.minSalary}
            onChange={(e) =>
              onFilterChange({ ...filters, minSalary: e.target.value })
            }
            className='h-10'
          />
          <Input
            placeholder='Max salary'
            type='number'
            value={filters.maxSalary}
            onChange={(e) =>
              onFilterChange({ ...filters, maxSalary: e.target.value })
            }
            className='h-10'
          />
        </div>
      </div>

      {(showClearButton || showApplyButton) && (
        <>
          <Separator />
          <div className='flex gap-2'>
            {showClearButton && (
              <Button
                onClick={onClearFilters}
                variant='outline'
                className='flex-1'
              >
                Clear All
              </Button>
            )}
            {showApplyButton && onApply && (
              <Button onClick={onApply} className='flex-1'>
                Apply Filters
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default FilterForm
