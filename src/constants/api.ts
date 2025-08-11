// API Base URL
export const API_BASE_URL = 'https://medi-checker.onrender.com'

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  REGISTER: '/auth/register',
  
  // User
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  
  // Common
  UPLOAD: '/upload',
  HEALTH_CHECK: '/health',
} as const

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

// API Response Messages
export const API_MESSAGES = {
  SUCCESS: 'Thành công',
  ERROR: 'Có lỗi xảy ra',
  UNAUTHORIZED: 'Không có quyền truy cập',
  NOT_FOUND: 'Không tìm thấy dữ liệu',
  VALIDATION_ERROR: 'Dữ liệu không hợp lệ',
} as const 