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
    params.append('page', pageable.page.toString())
    params.append('size', pageable.size.toString())
    
    // Thêm sort parameter theo format Swagger
    if (pageable.sort && pageable.sort.length > 0) {
      pageable.sort.forEach(sortItem => {
        params.append('sort', sortItem)
      })
    } else {
      // Sort mặc định theo tên bệnh nhân
      params.append('sort', 'hoTen')
    }
    
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
    console.log('Deleting patient with ID:', id)
    const response = await api.delete(`/patients/${id}`)
    console.log('Delete response:', response)
    return response.data
  },
} 