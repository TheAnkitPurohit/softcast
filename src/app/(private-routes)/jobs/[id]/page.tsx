import React from 'react'

import JobDetail from '@/app/(private-routes)/jobs/[id]/JobDetail'
import jobService from '@/services/job.service'

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const res = await jobService?.getJobById(id)

  return <JobDetail job={res?.data?.job} />
}

export default Page
