'use client'

import {
  ArrowLeft,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Globe,
  GraduationCap,
  MapPin,
  Users,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import Container from '@/components/container/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ExperienceLevel,
  Job,
  JobLocationRequirements,
  JobType,
} from '@/interface/Job.interface'

// Mock data for demonstration (same as in List.tsx)
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
      'We are looking for a senior frontend developer to join our team and help build the next generation of web applications. You will be responsible for leading frontend development initiatives, mentoring junior developers, and collaborating with cross-functional teams to deliver high-quality user experiences.',
    experience: ExperienceLevel.SENIOR,
    education: "Bachelor's degree in Computer Science or related field",
    postedDate: new Date('2024-01-15'),
    deadline: new Date('2024-02-15'),
    status: 'active',
    requirements: [
      '5+ years of experience in frontend development',
      'Strong proficiency in React, TypeScript, and modern JavaScript',
      'Experience with state management libraries (Redux, Zustand)',
      'Knowledge of CSS preprocessors and responsive design',
      'Experience with testing frameworks (Jest, React Testing Library)',
      'Understanding of web accessibility standards',
      'Experience with build tools and bundlers (Webpack, Vite)',
      'Strong problem-solving and communication skills',
    ],
    responsibilities: [
      'Lead frontend development for new features and products',
      'Mentor junior developers and conduct code reviews',
      'Collaborate with designers and product managers',
      'Optimize application performance and user experience',
      'Participate in technical architecture discussions',
      'Write clean, maintainable, and well-documented code',
      'Stay up-to-date with industry trends and best practices',
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      '401(k) with company matching',
      'Flexible work hours and remote work options',
      'Professional development budget',
      'Unlimited PTO and paid parental leave',
      'Modern office space with great amenities',
      'Regular team events and social activities',
    ],
    skills: [
      'React',
      'TypeScript',
      'JavaScript',
      'CSS',
      'HTML',
      'Redux',
      'Jest',
      'Webpack',
      'Git',
      'REST APIs',
    ],
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
    description:
      'Join our creative team as a UX/UI designer and help create beautiful, intuitive user experiences. You will work closely with product managers, developers, and stakeholders to design user-centered solutions that solve real problems.',
    experience: ExperienceLevel.MID_LEVEL,
    education: 'Design degree or equivalent experience',
    postedDate: new Date('2024-01-10'),
    deadline: new Date('2024-02-10'),
    status: 'active',
    requirements: [
      '3+ years of experience in UX/UI design',
      'Proficiency in Figma, Adobe Creative Suite, and Sketch',
      'Experience with user research and usability testing',
      'Strong understanding of design systems and component libraries',
      'Knowledge of accessibility guidelines and best practices',
      'Experience with prototyping tools and user flow design',
      'Portfolio demonstrating user-centered design solutions',
    ],
    responsibilities: [
      'Design user interfaces for web and mobile applications',
      'Conduct user research and usability testing',
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Collaborate with developers to ensure design feasibility',
      'Maintain and evolve design systems and style guides',
      'Present design solutions to stakeholders and clients',
      'Stay current with design trends and emerging technologies',
    ],
    benefits: [
      'Competitive hourly rate',
      'Flexible work hours and remote work',
      'Creative and collaborative environment',
      'Opportunity to work on diverse projects',
      'Professional development opportunities',
      'Modern design tools and resources',
    ],
    skills: [
      'Figma',
      'Adobe XD',
      'Sketch',
      'Prototyping',
      'User Research',
      'Design Systems',
      'Wireframing',
      'Visual Design',
    ],
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
    description:
      'Build scalable backend systems that power our data processing platform. You will work on high-performance APIs, database design, and system architecture to support our growing user base.',
    experience: ExperienceLevel.SENIOR,
    education: 'Computer Science degree',
    postedDate: new Date('2024-01-12'),
    deadline: new Date('2024-02-12'),
    status: 'active',
    requirements: [
      '5+ years of backend development experience',
      'Strong proficiency in Node.js, Python, or Java',
      'Experience with database design and optimization',
      'Knowledge of cloud platforms (AWS, GCP, Azure)',
      'Experience with microservices architecture',
      'Understanding of security best practices',
      'Experience with CI/CD pipelines and DevOps practices',
    ],
    responsibilities: [
      'Design and implement scalable backend APIs',
      'Optimize database performance and queries',
      'Work with cloud infrastructure and deployment',
      'Collaborate with frontend and data science teams',
      'Participate in code reviews and technical planning',
      'Monitor and maintain system performance',
      'Contribute to technical architecture decisions',
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      '401(k) with company matching',
      'Professional development budget',
      'Modern office in downtown Austin',
      'Flexible work arrangements',
      'Regular team events and happy hours',
    ],
    skills: [
      'Node.js',
      'Python',
      'PostgreSQL',
      'MongoDB',
      'AWS',
      'Docker',
      'Kubernetes',
      'REST APIs',
      'GraphQL',
    ],
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
]

const JobDetail = () => {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchJob = async () => {
      setIsLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const foundJob = mockJobs.find((j) => j._id === params.id)
      setJob(foundJob || null)
      setIsLoading(false)
    }

    if (params.id) {
      fetchJob()
    }
  }, [params.id])

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

  if (isLoading) {
    return (
      <Container>
        <div className='min-h-screen bg-gray-50 py-8'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-1/4 mb-4'></div>
            <div className='h-4 bg-gray-200 rounded w-1/2 mb-8'></div>
            <div className='space-y-4'>
              <div className='h-64 bg-gray-200 rounded'></div>
              <div className='h-32 bg-gray-200 rounded'></div>
              <div className='h-32 bg-gray-200 rounded'></div>
            </div>
          </div>
        </div>
      </Container>
    )
  }

  if (!job) {
    return (
      <Container>
        <div className='min-h-screen bg-gray-50 py-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>
              Job Not Found
            </h1>
            <p className='text-gray-600 mb-6'>
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push('/list')}>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to Jobs
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Container>
        <div className='py-8'>
          {/* Back Button */}
          <div className='mb-8'>
            <Button
              variant='ghost'
              onClick={() => router.push('/list')}
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
                        <Building className='h-5 w-5' />
                        <span className='font-semibold text-lg'>
                          {job.company}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <MapPin className='h-5 w-5' />
                        <span className='text-lg'>{job.location}</span>
                      </div>
                    </div>
                    <div className='flex items-center gap-6 text-sm text-gray-500'>
                      <div className='flex items-center gap-2'>
                        <Clock className='h-4 w-4' />
                        <span>Posted {getTimeAgo(job.postedDate)}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Calendar className='h-4 w-4' />
                        <span>Deadline: {formatDate(job.deadline)}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant='secondary' className='text-sm px-3 py-1'>
                    {job.type}
                  </Badge>
                </div>

                <div className='flex items-center gap-2 text-green-600 font-bold text-2xl mb-6'>
                  <DollarSign className='h-6 w-6' />
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
                      <span className='text-gray-700 text-lg'>
                        {requirement}
                      </span>
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
                  Applications close on {formatDate(job.deadline)}
                </p>
              </Card>

              {/* Company Info */}
              <Card className='p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  About {job.company}
                </h3>
                <div className='space-y-3 text-sm text-gray-600'>
                  <div className='flex items-center gap-2'>
                    <Globe className='h-4 w-4' />
                    <span>Company website</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4' />
                    <span>{job.location}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='h-4 w-4' />
                    <span>Company size</span>
                  </div>
                </div>
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
    </div>
  )
}

export default JobDetail
