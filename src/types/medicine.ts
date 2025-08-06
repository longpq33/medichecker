// Types cho thuốc
export interface ThuocRequest {
  tenThuoc: string
  tenHoatChat?: string
  nongDo?: string
  dangBaoChe?: string
  hangSanXuat?: string
  nuocSanXuat?: string
  giaBan?: number
  donViTinh?: string
  chiDinh?: string
  chongChiDinh?: string
  tacDungPhu?: string
  lieuDungNguoiLon?: string
  lieuDungTreEm?: string
  nhomThuoc?: 'KHANG_SINH' | 'GIAM_DAU' | 'CHONG_VIEM' | 'TIM_MACH' | 'TIEU_HOA' | 'HOI_SUC' | 'KHAC'
}

export interface ThuocResponse {
  id: number
  maThuoc: string
  tenThuoc: string
  tenHoatChat?: string
  nongDo?: string
  dangBaoChe?: string
  hangSanXuat?: string
  nuocSanXuat?: string
  giaBan?: number
  donViTinh?: string
  chiDinh?: string
  chongChiDinh?: string
  nhomThuoc?: 'KHANG_SINH' | 'GIAM_DAU' | 'CHONG_VIEM' | 'TIM_MACH' | 'TIEU_HOA' | 'HOI_SUC' | 'KHAC'
  kichHoat: boolean
  ngayTao: string
}

export interface PageThuocResponse {
  totalPages: number
  totalElements: number
  size: number
  content: ThuocResponse[]
  number: number
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
} 