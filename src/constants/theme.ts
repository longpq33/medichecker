export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export type ThemeType = typeof THEME[keyof typeof THEME]

// Light theme colors
export const LIGHT_THEME = {
  // Background colors
  bgPrimary: '#ffffff',
  bgSecondary: '#f5f5f5',
  bgTertiary: '#fafafa',
  
  // Text colors
  textPrimary: '#262626',
  textSecondary: '#595959',
  textTertiary: '#8c8c8c',
  textInverse: '#ffffff',
  
  // Border colors
  borderPrimary: '#d9d9d9',
  borderSecondary: '#f0f0f0',
  borderTertiary: '#e8e8e8',
  
  // Primary colors
  primary: '#2C92B8',
  primaryHover: '#1e7a9a',
  primaryActive: '#156b8a',
  
  // Status colors
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1890ff',
  
  // Component colors
  cardBg: '#ffffff',
  cardBorder: '#f0f0f0',
  cardShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
  
  // Sidebar colors
  sidebarBg: 'linear-gradient(135deg, #2C92B8 0%, #1e7a9a 100%)',
  sidebarText: '#ffffff',
  sidebarHover: 'rgba(255, 255, 255, 0.1)',
  sidebarActive: 'rgba(255, 255, 255, 0.2)',
  
  // Header colors
  headerBg: '#ffffff',
  headerBorder: '#f0f0f0',
  headerText: '#262626',
  
  // Table colors
  tableBg: '#ffffff',
  tableHeaderBg: '#fafafa',
  tableRowHover: '#f5f5f5',
  tableBorder: '#f0f0f0',
  
  // Form colors
  formBg: '#ffffff',
  formBorder: '#d9d9d9',
  formFocus: '#2C92B8',
  
  // Button colors
  buttonPrimary: '#2C92B8',
  buttonPrimaryHover: '#1e7a9a',
  buttonSecondary: '#f5f5f5',
  buttonSecondaryHover: '#e6e6e6',
  buttonText: '#262626',
  buttonTextInverse: '#ffffff',
} as const

// Dark theme colors
export const DARK_THEME = {
  // Background colors
  bgPrimary: '#141414',
  bgSecondary: '#1f1f1f',
  bgTertiary: '#262626',
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#a6a6a6',
  textTertiary: '#737373',
  textInverse: '#141414',
  
  // Border colors
  borderPrimary: '#434343',
  borderSecondary: '#303030',
  borderTertiary: '#1f1f1f',
  
  // Primary colors
  primary: '#2C92B8',
  primaryHover: '#1e7a9a',
  primaryActive: '#156b8a',
  
  // Status colors
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1890ff',
  
  // Component colors
  cardBg: '#1f1f1f',
  cardBorder: '#434343',
  cardShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  
  // Sidebar colors
  sidebarBg: 'linear-gradient(135deg, #2C92B8 0%, #1e7a9a 100%)',
  sidebarText: '#ffffff',
  sidebarHover: 'rgba(255, 255, 255, 0.1)',
  sidebarActive: 'rgba(255, 255, 255, 0.2)',
  
  // Header colors
  headerBg: '#1f1f1f',
  headerBorder: '#434343',
  headerText: '#ffffff',
  
  // Table colors
  tableBg: '#1f1f1f',
  tableHeaderBg: '#262626',
  tableRowHover: '#262626',
  tableBorder: '#434343',
  
  // Form colors
  formBg: '#1f1f1f',
  formBorder: '#434343',
  formFocus: '#2C92B8',
  
  // Button colors
  buttonPrimary: '#2C92B8',
  buttonPrimaryHover: '#1e7a9a',
  buttonSecondary: '#262626',
  buttonSecondaryHover: '#434343',
  buttonText: '#ffffff',
  buttonTextInverse: '#141414',
} as const

export type LightTheme = typeof LIGHT_THEME
export type DarkTheme = typeof DARK_THEME

export const getThemeColors = (theme: ThemeType) => {
  return theme === THEME.DARK ? DARK_THEME : LIGHT_THEME
} 