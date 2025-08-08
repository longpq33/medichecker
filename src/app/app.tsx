import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { router } from './routes'
import './app.css'
import '../i18n'
import { useTheme } from '@/hooks/useTheme'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { useEffect } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const { theme, themeColors } = useTheme()

  // Apply theme to document body on mount
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme'
  }, [theme])

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: themeColors.primary,
            colorInfo: themeColors.primary,
            colorBgContainer: themeColors.bgPrimary,
            colorBgElevated: themeColors.cardBg,
            colorBorder: themeColors.borderPrimary,
            colorText: themeColors.textPrimary,
            colorTextSecondary: themeColors.textSecondary,
            colorTextTertiary: themeColors.textTertiary,
            colorBgLayout: themeColors.bgPrimary,
            colorBgSpotlight: themeColors.bgSecondary,
            colorBgMask: 'rgba(0, 0, 0, 0.45)',
            borderRadius: 6,
            wireframe: false,
          },
          algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        }}
      >
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App 