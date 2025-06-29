export interface ApiResponse<T> {
  success: boolean
  statusCode: number
  request: {
    ip: string
    method: string
    url: string
  }
  message: string
  data: T
}

export interface PaginatedList<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
