import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { useTheme } from '@/hooks/useTheme'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { themeColors } = useTheme()

  return (
    <StyledThemeProvider theme={themeColors}>
      {children}
    </StyledThemeProvider>
  )
} 