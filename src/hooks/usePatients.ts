import { useQuery, useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { patientService } from '@/services'
import type { BenhNhanRequest, Pageable } from '@/types'

export const usePatients = (pageable: Pageable, keyword?: string) => {
  const queryClient = useQueryClient()

  // Query danh sách bệnh nhân
  const {
    data: patientsData,
    isLoading: isLoadingPatients,
    error: patientsError,
    refetch: refetchPatients,
  } = useQuery({
    queryKey: ['patients', pageable, keyword],
    queryFn: () => patientService.getDanhSachBenhNhan(pageable, keyword),
    keepPreviousData: true,
  })

  // Mutation tạo bệnh nhân mới
  const createPatientMutation = useMutation({
    mutationFn: patientService.taoMoiBenhNhan,
    onSuccess: () => {
      message.success('Tạo bệnh nhân thành công!')
      queryClient.invalidateQueries(['patients'])
    },
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi tạo bệnh nhân')
    },
  })

  // Mutation cập nhật bệnh nhân
  const updatePatientMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BenhNhanRequest }) =>
      patientService.capNhatBenhNhan(id, data),
    onSuccess: () => {
      message.success('Cập nhật bệnh nhân thành công!')
      queryClient.invalidateQueries(['patients'])
    },
    onError: (error: Error) => {
      message.error(error.message || 'Có lỗi xảy ra khi cập nhật bệnh nhân')
    },
  })

  // Mutation xóa bệnh nhân
  const deletePatientMutation = useMutation({
    mutationFn: patientService.xoaBenhNhan,
    onSuccess: () => {
      console.log('Delete patient success')
      message.success('Xóa bệnh nhân thành công!')
      queryClient.invalidateQueries(['patients'])
    },
    onError: (error: Error) => {
      console.error('Delete patient error:', error)
      message.error(error.message || 'Có lỗi xảy ra khi xóa bệnh nhân')
    },
  })

  return {
    // Data
    patientsData,
    isLoadingPatients,
    patientsError,
    
    // Actions
    refetchPatients,
    createPatient: createPatientMutation.mutate,
    updatePatient: updatePatientMutation.mutate,
    deletePatient: deletePatientMutation.mutateAsync,
    
    // Mutations
    createPatientMutation,
    updatePatientMutation,
    deletePatientMutation,
  }
}

export const usePatient = (id: number) => {
  const {
    data: patient,
    isLoading: isLoadingPatient,
    error: patientError,
    refetch: refetchPatient,
  } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => patientService.getChiTietBenhNhan(id),
    enabled: !!id,
  })

  return {
    patient,
    isLoadingPatient,
    patientError,
    refetchPatient,
  }
} 