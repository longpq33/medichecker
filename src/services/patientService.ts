import api from './api'
import type { 
  BenhNhanRequest, 
  BenhNhanResponse, 
  PageBenhNhanResponse,
  Pageable 
} from '@/types'

export const patientService = {
  // Lấy danh sách bệnh nhân với phân trang
  getDanhSachBenhNhan: async (pageable: Pageable, keyword?: string) => {
    const params = new URLSearchParams()
    params.append('pageable', JSON.stringify(pageable))
    if (keyword) {
      params.append('keyword', keyword)
    }
    
    const response = await api.get<PageBenhNhanResponse>(`/patients?${params.toString()}`)
    return response.data
  },

  // Lấy chi tiết bệnh nhân
  getChiTietBenhNhan: async (id: number) => {
    const response = await api.get<BenhNhanResponse>(`/patients/${id}`)
    return response.data
  },

  // Tạo mới bệnh nhân
  taoMoiBenhNhan: async (data: BenhNhanRequest) => {
    const response = await api.post<BenhNhanResponse>('/patients', data)
    return response.data
  },

  // Cập nhật bệnh nhân
  capNhatBenhNhan: async (id: number, data: BenhNhanRequest) => {
    const response = await api.put<BenhNhanResponse>(`/patients/${id}`, data)
    return response.data
  },

  // Xóa bệnh nhân
  xoaBenhNhan: async (id: number) => {
    const response = await api.delete(`/patients/${id}`)
    return response.data
  },
} 