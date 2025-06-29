import {
  ExperienceLevel,
  JobLocationRequirements,
  JobStatus,
  JobType,
} from '@/interface/Job.interface'

export const jobTypes: {
  label: string
  value: (typeof JobType)[keyof typeof JobType]
}[] = [
  { label: 'Full Time', value: JobType.FULL_TIME },
  { label: 'Part Time', value: JobType.PART_TIME },
  { label: 'Contract', value: JobType.CONTRACT },
  { label: 'Internship', value: JobType.INTERNSHIP },
  { label: 'Freelance', value: JobType.FREELANCE },
  { label: 'Temporary', value: JobType.TEMPORARY },
]

export const jobLocationRequirements: {
  label: string
  value: (typeof JobLocationRequirements)[keyof typeof JobLocationRequirements]
}[] = [
  { label: 'In-Office', value: JobLocationRequirements.IN_OFFICE },
  { label: 'Hybrid', value: JobLocationRequirements.HYBRID },
  { label: 'Remote', value: JobLocationRequirements.REMOTE },
]

export const experienceLevels: {
  label: string
  value: (typeof ExperienceLevel)[keyof typeof ExperienceLevel]
}[] = [
  { label: 'Junior', value: ExperienceLevel.JUNIOR },
  { label: 'Mid-Level', value: ExperienceLevel.MID_LEVEL },
  { label: 'Senior', value: ExperienceLevel.SENIOR },
]

export const jobStatuses: {
  label: string
  value: (typeof JobStatus)[keyof typeof JobStatus]
}[] = [
  { label: 'Active', value: JobStatus.ACTIVE },
  { label: 'Inactive', value: JobStatus.INACTIVE },
]
