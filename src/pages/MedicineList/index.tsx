import React, { useState, useEffect } from 'react'
import { 
  Modal,
  Form,
  message,
  Pagination
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { MedicineForm, MedicineTable, MedicineHeader } from './components'
import type { ThuocResponse } from '@/types'
import { MedicineListContainer } from './styled'

// Mock data cho development
const mockMedicines: ThuocResponse[] = [
  {
    id: 1,
    maThuoc: 'TH001',
    tenThuoc: 'Paracetamol 500mg',
    tenHoatChat: 'Paracetamol',
    nongDo: '500mg',
    dangBaoChe: 'Viên nén',
    hangSanXuat: 'Công ty Dược phẩm A',
    nuocSanXuat: 'Việt Nam',
    giaBan: 5000,
    donViTinh: 'Viên',
    chiDinh: 'Giảm đau, hạ sốt',
    chongChiDinh: 'Dị ứng với Paracetamol',
    nhomThuoc: 'GIAM_DAU',
    kichHoat: true,
    ngayTao: '2024-01-15T10:00:00'
  },
  {
    id: 2,
    maThuoc: 'TH002',
    tenThuoc: 'Amoxicillin 250mg',
    tenHoatChat: 'Amoxicillin',
    nongDo: '250mg',
    dangBaoChe: 'Viên nang',
    hangSanXuat: 'Công ty Dược phẩm B',
    nuocSanXuat: 'Việt Nam',
    giaBan: 15000,
    donViTinh: 'Viên',
    chiDinh: 'Điều trị nhiễm khuẩn',
    chongChiDinh: 'Dị ứng với Penicillin',
    nhomThuoc: 'KHANG_SINH',
    kichHoat: true,
    ngayTao: '2024-01-16T14:30:00'
  },
  {
    id: 3,
    maThuoc: 'TH003',
    tenThuoc: 'Vitamin C 1000mg',
    tenHoatChat: 'Ascorbic Acid',
    nongDo: '1000mg',
    dangBaoChe: 'Viên sủi',
    hangSanXuat: 'Công ty Dược phẩm C',
    nuocSanXuat: 'Việt Nam',
    giaBan: 8000,
    donViTinh: 'Viên',
    chiDinh: 'Bổ sung vitamin C',
    chongChiDinh: 'Không có',
    nhomThuoc: 'KHAC',
    kichHoat: true,
    ngayTao: '2024-01-17T09:15:00'
  },
  {
    id: 4,
    maThuoc: 'TH004',
    tenThuoc: 'Ibuprofen 400mg',
    tenHoatChat: 'Ibuprofen',
    nongDo: '400mg',
    dangBaoChe: 'Viên nén',
    hangSanXuat: 'Công ty Dược phẩm D',
    nuocSanXuat: 'Việt Nam',
    giaBan: 12000,
    donViTinh: 'Viên',
    chiDinh: 'Giảm đau, chống viêm',
    chongChiDinh: 'Loét dạ dày',
    nhomThuoc: 'CHONG_VIEM',
    kichHoat: true,
    ngayTao: '2024-01-18T11:45:00'
  },
  {
    id: 5,
    maThuoc: 'TH005',
    tenThuoc: 'Amlodipine 5mg',
    tenHoatChat: 'Amlodipine',
    nongDo: '5mg',
    dangBaoChe: 'Viên nén',
    hangSanXuat: 'Công ty Dược phẩm E',
    nuocSanXuat: 'Việt Nam',
    giaBan: 25000,
    donViTinh: 'Viên',
    chiDinh: 'Điều trị tăng huyết áp',
    chongChiDinh: 'Suy tim nặng',
    nhomThuoc: 'TIM_MACH',
    kichHoat: true,
    ngayTao: '2024-01-19T16:20:00'
  }
]

export const MedicineList: React.FC = () => {
  const [medicines, setMedicines] = useState<ThuocResponse[]>(mockMedicines)
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState<ThuocResponse | null>(null)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(mockMedicines.length)

  // Fetch medicines (using mock data for now)
  const fetchMedicines = async (page: number = 1, size: number = 10, keyword?: string) => {
    try {
      setLoading(true)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let filteredData = mockMedicines
      if (keyword) {
        filteredData = mockMedicines.filter(medicine =>
          medicine.tenThuoc.toLowerCase().includes(keyword.toLowerCase()) ||
          medicine.maThuoc.toLowerCase().includes(keyword.toLowerCase()) ||
          medicine.tenHoatChat?.toLowerCase().includes(keyword.toLowerCase())
        )
      }
      
      const startIndex = (page - 1) * size
      const endIndex = startIndex + size
      const paginatedData = filteredData.slice(startIndex, endIndex)
      
      setMedicines(paginatedData)
      setTotal(filteredData.length)
      setCurrentPage(page)
      setPageSize(size)
    } catch (error) {
      message.error('Lỗi khi tải danh sách thuốc')
      console.error('Error fetching medicines:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedicines()
  }, [])

  const getNhomThuocText = (nhomThuoc?: string) => {
    switch (nhomThuoc) {
      case 'KHANG_SINH':
        return 'Kháng sinh'
      case 'GIAM_DAU':
        return 'Giảm đau'
      case 'CHONG_VIEM':
        return 'Chống viêm'
      case 'TIM_MACH':
        return 'Tim mạch'
      case 'TIEU_HOA':
        return 'Tiêu hóa'
      case 'HOI_SUC':
        return 'Hồi sức'
      case 'KHAC':
        return 'Khác'
      default:
        return 'Chưa phân loại'
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
    fetchMedicines(1, pageSize, value)
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
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa thuốc này?',
      onOk: async () => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500))
          setMedicines(medicines.filter(m => m.id !== id))
          message.success('Xóa thuốc thành công')
          fetchMedicines(currentPage, pageSize, searchText)
        } catch (error) {
          message.error('Lỗi khi xóa thuốc')
          console.error('Error deleting medicine:', error)
        }
      },
    })
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingMedicine) {
        // Update existing medicine
        await new Promise(resolve => setTimeout(resolve, 500))
        const updatedMedicine = { ...editingMedicine, ...values }
        setMedicines(medicines.map(m => m.id === editingMedicine.id ? updatedMedicine : m))
        message.success('Cập nhật thuốc thành công')
      } else {
        // Add new medicine
        await new Promise(resolve => setTimeout(resolve, 500))
        const newMedicine: ThuocResponse = {
          id: Date.now(),
          maThuoc: `TH${String(Date.now()).slice(-3)}`,
          ...values,
          kichHoat: true,
          ngayTao: new Date().toISOString()
        }
        setMedicines([newMedicine, ...medicines])
        message.success('Thêm thuốc thành công')
      }
      setIsModalVisible(false)
      form.resetFields()
      fetchMedicines(currentPage, pageSize, searchText)
    } catch (error) {
      message.error('Lỗi khi lưu thuốc')
      console.error('Error saving medicine:', error)
    }
  }

  const handlePageChange = (page: number, size?: number) => {
    fetchMedicines(page, size || pageSize, searchText)
  }

  return (
    <MedicineListContainer>
      <MedicineHeader 
        onAdd={handleAdd}
        onSearch={handleSearch}
      />
      
      <MedicineTable
        medicines={medicines}
        loading={loading}
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
    </MedicineListContainer>
  )
} 