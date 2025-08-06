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
  // Primary colors
  PRIMARY: '#1890ff',
  PRIMARY_HOVER: '#40a9ff',
  PRIMARY_ACTIVE: '#096dd9',
  
  // Secondary colors
  SECONDARY: '#722ed1',
  SECONDARY_HOVER: '#9254de',
  
  // Success colors
  SUCCESS: '#52c41a',
  SUCCESS_HOVER: '#73d13d',
  
  // Warning colors
  WARNING: '#faad14',
  WARNING_HOVER: '#ffc53d',
  
  // Error colors
  ERROR: '#ff4d4f',
  ERROR_HOVER: '#ff7875',
  
  // Text colors
  TEXT_PRIMARY: '#262626',
  TEXT_SECONDARY: '#666',
  TEXT_DISABLED: '#bfbfbf',
  
  // Background colors
  BG_PRIMARY: '#ffffff',
  BG_SECONDARY: '#fafafa',
  BG_TERTIARY: '#f0f0f0',
  
  // Border colors
  BORDER_PRIMARY: '#d9d9d9',
  BORDER_SECONDARY: '#f0f0f0',
} as const

export const GRADIENTS = {
  PRIMARY: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  PRIMARY_HOVER: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
  SUCCESS: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
  WARNING: 'linear-gradient(135deg, #faad14 0%, #ffc53d 100%)',
  ERROR: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
} as const

export const TRANSITIONS = {
  FAST: 'all 0.2s ease',
  NORMAL: 'all 0.3s ease',
  SLOW: 'all 0.5s ease',
} as const

// Button styles
export const BUTTON_STYLES = {
  HEIGHT: '40px',
  PADDING: '0 20px',
  BORDER_RADIUS: BORDER_RADIUS.SM,
  FONT_SIZE: FONT_SIZE.SM,
  FONT_WEIGHT: FONT_WEIGHT.MEDIUM,
  TRANSITION: TRANSITIONS.NORMAL,
} as const

// Card styles
export const CARD_STYLES = {
  BORDER_RADIUS: BORDER_RADIUS.MD,
  PADDING: SPACING.PADDING_LG,
  SHADOW: SHADOWS.MD,
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