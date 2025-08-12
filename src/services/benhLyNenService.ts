import api from './api';

// Types cho bệnh nền
export interface BenhLyNenRequest {
  benhNhanId: number
  maBenh: string
  tenBenh: string
  moTa?: string
  ngayChanDoan?: string
  mucDoNghiemTrong?: 'NHE' | 'VUA' | 'NANG' | 'RAT_NANG'
}

export interface BenhLyNenResponse {
  id: number
  benhNhanId: number
  maBenh: string
  tenBenh: string
  moTa?: string
  ngayChanDoan?: string
  mucDoNghiemTrong?: 'NHE' | 'VUA' | 'NANG' | 'RAT_NANG'
}

// Service cho bệnh nền
export const benhLyNenService = {
  // Thêm bệnh nền mới
  createBenhLyNen: async (data: BenhLyNenRequest): Promise<BenhLyNenResponse> => {
    const response = await api.post('/benh-ly-nen', data)
    return response.data
  },

  // Lấy danh sách bệnh nền của bệnh nhân
  getBenhLyNenByBenhNhan: async (benhNhanId: number): Promise<BenhLyNenResponse[]> => {
    const response = await api.get(`/benh-ly-nen/benh-nhan/${benhNhanId}`)
    return response.data
  },

  // Lấy chi tiết bệnh nền
  getBenhLyNenById: async (id: number): Promise<BenhLyNenResponse> => {
    const response = await api.get(`/benh-ly-nen/${id}`)
    return response.data
  },

  // Cập nhật bệnh nền
  updateBenhLyNen: async (id: number, data: BenhLyNenRequest): Promise<BenhLyNenResponse> => {
    const response = await api.put(`/benh-ly-nen/${id}`, data)
    return response.data
  },

  // Xóa bệnh nền
  deleteBenhLyNen: async (id: number): Promise<void> => {
    await api.delete(`/benh-ly-nen/${id}`)
  }
}
