export interface Response<T> {
  status: number
  statusText: string
  data?: T
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  page: number
  total_pages: number
  results: T[]
}
