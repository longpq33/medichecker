// Authentication Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  phone?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
  phone?: string
  avatar?: string
  createdAt?: string
  updatedAt?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface UserProfile {
  id: string
  email: string
  name: string
  role: string
  phone?: string
  avatar?: string
  address?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  createdAt: string
  updatedAt: string
}

export interface UpdateProfileRequest {
  name?: string
  phone?: string
  avatar?: string
  address?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Error Types
export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
} 