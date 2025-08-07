import api from './api'
import type { 
  LichSuDieuTriRequest,
  LichSuDieuTriResponse, 
  PageLichSuDieuTriResponse,
  Pageable 
} from '@/types'

export const treatmentService = {
  // Lấy lịch sử điều trị của bệnh nhân
  getLichSuDieuTri: async (patientId: number, pageable: Pageable) => {
    const params = new URLSearchParams()
    params.append('page', pageable.page.toString())
    params.append('size', pageable.size.toString())
    
    const response = await api.get<PageLichSuDieuTriResponse>(`/patients/${patientId}/treatments?${params.toString()}`)
    return response.data
  },

  // Lấy chi tiết lịch sử điều trị
  getChiTietLichSuDieuTri: async (treatmentId: number) => {
    const response = await api.get<LichSuDieuTriResponse>(`/treatments/${treatmentId}`)
    return response.data
  },

  // Tạo mới lịch sử điều trị
  taoMoiLichSuDieuTri: async (patientId: number, data: LichSuDieuTriRequest) => {
    const response = await api.post<LichSuDieuTriResponse>(`/patients/${patientId}/treatments`, data)
    return response.data
  },

  // Cập nhật lịch sử điều trị
  capNhatLichSuDieuTri: async (treatmentId: number, data: LichSuDieuTriRequest) => {
    const response = await api.put<LichSuDieuTriResponse>(`/treatments/${treatmentId}`, data)
    return response.data
  },

  // Xóa lịch sử điều trị
  xoaLichSuDieuTri: async (treatmentId: number) => {
    const response = await api.delete(`/treatments/${treatmentId}`)
    return response.data
  },
} 