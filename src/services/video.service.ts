import type { AxiosResponse } from 'axios'

import apiClient from '@/lib/apiClient'

const videoService = {
  getVideos: async (): Promise<ApiResponse<VideoResponse>> => {
    const response: AxiosResponse<ApiResponse<VideoResponse>> =
      await apiClient.get('/api/videos')
    return response.data
  },

  //   getJobById: async (id: string): Promise<ApiResponse<JobResponse>> => {
  //     const response: AxiosResponse<ApiResponse<JobResponse>> =
  //       await apiClient.get(`/api/admin/job/get-job/${id}`)
  //     return response.data
  //   },

  //   createJob: async (job: JobCreate): Promise<ApiResponse<Job>> => {
  //     const response: AxiosResponse<ApiResponse<Job>> = await apiClient.post(
  //       '/api/admin/job/create-job',
  //       job
  //     )
  //     return response.data
  //   },

  //   updateJob: async (id: string, job: JobCreate): Promise<ApiResponse<Job>> => {
  //     const response: AxiosResponse<ApiResponse<Job>> = await apiClient.put(
  //       `/api/admin/job/update-job/${id}`,
  //       job
  //     )
  //     return response.data
  //   },
}

export default videoService
