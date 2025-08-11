import type { PrescriptionAnalysisResponse } from '@/types/analysis'

// Helper function để lấy giá trị an toàn từ response
export const getSafeValue = <T>(obj: unknown, path: string, defaultValue: T): T => {
  try {
    const keys = path.split('.')
    let current: unknown = obj
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = (current as Record<string, unknown>)[key]
      } else {
        return defaultValue
      }
    }
    
    return current as T
  } catch {
    return defaultValue
  }
}

// Helper function để kiểm tra và lấy response data
export const getAnalysisData = (response: unknown): PrescriptionAnalysisResponse => {
  if (!response || typeof response !== 'object') {
    return {}
  }
  
  return response as PrescriptionAnalysisResponse
}

// Helper function để lấy overall risk từ API response
export const getOverallRisk = (response: unknown): string => {
  const risk = getSafeValue(response, 'overall_risk', 'UNKNOWN')
  
  // Map các giá trị risk sang format hiển thị
  switch (risk?.toUpperCase()) {
    case 'LOW':
      return 'THẤP'
    case 'MEDIUM':
      return 'TRUNG BÌNH'
    case 'HIGH':
      return 'CAO'
    case 'CRITICAL':
      return 'NGUY HIỂM'
    default:
      return risk || 'UNKNOWN'
  }
}

// Helper function để lấy safety level (fallback cho backward compatibility)
export const getSafetyLevel = (response: unknown): string => {
  return getSafeValue(response, 'tongQuan.mucDoAnToan', getOverallRisk(response))
}

// Helper function để lấy risk level cho color mapping
export const getRiskLevel = (response: unknown): string => {
  const risk = getSafeValue(response, 'overall_risk', 'UNKNOWN')
  
  // Map các giá trị risk sang safety level tương ứng
  switch (risk?.toUpperCase()) {
    case 'LOW':
      return 'AN_TOAN'
    case 'MEDIUM':
      return 'CAN_THAN_TRONG'
    case 'HIGH':
      return 'NGUY_HIEM'
    case 'CRITICAL':
      return 'NGUY_HIEM'
    default:
      return 'UNKNOWN'
  }
}

// Helper function để lấy safety score (fallback cho backward compatibility)
export const getSafetyScore = (response: unknown): number => {
  return getSafeValue(response, 'tongQuan.diemAnToan', 0)
}

// Helper function để lấy total drugs
export const getTotalDrugs = (response: unknown): number => {
  return getSafeValue(response, 'tongQuan.tongThuoc', 0)
}

// Helper function để lấy total cost
export const getTotalCost = (response: unknown): number => {
  return getSafeValue(response, 'tongQuan.tongChiPhi', 0)
}

// Helper function để lấy recommendations
export const getRecommendations = (response: unknown, type: 'tongHop' | 'canThiet' | 'khongCanThiet'): string[] => {
  return getSafeValue(response, `khuyenNghi.${type}`, [])
}

// Helper function để lấy report details
export const getReportDetail = (response: unknown, field: 'ngayPhanTich' | 'nguoiPhanTich' | 'ghiChu'): string => {
  return getSafeValue(response, `baoCaoChiTiet.${field}`, 'N/A')
}
