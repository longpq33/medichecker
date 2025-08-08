import React, { useState } from 'react'
import { 
  Form,
  message,
  Pagination
} from 'antd'
import { PatientForm, PatientTable } from './components'
import { usePatients } from '@/hooks/usePatients'
import { useLanguage } from '@/hooks/useLanguage'
import { PageHeader, ConfirmModal } from '@/components'
import type { BenhNhanResponse } from '@/types'
import dayjs from 'dayjs'
import { PatientListContainer } from './styled'

export const PatientList: React.FC = () => {
  const { t } = useLanguage()
  const [searchText, setSearchText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingPatient, setEditingPatient] = useState<BenhNhanResponse | null>(null)
  const [form] = Form.useForm()
  
  // Delete modal state
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deletingPatient, setDeletingPatient] = useState<BenhNhanResponse | null>(null)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Sử dụng hook
  const {
    patientsData,
    isLoadingPatients,
    createPatient,
    updatePatient,
    deletePatient,
  } = usePatients(
    { 
      page: currentPage - 1, 
      size: pageSize,
      sort: ['hoTen']
    },
    searchText
  )

  const patients = patientsData?.content || []
  const total = patientsData?.totalElements || 0

  const handleAdd = () => {
    setEditingPatient(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (patient: BenhNhanResponse) => {
    setEditingPatient(patient)
    form.setFieldsValue({
      hoTen: patient.hoTen,
      ngaySinh: patient.ngaySinh ? dayjs(patient.ngaySinh) : undefined,
      gioiTinh: patient.gioiTinh,
      soDienThoai: patient.soDienThoai,
      email: patient.email,
      diaChi: patient.diaChi,
      soBaoHiem: patient.soBaoHiem,
    })
    setIsModalVisible(true)
  }

  const handleView = (patient: BenhNhanResponse) => {
    window.location.href = `/patients/${patient.id}`
  }

  const handleDelete = async (id: number) => {
    console.log('PatientList: Starting delete for ID:', id)
    const patientToDelete = patients.find(p => p.id === id)
    console.log('PatientList: Found patient:', patientToDelete)
    
    if (patientToDelete) {
      setDeletingPatient(patientToDelete)
      setIsDeleteModalVisible(true)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingPatient) return
    
    try {
      console.log('PatientList: Calling deletePatient for ID:', deletingPatient.id)
      await deletePatient(deletingPatient.id)
      console.log('PatientList: Delete completed for ID:', deletingPatient.id)
      setIsDeleteModalVisible(false)
      setDeletingPatient(null)
    } catch (error) {
      console.error('PatientList: Error deleting patient:', error)
    }
  }

  const handleDeleteCancel = () => {
    console.log('PatientList: Delete cancelled for ID:', deletingPatient?.id)
    setIsDeleteModalVisible(false)
    setDeletingPatient(null)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      
      // Xử lý format dữ liệu trước khi gửi lên API
      const formattedValues = {
        ...values,
        ngaySinh: values.ngaySinh ? dayjs(values.ngaySinh).format('YYYY-MM-DD') : undefined
      }
      
      if (editingPatient) {
        // Update existing patient
        await updatePatient({ id: editingPatient.id, data: formattedValues })
      } else {
        // Add new patient
        await createPatient(formattedValues)
      }
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Lỗi khi lưu bệnh nhân')
      console.error('Error saving patient:', error)
    }
  }

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page)
    if (size) {
      setPageSize(size)
    }
  }

  const getGenderText = (gender?: string) => {
    switch (gender) {
      case 'NAM':
        return t('common.male')
      case 'NU':
        return t('common.female')
      case 'KHAC':
        return t('common.other')
      default:
        return gender || ''
    }
  }

  const getGenderColor = (gender?: string) => {
    switch (gender) {
      case 'NAM':
        return 'blue'
      case 'NU':
        return 'pink'
      case 'KHAC':
        return 'orange'
      default:
        return 'default'
    }
  }

  return (
    <PatientListContainer>
      <PageHeader
        title={t('patient.patientManagement')}
        onAdd={handleAdd}
        onSearch={setSearchText}
        addButtonText={t('patient.addPatient')}
        searchPlaceholder={t('patient.searchPlaceholder')}
      />

      <PatientTable
        patients={patients}
        loading={isLoadingPatients}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        getGenderText={getGenderText}
        getGenderColor={getGenderColor}
      />

      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showSizeChanger
          showQuickJumper
          showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} bệnh nhân`}
        />
      </div>

      <PatientForm
        visible={isModalVisible}
        editingPatient={editingPatient}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
        form={form}
      />

      <ConfirmModal
        visible={isDeleteModalVisible}
        title={t('patient.deletePatient')}
        content={t('patient.deleteConfirm', { name: deletingPatient?.hoTen })}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
      />
    </PatientListContainer>
  )
} 