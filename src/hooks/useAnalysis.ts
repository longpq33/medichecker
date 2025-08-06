import { useMutation } from 'react-query'
import { message } from 'antd'
import { analysisService } from '@/services'

export const useAnalysis = () => {
  // Mutation phân tích tương tác thuốc
  const interactionAnalysisMutation = useMutation({
    mutationFn: analysisService.phanTichTuongTac,
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi phân tích tương tác thuốc')
    },
  })

  // Mutation phân tích thuốc không hợp lý
  const inappropriateDrugsMutation = useMutation({
    mutationFn: analysisService.phanTichKhongHopLy,
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi phân tích thuốc không hợp lý')
    },
  })

  // Mutation phân tích trùng chỉ định
  const duplicateIndicationsMutation = useMutation({
    mutationFn: analysisService.phanTichTrungChiDinh,
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi phân tích trùng chỉ định')
    },
  })

  // Mutation phân tích chống chỉ định
  const contraindicationsMutation = useMutation({
    mutationFn: analysisService.phanTichChongChiDinh,
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi phân tích chống chỉ định')
    },
  })

  return {
    // Actions
    analyzeInteractions: interactionAnalysisMutation.mutate,
    analyzeInappropriateDrugs: inappropriateDrugsMutation.mutate,
    analyzeDuplicateIndications: duplicateIndicationsMutation.mutate,
    analyzeContraindications: contraindicationsMutation.mutate,
    
    // Mutations
    interactionAnalysisMutation,
    inappropriateDrugsMutation,
    duplicateIndicationsMutation,
    contraindicationsMutation,
  }
} 