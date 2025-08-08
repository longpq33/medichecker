import 'styled-components'
import { LIGHT_THEME, DARK_THEME } from '@/constants/theme'

type LightTheme = typeof LIGHT_THEME
type DarkTheme = typeof DARK_THEME

export type ThemeColors = LightTheme | DarkTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeColors {
    // This interface extends ThemeColors to provide theme types to styled-components
    readonly bgPrimary: string
    readonly bgSecondary: string
    readonly bgTertiary: string
    readonly textPrimary: string
    readonly textSecondary: string
    readonly textTertiary: string
    readonly textInverse: string
    readonly borderPrimary: string
    readonly borderSecondary: string
    readonly borderTertiary: string
    readonly primary: string
    readonly primaryHover: string
    readonly primaryActive: string
    readonly success: string
    readonly warning: string
    readonly error: string
    readonly info: string
    readonly cardBg: string
    readonly cardBorder: string
    readonly cardShadow: string
    readonly sidebarBg: string
    readonly sidebarText: string
    readonly sidebarHover: string
    readonly sidebarActive: string
    readonly headerBg: string
    readonly headerBorder: string
    readonly headerText: string
    readonly tableBg: string
    readonly tableHeaderBg: string
    readonly tableRowHover: string
    readonly tableBorder: string
    readonly formBg: string
    readonly formBorder: string
    readonly formFocus: string
    readonly buttonPrimary: string
    readonly buttonPrimaryHover: string
    readonly buttonSecondary: string
    readonly buttonSecondaryHover: string
    readonly buttonText: string
    readonly buttonTextInverse: string
  }
} 