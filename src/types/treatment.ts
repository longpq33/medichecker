// Types cho lịch sử điều trị
export interface LichSuDieuTriRequest {
  benhNhanId: number
  maChanDoan: string
  chanDoanChinh: string
  chanDoanPhu?: string
  trieuChung?: string
  bacSiDieuTri: string
  trangThai: 'MOI_TAO' | 'DA_DUYET' | 'DANG_DIEU_TRI' | 'HOAN_THANH' | 'HUY_BO'
  ngayBatDau: string
  donThuocDieuTri?: DonThuocDieuTriRequest
}

export interface DonThuocDieuTriRequest {
  benhNhanId: number
  dieuTriId?: number
  maDonThuoc: string
  bacSiKeDon: string
  ghiChu?: string
  trangThai: 'MOI_TAO' | 'DA_DUYET' | 'DANG_THUC_HIEN' | 'HOAN_THANH' | 'HUY_BO'
  danhSachThuoc: ThuocDieuTri[]
}

export interface ThuocDieuTri {
  thuocId: number
  soLuong: number
  lieuDung: string
  duongDung: string
  tanSuat: string
  thoiGianDung: string
  huongDanSuDung?: string
  giaDonVi: number
  thanhTien: number
}

export interface LichSuDieuTriResponse {
  id: number
  maChanDoan?: string
  chanDoanChinh: string
  chanDoanPhu?: string
  trieuChung?: string
  bacSiDieuTri: string
  trangThai: 'MOI_TAO' | 'DA_DUYET' | 'DANG_DIEU_TRI' | 'HOAN_THANH' | 'HUY_BO'
  ngayBatDau?: string
  ngayKetThuc?: string
  ngayCapNhat?: string
  donThuocDieuTri?: DonThuocDieuTri
}

export interface DonThuocDieuTri {
  id: number
  maDonThuoc: string
  benhNhan?: any
  bacSiKeDon: string
  ghiChu?: string
  trangThai: string
  ngayKeDon: string
  danhSachThuoc: ThuocDieuTriResponse[]
}

export interface ThuocDieuTriResponse {
  id: number
  thuoc: {
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
    nhomThuoc?: string
    kichHoat: boolean
    ngayTao: string
  }
  soLuong: number
  lieuDung: string
  duongDung: string
  tanSuat: string
  thoiGianDung: string
  huongDanSuDung?: string
  giaDonVi?: number
  thanhTien?: number
}

export interface PageLichSuDieuTriResponse {
  totalPages: number
  totalElements: number
  size: number
  content: LichSuDieuTriResponse[]
  number: number
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
} 