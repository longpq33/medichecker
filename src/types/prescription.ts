// Types cho đơn thuốc
import type { BenhNhanResponse } from './patient'
import type { ThuocResponse } from './medicine'

export interface DonThuocRequest {
  benhNhanId: number
  dieuTriId?: number
  bacSiKeDon: string
  ghiChu?: string
}

export interface ChiTietDonThuocRequest {
  thuocId: number
  soLuong: number
  lieuDung?: string
  duongDung?: string
  tanSuat?: string
  thoiGianDung?: string
  huongDanSuDung?: string
}

export interface ChiTietDonThuocResponse {
  id: number
  thuoc: ThuocResponse
  soLuong: number
  lieuDung?: string
  duongDung?: string
  tanSuat?: string
  thoiGianDung?: string
  huongDanSuDung?: string
  giaDonVi: number
  thanhTien: number
}

export interface DonThuocResponse {
  id: number
  maDonThuoc: string
  benhNhan: BenhNhanResponse
  bacSiKeDon: string
  ghiChu?: string
  trangThai: 'MOI_TAO' | 'DA_DUYET' | 'DANG_THUC_HIEN' | 'HOAN_THANH' | 'HUY_BO'
  ngayKeDon: string
  danhSachThuoc: ChiTietDonThuocResponse[]
}

export interface PageDonThuocResponse {
  totalPages: number
  totalElements: number
  size: number
  content: DonThuocResponse[]
  number: number
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
} 