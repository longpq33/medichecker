import apiClient from '@/utils/axios'
import { API_ENDPOINTS } from '@/constants/api'
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserProfile,
  UpdateProfileRequest,
} from '@/types/auth'

export const authService = {
  // Login
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, data)
    return response.data
  },

  // Register
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, data)
    return response.data
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.LOGOUT)
  },

  // Refresh token
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post(API_ENDPOINTS.REFRESH_TOKEN)
    return response.data
  },

  // Get user profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get(API_ENDPOINTS.USER_PROFILE)
    return response.data
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const response = await apiClient.put(API_ENDPOINTS.USER_PROFILE, data)
    return response.data
  },
}

// Re-export types for backward compatibility
export type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserProfile,
  UpdateProfileRequest,
} from '@/types/auth' 