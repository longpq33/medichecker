// Types cho bệnh nền
export interface BenhLyNenRequest {
  benhNhanId: number
  maBenh: string
  tenBenh: string
  moTa?: string
  ngayChanDoan?: string
  mucDoNghiemTrong?: MucDoNghiemTrongType
}

export interface BenhLyNenResponse {
  id: number
  benhNhanId: number
  maBenh: string
  tenBenh: string
  moTa?: string
  ngayChanDoan?: string
  mucDoNghiemTrong?: MucDoNghiemTrongType
}

// Const cho mức độ nghiêm trọng
export const MucDoNghiemTrong = {
  NHE: 'NHE',
  VUA: 'VUA',
  NANG: 'NANG',
  RAT_NANG: 'RAT_NANG'
} as const;

export type MucDoNghiemTrongType = typeof MucDoNghiemTrong[keyof typeof MucDoNghiemTrong];

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
