import { useQuery, useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { prescriptionService } from '@/services'
import type { DonThuocRequest, ChiTietDonThuocRequest, Pageable } from '@/types'

export const usePrescriptions = (pageable: Pageable, keyword?: string) => {
  const queryClient = useQueryClient()

  // Query danh sách đơn thuốc
  const {
    data: prescriptionsData,
    isLoading: isLoadingPrescriptions,
    error: prescriptionsError,
    refetch: refetchPrescriptions,
  } = useQuery({
    queryKey: ['prescriptions', pageable, keyword],
    queryFn: () => prescriptionService.getDanhSachDonThuoc(pageable, keyword),
    keepPreviousData: true,
  })

  // Mutation tạo đơn thuốc mới
  const createPrescriptionMutation = useMutation({
    mutationFn: prescriptionService.taoDonThuoc,
    onSuccess: () => {
      message.success('Tạo đơn thuốc thành công!')
      queryClient.invalidateQueries(['prescriptions'])
    },
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi tạo đơn thuốc')
    },
  })

  // Mutation cập nhật đơn thuốc
  const updatePrescriptionMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: DonThuocRequest }) =>
      prescriptionService.capNhatDonThuoc(id, data),
    onSuccess: () => {
      message.success('Cập nhật đơn thuốc thành công!')
      queryClient.invalidateQueries(['prescriptions'])
    },
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi cập nhật đơn thuốc')
    },
  })

  // Mutation xóa đơn thuốc
  const deletePrescriptionMutation = useMutation({
    mutationFn: prescriptionService.xoaDonThuoc,
    onSuccess: () => {
      message.success('Xóa đơn thuốc thành công!')
      queryClient.invalidateQueries(['prescriptions'])
    },
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi xóa đơn thuốc')
    },
  })

  // Mutation thêm thuốc vào đơn
  const addMedicineToPrescriptionMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ChiTietDonThuocRequest }) =>
      prescriptionService.themThuocVaoDon(id, data),
    onSuccess: () => {
      message.success('Thêm thuốc vào đơn thành công!')
      queryClient.invalidateQueries(['prescriptions'])
    },
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi thêm thuốc vào đơn')
    },
  })

  // Mutation cập nhật thuốc trong đơn
  const updateMedicineInPrescriptionMutation = useMutation({
    mutationFn: ({ id, drugId, data }: { id: number; drugId: number; data: ChiTietDonThuocRequest }) =>
      prescriptionService.capNhatThuocTrongDon(id, drugId, data),
    onSuccess: () => {
      message.success('Cập nhật thuốc trong đơn thành công!')
      queryClient.invalidateQueries(['prescriptions'])
    },
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi cập nhật thuốc trong đơn')
    },
  })

  // Mutation xóa thuốc khỏi đơn
  const removeMedicineFromPrescriptionMutation = useMutation({
    mutationFn: ({ id, drugId }: { id: number; drugId: number }) =>
      prescriptionService.xoaThuocKhoiDon(id, drugId),
    onSuccess: () => {
      message.success('Xóa thuốc khỏi đơn thành công!')
      queryClient.invalidateQueries(['prescriptions'])
    },
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi xóa thuốc khỏi đơn')
    },
  })

  return {
    // Data
    prescriptionsData,
    isLoadingPrescriptions,
    prescriptionsError,
    
    // Actions
    refetchPrescriptions,
    createPrescription: createPrescriptionMutation.mutate,
    updatePrescription: updatePrescriptionMutation.mutate,
    deletePrescription: deletePrescriptionMutation.mutate,
    addMedicineToPrescription: addMedicineToPrescriptionMutation.mutate,
    updateMedicineInPrescription: updateMedicineInPrescriptionMutation.mutate,
    removeMedicineFromPrescription: removeMedicineFromPrescriptionMutation.mutate,
    
    // Mutations
    createPrescriptionMutation,
    updatePrescriptionMutation,
    deletePrescriptionMutation,
    addMedicineToPrescriptionMutation,
    updateMedicineInPrescriptionMutation,
    removeMedicineFromPrescriptionMutation,
  }
}

export const usePrescription = (id: number) => {
  const {
    data: prescription,
    isLoading: isLoadingPrescription,
    error: prescriptionError,
  } = useQuery({
    queryKey: ['prescription', id],
    queryFn: () => prescriptionService.getChiTietDonThuoc(id),
    enabled: !!id,
  })

  return {
    prescription,
    isLoadingPrescription,
    prescriptionError,
  }
} 