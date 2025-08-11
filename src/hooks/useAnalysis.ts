import { useState, useCallback } from 'react'
import { analysisService } from '@/services'
import type { 
  PrescriptionAnalysisRequest
} from '@/types'

export const useAnalysis = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Phân tích đơn thuốc tổng hợp
  const phanTichDonThuoc = useCallback(async (data: PrescriptionAnalysisRequest) => {
    setLoading(true)
    setError(null)
    try {
      const result = await analysisService.phanTichDonThuoc(data)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi phân tích đơn thuốc'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Phân tích tương tác thuốc
  const phanTichTuongTac = useCallback(async (data: Record<string, unknown>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await analysisService.phanTichTuongTac(data)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi phân tích tương tác thuốc'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Phân tích thuốc không hợp lý
  const phanTichKhongHopLy = useCallback(async (data: Record<string, unknown>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await analysisService.phanTichKhongHopLy(data)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi phân tích thuốc không hợp lý'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Phân tích trùng chỉ định
  const phanTichTrungChiDinh = useCallback(async (data: Record<string, unknown>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await analysisService.phanTichTrungChiDinh(data)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi phân tích trùng chỉ định'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Phân tích chống chỉ định
  const phanTichChongChiDinh = useCallback(async (data: Record<string, unknown>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await analysisService.phanTichChongChiDinh(data)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi phân tích chống chỉ định'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    loading,
    error,
    phanTichDonThuoc,
    phanTichTuongTac,
    phanTichKhongHopLy,
    phanTichTrungChiDinh,
    phanTichChongChiDinh,
    clearError,
  }
} 