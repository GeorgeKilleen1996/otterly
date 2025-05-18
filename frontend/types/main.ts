export interface Res {
  status: number
  message: string
}

export interface Response<T> extends Res {
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
