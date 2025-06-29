import { PaginatedList } from '@/interface/axios.interface'

export const JobType = {
  FULL_TIME: 'Full Time',
  PART_TIME: 'Part Time',
  CONTRACT: 'Contract',
  INTERNSHIP: 'Internship',
  FREELANCE: 'Freelance',
  TEMPORARY: 'Temporary',
} as const

export type JobType = (typeof JobType)[keyof typeof JobType]

export const JobLocationRequirements = {
  IN_OFFICE: 'In-Office',
  HYBRID: 'Hybrid',
  REMOTE: 'Remote',
} as const

export type JobLocationRequirements =
  (typeof JobLocationRequirements)[keyof typeof JobLocationRequirements]

export const ExperienceLevel = {
  JUNIOR: 'Junior',
  MID_LEVEL: 'Mid-Level',
  SENIOR: 'Senior',
} as const

export type ExperienceLevel =
  (typeof ExperienceLevel)[keyof typeof ExperienceLevel]

export const JobStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]

export interface JobCreate {
  title: string
  company: string
  type: (typeof JobType)[keyof typeof JobType]
  location: string
  locationRequirements: (typeof JobLocationRequirements)[keyof typeof JobLocationRequirements]
  minSalary: number
  maxSalary: number
  description: string
  experience: (typeof ExperienceLevel)[keyof typeof ExperienceLevel]
  education: string
  postedDate: Date
  deadline: Date
  status: (typeof JobStatus)[keyof typeof JobStatus]
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  skills: string[]
}

export interface Job extends JobCreate {
  _id: string
  createdAt: string
  updatedAt: string
}

export interface JobsResponse {
  jobs: PaginatedList<Job>
}

export interface JobResponse {
  job: Job
}
