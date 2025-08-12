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

// Enum cho mức độ nghiêm trọng
export enum MucDoNghiemTrong {
  NHE = 'NHE',
  VUA = 'VUA',
  NANG = 'NANG',
  RAT_NANG = 'RAT_NANG'
}

// Mappings cho mức độ nghiêm trọng
export const MUC_DO_NGHIEM_TRONG_LABELS = {
  [MucDoNghiemTrong.NHE]: 'Nhẹ',
  [MucDoNghiemTrong.VUA]: 'Vừa',
  [MucDoNghiemTrong.NANG]: 'Nặng',
  [MucDoNghiemTrong.RAT_NANG]: 'Rất nặng'
}

export const MUC_DO_NGHIEM_TRONG_COLORS = {
  [MucDoNghiemTrong.NHE]: 'green',
  [MucDoNghiemTrong.VUA]: 'orange',
  [MucDoNghiemTrong.NANG]: 'red',
  [MucDoNghiemTrong.RAT_NANG]: 'volcano'
}
