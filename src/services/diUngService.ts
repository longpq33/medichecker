import api from './api';

// Types cho dị ứng thuốc
export interface DiUngRequest {
  benhNhanId: number;
  thuocId: number;
  trieuChung?: string;
  mucDoNghiemTrong?: 'NHE' | 'VUA' | 'NANG' | 'RAT_NANG';
  ngayXuatHien?: string;
  ghiChu?: string;
}

export interface DiUngResponse {
  id: number;
  benhNhanId: number;
  thuocId: number;
  trieuChung?: string;
  mucDoNghiemTrong?: 'NHE' | 'VUA' | 'NANG' | 'RAT_NANG';
  ngayXuatHien?: string;
  ghiChu?: string;
  thuoc: {
    id: number;
    tenThuoc: string;
    maThuoc: string;
    hangSanXuat: string;
    nuocSanXuat: string;
  };
  benhNhan: {
    id: number;
    hoTen: string;
    maBenhNhan: string;
  };
  ngayTao: string;
  ngayCapNhat: string;
}

// Service cho dị ứng thuốc
export const diUngService = {
  // Lấy danh sách dị ứng thuốc của bệnh nhân
  getDiUngByBenhNhan: async (benhNhanId: number): Promise<DiUngResponse[]> => {
    const response = await api.get(`/di-ung-thuoc/benh-nhan/${benhNhanId}`);
    return response.data;
  },

  // Lấy chi tiết dị ứng thuốc theo ID
  getDiUngById: async (id: number): Promise<DiUngResponse> => {
    const response = await api.get(`/di-ung-thuoc/${id}`);
    return response.data;
  },

  // Tạo mới dị ứng thuốc
  createDiUng: async (data: DiUngRequest): Promise<DiUngResponse> => {
    const response = await api.post('/di-ung-thuoc', data);
    return response.data;
  },

  // Cập nhật dị ứng thuốc
  updateDiUng: async (id: number, data: Partial<DiUngRequest>): Promise<DiUngResponse> => {
    const response = await api.put(`/di-ung-thuoc/${id}`, data);
    return response.data;
  },

  // Xóa dị ứng thuốc
  deleteDiUng: async (id: number): Promise<void> => {
    await api.delete(`/di-ung-thuoc/${id}`);
  },

  // Lấy danh sách tất cả dị ứng thuốc (có phân trang)
  getAllDiUng: async (params?: {
    page?: number;
    size?: number;
    sort?: string[];
  }): Promise<{
    content: DiUngResponse[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }> => {
    const response = await api.get('/di-ung', { params });
    return response.data;
  }
};
