import { useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useAuthStore } from '@/store'
import { authService } from '@/services/auth'
import type { LoginRequest, RegisterRequest, UserProfile } from '@/types/auth'
import { message } from 'antd'

export const useAuth = () => {
  const { token, user, isAuthenticated, login, logout, updateUser } = useAuthStore()
  const queryClient = useQueryClient()

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.token, data.user)
      message.success('Đăng nhập thành công')
    },
    onError: (error: Error) => {
      message.error(error.message || 'Đăng nhập thất bại')
    },
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      login(data.token, data.user)
      message.success('Đăng ký thành công')
    },
    onError: (error: Error) => {
      message.error(error.message || 'Đăng ký thất bại')
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout()
      queryClient.clear()
      message.success('Đăng xuất thành công')
    },
    onError: () => {
      logout()
      queryClient.clear()
    },
  })

  // Get user profile query
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: authService.getProfile,
    enabled: !!token,
    onSuccess: (data: UserProfile) => {
      updateUser(data)
    },
    onError: () => {
      logout()
    },
  })

  // Login function
  const handleLogin = useCallback((data: LoginRequest) => {
    loginMutation.mutate(data)
  }, [loginMutation])

  // Register function
  const handleRegister = useCallback((data: RegisterRequest) => {
    registerMutation.mutate(data)
  }, [registerMutation])

  // Logout function
  const handleLogout = useCallback(() => {
    logoutMutation.mutate()
  }, [logoutMutation])

  return {
    // State
    token,
    user,
    isAuthenticated,
    profile,
    isLoadingProfile,
    
    // Mutations
    loginMutation,
    registerMutation,
    logoutMutation,
    
    // Actions
    handleLogin,
    handleRegister,
    handleLogout,
  }
} 