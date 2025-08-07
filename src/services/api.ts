import axios from 'axios'
import { message } from 'antd'

// Cấu hình axios
const api = axios.create({
  baseURL: 'http://10.136.83.51:8080',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor để thêm token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor để xử lý lỗi
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra'
    message.error(errorMessage)
    
    return Promise.reject(error)
  }
)

export default api 