import { useQuery, useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { medicineService } from '@/services'
import type { ThuocRequest, Pageable } from '@/types'

export const useMedicines = (pageable: Pageable, keyword?: string) => {
  const queryClient = useQueryClient()

  // Query danh sách thuốc
  const {
    data: medicinesData,
    isLoading: isLoadingMedicines,
    error: medicinesError,
    refetch: refetchMedicines,
  } = useQuery({
    queryKey: ['medicines', pageable, keyword],
    queryFn: () => medicineService.getDanhSachThuoc(pageable, keyword),
    keepPreviousData: true,
  })

  // Mutation thêm thuốc mới
  const createMedicineMutation = useMutation({
    mutationFn: medicineService.themThuocMoi,
    onSuccess: () => {
      message.success('Thêm thuốc thành công!')
      queryClient.invalidateQueries(['medicines'])
    },
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi thêm thuốc')
    },
  })

  // Mutation cập nhật thuốc
  const updateMedicineMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ThuocRequest }) =>
      medicineService.capNhatThuoc(id, data),
    onSuccess: () => {
      message.success('Cập nhật thuốc thành công!')
      queryClient.invalidateQueries(['medicines'])
    },
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi cập nhật thuốc')
    },
  })

  // Mutation xóa thuốc
  const deleteMedicineMutation = useMutation({
    mutationFn: medicineService.xoaThuoc,
    onSuccess: () => {
      message.success('Xóa thuốc thành công!')
      queryClient.invalidateQueries(['medicines'])
    },
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi xóa thuốc')
    },
  })

  return {
    // Data
    medicinesData,
    isLoadingMedicines,
    medicinesError,
    
    // Actions
    refetchMedicines,
    createMedicine: createMedicineMutation.mutate,
    updateMedicine: updateMedicineMutation.mutate,
    deleteMedicine: deleteMedicineMutation.mutate,
    
    // Mutations
    createMedicineMutation,
    updateMedicineMutation,
    deleteMedicineMutation,
  }
}

export const useMedicine = (id: number) => {
  const {
    data: medicine,
    isLoading: isLoadingMedicine,
    error: medicineError,
  } = useQuery({
    queryKey: ['medicine', id],
    queryFn: () => medicineService.getChiTietThuoc(id),
    enabled: !!id,
  })

  return {
    medicine,
    isLoadingMedicine,
    medicineError,
  }
} 