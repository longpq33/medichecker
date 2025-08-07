// Types cho bệnh nhân
import type { LichSuDieuTriResponse } from './treatment'

export interface BenhLyNen {
  id: number
  maBenh: string
  tenBenh: string
  moTa?: string
  mucDoNghiemTrong?: string
  ngayChanDoan?: string
}

export interface DiUng {
  id: number
  tenDiUng: string
  moTa?: string
  mucDoNghiemTrong?: string
}

export interface BenhNhanRequest {
  hoTen: string
  ngaySinh?: string
  gioiTinh?: 'NAM' | 'NU' | 'KHAC'
  soDienThoai?: string
  email?: string
  diaChi?: string
  soBaoHiem?: string
}

export interface BenhNhanResponse {
  id: number
  maBenhNhan: string
  hoTen: string
  ngaySinh?: string
  gioiTinh?: 'NAM' | 'NU' | 'KHAC'
  soDienThoai?: string
  email?: string
  diaChi?: string
  soBaoHiem?: string
  ngayTao: string
  ngayCapNhat: string
  nhomMau?: string
  lienHeKhanCap?: string
  danhSachBenhLyNen?: BenhLyNen[]
  danhSachDiUng?: DiUng[]
  danhSachDieuTri?: LichSuDieuTriResponse[]
}

export interface PageBenhNhanResponse {
  totalPages: number
  totalElements: number
  size: number
  content: BenhNhanResponse[]
  number: number
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
} 