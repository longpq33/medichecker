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