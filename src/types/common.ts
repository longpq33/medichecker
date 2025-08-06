// Common types
export interface Pageable {
  page: number
  size: number
  sort?: string[]
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  errors?: Record<string, string[]>
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
} 