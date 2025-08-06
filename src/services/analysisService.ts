import api from './api'
import type { PhanTichResponse } from '@/types'

export const analysisService = {
  // Phân tích tương tác thuốc
  phanTichTuongTac: async (data: Record<string, unknown>) => {
    const response = await api.post<PhanTichResponse>('/analysis/interactions', data)
    return response.data
  },

  // Phân tích thuốc không hợp lý
  phanTichKhongHopLy: async (data: Record<string, unknown>) => {
    const response = await api.post<PhanTichResponse>('/analysis/inappropriate-drugs', data)
    return response.data
  },

  // Phân tích trùng chỉ định
  phanTichTrungChiDinh: async (data: Record<string, unknown>) => {
    const response = await api.post<PhanTichResponse>('/analysis/duplicate-indications', data)
    return response.data
  },

  // Phân tích chống chỉ định
  phanTichChongChiDinh: async (data: Record<string, unknown>) => {
    const response = await api.post<PhanTichResponse>('/analysis/contraindications', data)
    return response.data
  },
} 