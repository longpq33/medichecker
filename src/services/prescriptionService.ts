import api from './api'
import type { 
  DonThuocRequest, 
  DonThuocResponse, 
  PageDonThuocResponse,
  ChiTietDonThuocRequest,
  Pageable 
} from '@/types'

export const prescriptionService = {
  // Lấy danh sách đơn thuốc với phân trang
  getDanhSachDonThuoc: async (pageable: Pageable, keyword?: string) => {
    const params = new URLSearchParams()
    params.append('page', pageable.page.toString())
    params.append('size', pageable.size.toString())
    if (keyword) {
      params.append('keyword', keyword)
    }
    
    const response = await api.get<PageDonThuocResponse>(`/prescriptions?${params.toString()}`)
    return response.data
  },

  // Lấy chi tiết đơn thuốc
  getChiTietDonThuoc: async (id: number) => {
    const response = await api.get<DonThuocResponse>(`/prescriptions/${id}`)
    return response.data
  },

  // Tạo đơn thuốc mới
  taoDonThuoc: async (data: DonThuocRequest) => {
    const response = await api.post<DonThuocResponse>('/prescriptions', data)
    return response.data
  },

  // Cập nhật đơn thuốc
  capNhatDonThuoc: async (id: number, data: DonThuocRequest) => {
    const response = await api.put<DonThuocResponse>(`/prescriptions/${id}`, data)
    return response.data
  },

  // Xóa đơn thuốc
  xoaDonThuoc: async (id: number) => {
    const response = await api.delete(`/prescriptions/${id}`)
    return response.data
  },

  // Thêm thuốc vào đơn
  themThuocVaoDon: async (id: number, data: ChiTietDonThuocRequest) => {
    const response = await api.post<DonThuocResponse>(`/prescriptions/${id}/items`, data)
    return response.data
  },

  // Cập nhật thuốc trong đơn
  capNhatThuocTrongDon: async (id: number, drugId: number, data: ChiTietDonThuocRequest) => {
    const response = await api.put<DonThuocResponse>(`/prescriptions/${id}/items/${drugId}`, data)
    return response.data
  },

  // Xóa thuốc khỏi đơn
  xoaThuocKhoiDon: async (id: number, drugId: number) => {
    const response = await api.delete<DonThuocResponse>(`/prescriptions/${id}/items/${drugId}`)
    return response.data
  },
} 