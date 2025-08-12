import { useState, useCallback } from 'react';
import { message } from 'antd';
import { diUngService } from '@/services/diUngService';
import type { DiUngRequest, DiUngResponse } from '@/services/diUngService';

export const useDiUng = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [diUngList, setDiUngList] = useState<DiUngResponse[]>([]);

  // State cho modal
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDiUng, setEditingDiUng] = useState<DiUngResponse | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingDiUng, setDeletingDiUng] = useState<DiUngResponse | null>(null);

  // Lấy danh sách dị ứng thuốc của bệnh nhân
  const getDiUngByBenhNhan = useCallback(async (benhNhanId: number) => {
    try {
      setIsLoading(true);
      const data = await diUngService.getDiUngByBenhNhan(benhNhanId);
      setDiUngList(data);
    } catch (error) {
      console.error('Error fetching di ung:', error);
      message.error('Lỗi khi tải danh sách dị ứng thuốc');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Tạo mới dị ứng thuốc
  const createDiUng = useCallback(async (data: DiUngRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      await diUngService.createDiUng(data);
      message.success('Thêm dị ứng thuốc thành công');
      return true;
    } catch (error) {
      console.error('Error creating di ung:', error);
      message.error('Lỗi khi thêm dị ứng thuốc');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cập nhật dị ứng thuốc
  const updateDiUng = useCallback(async (id: number, data: Partial<DiUngRequest>): Promise<boolean> => {
    try {
      setIsLoading(true);
      await diUngService.updateDiUng(id, data);
      message.success('Cập nhật dị ứng thuốc thành công');
      return true;
    } catch (error) {
      console.error('Error updating di ung:', error);
      message.error('Lỗi khi cập nhật dị ứng thuốc');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Xóa dị ứng thuốc
  const deleteDiUng = useCallback(async (id: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      await diUngService.deleteDiUng(id);
      message.success('Xóa dị ứng thuốc thành công');
      return true;
    } catch (error) {
      console.error('Error deleting di ung:', error);
      message.error('Lỗi khi xóa dị ứng thuốc');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Modal functions
  const showModal = (diUng?: DiUngResponse) => {
    setEditingDiUng(diUng || null);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setEditingDiUng(null);
  };

  const showDeleteModal = (diUng: DiUngResponse) => {
    setDeletingDiUng(diUng);
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setDeletingDiUng(null);
  };

  const confirmDelete = async (): Promise<boolean> => {
    if (!deletingDiUng) return false;
    
    const success = await deleteDiUng(deletingDiUng.id);
    if (success) {
      hideDeleteModal();
      // Refresh list
      if (deletingDiUng.benhNhanId) {
        await getDiUngByBenhNhan(deletingDiUng.benhNhanId);
      }
    }
    return success;
  };

  return {
    // State
    isLoading,
    diUngList,
    modalVisible,
    editingDiUng,
    deleteModalVisible,
    deletingDiUng,

    // Functions
    getDiUngByBenhNhan,
    createDiUng,
    updateDiUng,
    deleteDiUng,
    showModal,
    hideModal,
    showDeleteModal,
    hideDeleteModal,
    confirmDelete,
  };
};
