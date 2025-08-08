import { useCallback } from 'react'
import { useUIStore } from '@/store'
import { THEME, getThemeColors, type ThemeType } from '@/constants'

export const useTheme = () => {
  const { theme, setTheme } = useUIStore()

  const changeTheme = useCallback((newTheme: ThemeType) => {
    setTheme(newTheme)
    // Update document body class for global styling
    document.body.className = newTheme === THEME.DARK ? 'dark-theme' : 'light-theme'
  }, [setTheme])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    changeTheme(newTheme)
  }, [theme, changeTheme])

  const themeColors = getThemeColors(theme)
  const isDark = theme === THEME.DARK
  const isLight = theme === THEME.LIGHT

  return {
    theme,
    themeColors,
    isDark,
    isLight,
    changeTheme,
    toggleTheme,
  }
} 