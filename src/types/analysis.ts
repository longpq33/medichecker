// Types cho phân tích đơn thuốc
import type { ThuocResponse } from './medicine'

export interface ChongChiDinhWarning {
  thuoc: ThuocResponse
  benhLyNen: string
  mucDoNguyHiem: string
  lyDo: string
}

export interface KhongHopLyWarning {
  thuoc: ThuocResponse
  chanDoan: string
  lyDo: string
  khuyenNghi: string
}

export interface TrungChiDinhWarning {
  danhSachThuoc: ThuocResponse[]
  tacDungTrung: string
  khuyenNghi: string
}

export interface TuongTacWarning {
  thuoc1: ThuocResponse
  thuoc2: ThuocResponse
  mucDoTuongTac: string
  moTa: string
  khuyenNghi: string
}

export interface PhanTichResponse {
  chongChiDinh: ChongChiDinhWarning[]
  tuongTac: TuongTacWarning[]
  trungChiDinh: TrungChiDinhWarning[]
  khongHopLy: KhongHopLyWarning[]
}

// Types cho phân tích đơn thuốc tổng hợp - Khớp với Swagger API
export interface PrescriptionItem {
  drug_name: string
  dosage: string
  frequency: string
}

export interface PrescriptionAnalysisRequest {
  prescription_list: PrescriptionItem[]
  allergies?: string[] // Danh sách dị ứng
  medical_history?: string[] // Lịch sử bệnh lý nền
}

// Response từ API có thể có cấu trúc khác nhau, sử dụng type assertion
export type PrescriptionAnalysisResponse = {
  // Field mới từ API
  overall_risk?: string // Mức độ rủi ro tổng thể (LOW, MEDIUM, HIGH, CRITICAL)
  
  // Fields cũ (fallback cho backward compatibility)
  tongQuan?: {
    tongThuoc?: number
    tongChiPhi?: number
    mucDoAnToan?: string
    diemAnToan?: number
  }
  phanTich?: PhanTichResponse
  khuyenNghi?: {
    tongHop?: string[]
    canThiet?: string[]
    khongCanThiet?: string[]
  }
  baoCaoChiTiet?: {
    ngayPhanTich?: string
    nguoiPhanTich?: string
    ghiChu?: string
  }
  [key: string]: unknown
}

// Type cũ để tham khảo (có thể không khớp với API thực tế)
export interface PrescriptionAnalysisResponseOld {
  tongQuan: {
    tongThuoc: number
    tongChiPhi: number
    mucDoAnToan: 'AN_TOAN' | 'CAN_THAN_TRONG' | 'NGUY_HIEM'
    diemAnToan: number
  }
  phanTich: PhanTichResponse
  khuyenNghi: {
    tongHop: string[]
    canThiet: string[]
    khongCanThiet: string[]
  }
  baoCaoChiTiet: {
    ngayPhanTich: string
    nguoiPhanTich: string
    ghiChu?: string
  }
} 