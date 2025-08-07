import React, { useState } from 'react'
import { 
  Form,
  message,
  Pagination
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { MedicineForm, MedicineTable, MedicineHeader, DeleteMedicineModal } from './components'
import { useMedicines } from '@/hooks/useMedicines'
import { useLanguage } from '@/hooks/useLanguage'
import type { ThuocResponse } from '@/types'
import { MedicineListContainer } from './styled'

export const MedicineList: React.FC = () => {
  const { t } = useLanguage()
  const [searchText, setSearchText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState<ThuocResponse | null>(null)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  
  // Delete modal state
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deletingMedicine, setDeletingMedicine] = useState<ThuocResponse | null>(null)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Sử dụng hook
  const {
    medicinesData,
    isLoadingMedicines,
    createMedicine,
    updateMedicine,
    deleteMedicine,
  } = useMedicines(
    { 
      page: currentPage - 1, 
      size: pageSize,
      sort: ['tenThuoc']
    },
    searchText
  )

  const medicines = medicinesData?.content || []
  const total = medicinesData?.totalElements || 0

  const getNhomThuocText = (nhomThuoc?: string) => {
    switch (nhomThuoc) {
      case 'KHANG_SINH':
        return t('medicine.groups.antibiotic')
      case 'GIAM_DAU':
        return t('medicine.groups.painkiller')
      case 'CHONG_VIEM':
        return t('medicine.groups.antiInflammatory')
      case 'TIM_MACH':
        return t('medicine.groups.cardiovascular')
      case 'TIEU_HOA':
        return t('medicine.groups.digestive')
      case 'HOI_SUC':
        return t('medicine.groups.respiratory')
      case 'KHAC':
        return t('medicine.groups.other')
      default:
        return t('medicine.noData')
    }
  }

  const getNhomThuocColor = (nhomThuoc?: string) => {
    switch (nhomThuoc) {
      case 'KHANG_SINH':
        return 'red'
      case 'GIAM_DAU':
        return 'orange'
      case 'CHONG_VIEM':
        return 'blue'
      case 'TIM_MACH':
        return 'purple'
      case 'TIEU_HOA':
        return 'green'
      case 'HOI_SUC':
        return 'cyan'
      case 'KHAC':
        return 'default'
      default:
        return 'default'
    }
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
    setCurrentPage(1) // Reset về trang đầu khi search
  }

  const handleAdd = () => {
    setEditingMedicine(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (medicine: ThuocResponse) => {
    setEditingMedicine(medicine)
    form.setFieldsValue({
      tenThuoc: medicine.tenThuoc,
      tenHoatChat: medicine.tenHoatChat,
      nongDo: medicine.nongDo,
      dangBaoChe: medicine.dangBaoChe,
      hangSanXuat: medicine.hangSanXuat,
      nuocSanXuat: medicine.nuocSanXuat,
      giaBan: medicine.giaBan,
      donViTinh: medicine.donViTinh,
      chiDinh: medicine.chiDinh,
      chongChiDinh: medicine.chongChiDinh,
      nhomThuoc: medicine.nhomThuoc,
    })
    setIsModalVisible(true)
  }

  const handleView = (medicine: ThuocResponse) => {
    navigate(`/medicines/${medicine.id}`)
  }

  const handleDelete = (id: number) => {
    const medicine = medicines.find(m => m.id === id)
    if (medicine) {
      setDeletingMedicine(medicine)
      setIsDeleteModalVisible(true)
    }
  }

  const handleDeleteConfirm = async () => {
    if (deletingMedicine) {
      try {
        await deleteMedicine(deletingMedicine.id)
        setIsDeleteModalVisible(false)
        setDeletingMedicine(null)
      } catch {
        message.error(t('medicine.deleteError'))
      }
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false)
    setDeletingMedicine(null)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      
      if (editingMedicine) {
        // Update existing medicine
        await updateMedicine({ id: editingMedicine.id, data: values })
      } else {
        // Add new medicine
        await createMedicine(values)
      }
      setIsModalVisible(false)
      form.resetFields()
    } catch {
      message.error(t('medicine.createError'))
    }
  }

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page)
    if (size) {
      setPageSize(size)
    }
  }

  return (
    <MedicineListContainer>
      <MedicineHeader 
        onAdd={handleAdd}
        onSearch={handleSearch}
      />
      
      <MedicineTable
        medicines={medicines}
        loading={isLoadingMedicines}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        getNhomThuocText={getNhomThuocText}
        getNhomThuocColor={getNhomThuocColor}
      />

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} thuốc`}
          onChange={handlePageChange}
          onShowSizeChange={handlePageChange}
        />
      </div>

      <MedicineForm
        visible={isModalVisible}
        editingMedicine={editingMedicine}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
        form={form}
      />

      <DeleteMedicineModal
        visible={isDeleteModalVisible}
        medicine={deletingMedicine}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        loading={false}
      />
    </MedicineListContainer>
  )
} 