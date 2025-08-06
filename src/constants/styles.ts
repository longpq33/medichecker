// Design System Constants
export const SPACING = {
  // Padding
  PADDING_XS: '4px',
  PADDING_SM: '8px',
  PADDING_MD: '16px',
  PADDING_LG: '24px',
  PADDING_XL: '32px',
  PADDING_XXL: '48px',
  
  // Margin
  MARGIN_XS: '4px',
  MARGIN_SM: '8px',
  MARGIN_MD: '16px',
  MARGIN_LG: '24px',
  MARGIN_XL: '32px',
  MARGIN_XXL: '48px',
  
  // Gap
  GAP_XS: '4px',
  GAP_SM: '8px',
  GAP_MD: '16px',
  GAP_LG: '24px',
  GAP_XL: '32px',
} as const

export const FONT_SIZE = {
  XS: '12px',
  SM: '14px',
  MD: '16px',
  LG: '18px',
  XL: '20px',
  XXL: '24px',
  XXXL: '32px',
} as const

export const FONT_WEIGHT = {
  NORMAL: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
} as const

export const BORDER_RADIUS = {
  XS: '4px',
  SM: '8px',
  MD: '12px',
  LG: '16px',
  XL: '20px',
} as const

export const SHADOWS = {
  SM: '0 2px 8px rgba(0, 0, 0, 0.1)',
  MD: '0 4px 12px rgba(0, 0, 0, 0.08)',
  LG: '0 8px 24px rgba(0, 0, 0, 0.12)',
  XL: '0 12px 32px rgba(0, 0, 0, 0.15)',
} as const

export const COLORS = {
  // Primary colors - WellNest theme
  PRIMARY: '#6366f1', // Indigo primary
  PRIMARY_HOVER: '#4f46e5',
  PRIMARY_ACTIVE: '#4338ca',
  
  // Secondary colors
  SECONDARY: '#8b5cf6', // Purple secondary
  SECONDARY_HOVER: '#7c3aed',
  
  // Success colors
  SUCCESS: '#10b981', // Emerald green
  SUCCESS_HOVER: '#059669',
  
  // Warning colors
  WARNING: '#f59e0b', // Amber
  WARNING_HOVER: '#d97706',
  
  // Error colors
  ERROR: '#ef4444', // Red
  ERROR_HOVER: '#dc2626',
  
  // Text colors
  TEXT_PRIMARY: '#1f2937', // Gray-800
  TEXT_SECONDARY: '#6b7280', // Gray-500
  TEXT_DISABLED: '#9ca3af', // Gray-400
  
  // Background colors
  BG_PRIMARY: '#ffffff', // White
  BG_SECONDARY: '#f9fafb', // Gray-50
  BG_TERTIARY: '#f3f4f6', // Gray-100
  
  // Border colors
  BORDER_PRIMARY: '#e5e7eb', // Gray-200
  BORDER_SECONDARY: '#f3f4f6', // Gray-100
  
  // WellNest specific colors
  WELLNEST_BLUE: '#3b82f6', // Blue-500
  WELLNEST_GREEN: '#10b981', // Emerald-500
  WELLNEST_PURPLE: '#8b5cf6', // Purple-500
  WELLNEST_ORANGE: '#f59e0b', // Amber-500
  WELLNEST_RED: '#ef4444', // Red-500
} as const

export const GRADIENTS = {
  PRIMARY: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  PRIMARY_HOVER: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
  SUCCESS: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  WARNING: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  ERROR: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  WELLNEST: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  WELLNEST_HOVER: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
} as const

export const TRANSITIONS = {
  FAST: 'all 0.2s ease',
  NORMAL: 'all 0.3s ease',
  SLOW: 'all 0.5s ease',
} as const

// Button styles
export const BUTTON_STYLES = {
  HEIGHT: '44px',
  PADDING: '0 24px',
  BORDER_RADIUS: BORDER_RADIUS.MD,
  FONT_SIZE: FONT_SIZE.SM,
  FONT_WEIGHT: FONT_WEIGHT.MEDIUM,
  TRANSITION: TRANSITIONS.NORMAL,
} as const

// Card styles
export const CARD_STYLES = {
  BORDER_RADIUS: BORDER_RADIUS.LG,
  PADDING: SPACING.PADDING_LG,
  SHADOW: SHADOWS.SM,
  TRANSITION: TRANSITIONS.NORMAL,
} as const

// Form styles
export const FORM_STYLES = {
  LABEL_FONT_SIZE: FONT_SIZE.SM,
  LABEL_FONT_WEIGHT: FONT_WEIGHT.SEMIBOLD,
  INPUT_HEIGHT: '40px',
  INPUT_BORDER_RADIUS: BORDER_RADIUS.SM,
} as const

// Table styles
export const TABLE_STYLES = {
  HEADER_FONT_SIZE: FONT_SIZE.SM,
  HEADER_FONT_WEIGHT: FONT_WEIGHT.SEMIBOLD,
  ROW_HEIGHT: '48px',
  BORDER_RADIUS: BORDER_RADIUS.SM,
} as const 