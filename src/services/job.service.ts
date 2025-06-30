import type { AxiosResponse } from 'axios'

import client from '@/client'
import type { ApiResponse } from '@/interface/axios.interface'
import type { JobResponse, JobsResponse } from '@/interface/Job.interface'

export interface JobFilters {
  page?: number
  limit?: number
  search?: string
  location?: string
  type?: string
  workMode?: string
  experience?: string
  minSalary?: number
  maxSalary?: number
}

const jobService = {
  getJobs: async (filters?: JobFilters): Promise<ApiResponse<JobsResponse>> => {
    const params = new URLSearchParams()

    if (filters) {
      if (filters.page) params.append('page', filters.page.toString())
      if (filters.limit) params.append('limit', filters.limit.toString())
      if (filters.search) params.append('search', filters.search)
      if (filters.location) params.append('location', filters.location)
      if (filters.type) params.append('type', filters.type)
      if (filters.workMode) params.append('workMode', filters.workMode)
      if (filters.experience) params.append('experience', filters.experience)
      if (filters.minSalary)
        params.append('minSalary', filters.minSalary.toString())
      if (filters.maxSalary)
        params.append('maxSalary', filters.maxSalary.toString())
    }

    const queryString = params.toString()
    const url = `/user/job/get-jobs${queryString ? `?${queryString}` : ''}`

    const response: AxiosResponse<ApiResponse<JobsResponse>> =
      await client.get(url)
    return response.data
  },

  getJobById: async (id: string): Promise<ApiResponse<JobResponse>> => {
    const response: AxiosResponse<ApiResponse<JobResponse>> = await client.get(
      `/user/job/get-job/${id}`
    )
    return response.data
  },
}

export default jobService
