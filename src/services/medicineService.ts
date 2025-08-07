import api from './api'
import type { 
  ThuocRequest, 
  ThuocResponse, 
  PageThuocResponse,
  Pageable 
} from '@/types'

export const medicineService = {
  // Lấy danh sách thuốc với phân trang
  getDanhSachThuoc: async (pageable: Pageable, keyword?: string) => {
    const params = new URLSearchParams()
    params.append('page', pageable.page.toString())
    params.append('size', pageable.size.toString())
    params.append('sort', 'tenThuoc')
    if (keyword) {
      params.append('keyword', keyword)
    }
    
    const response = await api.get<PageThuocResponse>(`/drugs?${params.toString()}`)
    return response.data
  },

  // Lấy chi tiết thuốc
  getChiTietThuoc: async (id: number) => {
    const response = await api.get<ThuocResponse>(`/drugs/${id}`)
    return response.data
  },

  // Thêm thuốc mới
  themThuocMoi: async (data: ThuocRequest) => {
    const response = await api.post<ThuocResponse>('/drugs', data)
    return response.data
  },

  // Cập nhật thuốc
  capNhatThuoc: async (id: number, data: ThuocRequest) => {
    const response = await api.put<ThuocResponse>(`/drugs/${id}`, data)
    return response.data
  },

  // Xóa thuốc
  xoaThuoc: async (id: number) => {
    const response = await api.delete(`/drugs/${id}`)
    return response.data
  },
} 