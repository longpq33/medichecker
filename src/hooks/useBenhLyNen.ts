import { useState, useCallback } from 'react'
import { benhLyNenService, type BenhLyNenRequest, type BenhLyNenResponse } from '@/services/benhLyNenService'
import { message } from 'antd'

export const useBenhLyNen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [benhLyNenList, setBenhLyNenList] = useState<BenhLyNenResponse[]>([])
  
  // State cho modal xóa
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [deletingBenhLyNen, setDeletingBenhLyNen] = useState<BenhLyNenResponse | null>(null)

  // Thêm bệnh nền mới
  const createBenhLyNen = useCallback(async (data: BenhLyNenRequest): Promise<BenhLyNenResponse | null> => {
    setIsLoading(true)
    try {
      const response = await benhLyNenService.createBenhLyNen(data)
      message.success('Thêm bệnh nền thành công!')
      return response
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm bệnh nền')
      console.error('Error creating benh ly nen:', error)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Lấy danh sách bệnh nền của bệnh nhân
  const getBenhLyNenByBenhNhan = useCallback(async (benhNhanId: number): Promise<BenhLyNenResponse[]> => {
    setIsLoading(true)
    try {
      const response = await benhLyNenService.getBenhLyNenByBenhNhan(benhNhanId)
      setBenhLyNenList(response)
      return response
    } catch (error) {
      message.error('Có lỗi xảy ra khi lấy danh sách bệnh nền')
      console.error('Error getting benh ly nen:', error)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Cập nhật bệnh nền
  const updateBenhLyNen = useCallback(async (id: number, data: BenhLyNenRequest): Promise<BenhLyNenResponse | null> => {
    setIsLoading(true)
    try {
      const response = await benhLyNenService.updateBenhLyNen(id, data)
      message.success('Cập nhật bệnh nền thành công!')
      return response
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật bệnh nền')
      console.error('Error updating benh ly nen:', error)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Xóa bệnh nền
  const deleteBenhLyNen = useCallback(async (id: number): Promise<boolean> => {
    setIsLoading(true)
    try {
      await benhLyNenService.deleteBenhLyNen(id)
      message.success('Xóa bệnh nền thành công!')
      return true
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa bệnh nền')
      console.error('Error deleting benh ly nen:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Mở modal xóa
  const showDeleteModal = useCallback((benhLyNen: BenhLyNenResponse) => {
    setDeletingBenhLyNen(benhLyNen)
    setDeleteModalVisible(true)
  }, [])

  // Đóng modal xóa
  const hideDeleteModal = useCallback(() => {
    setDeleteModalVisible(false)
    setDeletingBenhLyNen(null)
  }, [])

  // Xác nhận xóa
  const confirmDelete = useCallback(async (): Promise<boolean> => {
    if (!deletingBenhLyNen) return false
    
    setIsLoading(true)
    try {
      await benhLyNenService.deleteBenhLyNen(deletingBenhLyNen.id)
      message.success('Xóa bệnh nền thành công!')
      hideDeleteModal()
      return true
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa bệnh nền')
      console.error('Error deleting benh ly nen:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [deletingBenhLyNen, hideDeleteModal])

  return {
    isLoading,
    benhLyNenList,
    createBenhLyNen,
    getBenhLyNenByBenhNhan,
    updateBenhLyNen,
    deleteBenhLyNen,
    deleteModalVisible,
    deletingBenhLyNen,
    showDeleteModal,
    hideDeleteModal,
    confirmDelete
  }
}
