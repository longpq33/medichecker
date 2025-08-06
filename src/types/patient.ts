// Types cho bệnh nhân
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