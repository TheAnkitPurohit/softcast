import type { AxiosResponse } from 'axios'

import apiClient from '@/lib/apiClient'

const videoService = {
  getVideos: async (): Promise<ApiResponse<VideoResponse>> => {
    const response: AxiosResponse<ApiResponse<VideoResponse>> =
      await apiClient.get('/api/videos')
    return response.data
  },
}

export default videoService
