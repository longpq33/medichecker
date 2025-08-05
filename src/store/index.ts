import { create } from 'zustand'
import type { User } from '@/types/auth'

// Auth store
interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
  updateUser: (user: User) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  login: (token, user) =>
    set({
      token,
      user,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    }),
  updateUser: (user) =>
    set({
      user,
    }),
}))

// UI store
interface UIState {
  theme: 'light' | 'dark'
  language: 'vi' | 'en'
  sidebarCollapsed: boolean
  setTheme: (theme: 'light' | 'dark') => void
  setLanguage: (language: 'vi' | 'en') => void
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  language: 'vi',
  sidebarCollapsed: false,
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
})) 