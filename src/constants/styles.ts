// Design System Constants
export const SPACING = {
  // Padding
  PADDING_XS: '6px',
  PADDING_SM: '12px',
  PADDING_MD: '20px',
  PADDING_LG: '32px',
  PADDING_XL: '40px',
  PADDING_XXL: '48px',
  
  // Margin
  MARGIN_XS: '6px',
  MARGIN_SM: '12px',
  MARGIN_MD: '20px',
  MARGIN_LG: '32px',
  MARGIN_XL: '40px',
  MARGIN_XXL: '48px',
  
  // Gap
  GAP_XS: '6px',
  GAP_SM: '12px',
  GAP_MD: '20px',
  GAP_LG: '32px',
  GAP_XL: '40px',
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

// Shadows
export const SHADOWS = {
  NONE: 'none',
  SM: 'none',
  MD: 'none',
  LG: 'none',
  XL: 'none',
} as const

export const COLORS = {
  PRIMARY: '#2C92B8', // Brand primary blue-green
  PRIMARY_HOVER: '#257fa0',
  PRIMARY_ACTIVE: '#1f6c88',
  SECONDARY: '#8b5cf6', // Secondary remains for accents
  SUCCESS: '#10b981', // Emerald green
  WARNING: '#f59e0b', // Amber
  ERROR: '#ef4444', // Red
  ERROR_HOVER: '#dc2626',
  TEXT_PRIMARY: '#1f2937', // Gray-800
  TEXT_SECONDARY: '#6b7280', // Gray-500
  TEXT_TERTIARY: '#9ca3af', // Gray-400
  BG_PRIMARY: '#ffffff', // White background as requested
  BG_SECONDARY: '#fafafa', // Light gray (secondary surfaces)
  BG_TERTIARY: '#f8fafc', // Gray-50 (very light)
  BORDER_PRIMARY: '#e5e7eb', // Gray-200
  BORDER_SECONDARY: '#f3f4f6', // Gray-100
  WELLNEST_BLUE: '#3b82f6',
  WELLNEST_PURPLE: '#8b5cf6',
  WELLNEST_INDIGO: '#6366f1',
} as const

export const GRADIENTS = {
  PRIMARY: 'linear-gradient(135deg, #2C92B8 0%, #257fa0 100%)',
  PRIMARY_HOVER: 'linear-gradient(135deg, #257fa0 0%, #1f6c88 100%)',
  SUCCESS: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  WARNING: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  ERROR: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  WELLNEST: 'linear-gradient(135deg, #2C92B8 0%, #257fa0 100%)',
  WELLNEST_HOVER: 'linear-gradient(135deg, #257fa0 0%, #1f6c88 100%)',
} as const

export const TRANSITIONS = {
  FAST: 'all 0.2s ease',
  NORMAL: 'all 0.3s ease',
  SLOW: 'all 0.5s ease',
} as const

// Button styles
export const BUTTON_STYLES = {
  HEIGHT: '48px',
  PADDING: '0 28px',
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
  INPUT_HEIGHT: '48px',
  INPUT_BORDER_RADIUS: BORDER_RADIUS.MD,
  INPUT_PADDING: '12px 16px',
  INPUT_FONT_SIZE: FONT_SIZE.SM,
  FORM_ITEM_MARGIN_BOTTOM: SPACING.MARGIN_LG,
} as const

// Table styles
export const TABLE_STYLES = {
  HEADER_FONT_SIZE: FONT_SIZE.SM,
  HEADER_FONT_WEIGHT: FONT_WEIGHT.SEMIBOLD,
  ROW_HEIGHT: '48px',
  BORDER_RADIUS: BORDER_RADIUS.SM,
} as const 