import api from './api'
import type { 
  PhanTichResponse, 
  PrescriptionAnalysisRequest, 
  PrescriptionAnalysisResponse 
} from '@/types'
import { API_ENDPOINTS } from '@/constants'

export const analysisService = {
  // Phân tích đơn thuốc tổng hợp
  phanTichDonThuoc: async (data: PrescriptionAnalysisRequest) => {
    const response = await api.post<PrescriptionAnalysisResponse>(
      API_ENDPOINTS.ANALYSIS_PRESCRIPTION, 
      data
    )
    return response.data
  },

  // Phân tích tương tác thuốc
  phanTichTuongTac: async (data: Record<string, unknown>) => {
    const response = await api.post<PhanTichResponse>(
      API_ENDPOINTS.ANALYSIS_INTERACTIONS, 
      data
    )
    return response.data
  },

  // Phân tích thuốc không hợp lý
  phanTichKhongHopLy: async (data: Record<string, unknown>) => {
    const response = await api.post<PhanTichResponse>(
      API_ENDPOINTS.ANALYSIS_INAPPROPRIATE_DRUGS, 
      data
    )
    return response.data
  },

  // Phân tích trùng chỉ định
  phanTichTrungChiDinh: async (data: Record<string, unknown>) => {
    const response = await api.post<PhanTichResponse>(
      API_ENDPOINTS.ANALYSIS_DUPLICATE_INDICATIONS, 
      data
    )
    return response.data
  },

  // Phân tích chống chỉ định
  phanTichChongChiDinh: async (data: Record<string, unknown>) => {
    const response = await api.post<PhanTichResponse>(
      API_ENDPOINTS.ANALYSIS_CONTRAINDICATIONS, 
      data
    )
    return response.data
  },
} 