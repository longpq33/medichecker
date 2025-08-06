import React, { useState, useEffect } from 'react'
import { 
  Modal,
  Form,
  message,
  Pagination
} from 'antd'
import { PatientForm, PatientTable, PatientHeader } from './components'
import type { BenhNhanResponse } from '@/types'
import dayjs from 'dayjs'

// Mock data cho development
const mockPatients: BenhNhanResponse[] = [
  {
    id: 1,
    maBenhNhan: 'BN001',
    hoTen: 'Nguyễn Văn An',
    ngaySinh: '1990-05-15',
    gioiTinh: 'NAM',
    soDienThoai: '0123456789',
    email: 'nguyenvanan@email.com',
    diaChi: '123 Đường ABC, Quận 1, TP.HCM',
    soBaoHiem: 'BH001234567',
    ngayTao: '2024-01-15T10:00:00',
    ngayCapNhat: '2024-01-15T10:00:00'
  },
  {
    id: 2,
    maBenhNhan: 'BN002',
    hoTen: 'Trần Thị Bình',
    ngaySinh: '1985-08-22',
    gioiTinh: 'NU',
    soDienThoai: '0987654321',
    email: 'tranthibinh@email.com',
    diaChi: '456 Đường XYZ, Quận 2, TP.HCM',
    soBaoHiem: 'BH098765432',
    ngayTao: '2024-01-16T14:30:00',
    ngayCapNhat: '2024-01-16T14:30:00'
  },
  {
    id: 3,
    maBenhNhan: 'BN003',
    hoTen: 'Lê Văn Cường',
    ngaySinh: '1978-12-10',
    gioiTinh: 'NAM',
    soDienThoai: '0555666777',
    email: 'levancuong@email.com',
    diaChi: '789 Đường DEF, Quận 3, TP.HCM',
    soBaoHiem: 'BH055566677',
    ngayTao: '2024-01-17T09:15:00',
    ngayCapNhat: '2024-01-17T09:15:00'
  },
  {
    id: 4,
    maBenhNhan: 'BN004',
    hoTen: 'Phạm Thị Dung',
    ngaySinh: '1992-03-25',
    gioiTinh: 'NU',
    soDienThoai: '0333444555',
    email: 'phamthidung@email.com',
    diaChi: '321 Đường GHI, Quận 4, TP.HCM',
    soBaoHiem: 'BH033344455',
    ngayTao: '2024-01-18T11:45:00',
    ngayCapNhat: '2024-01-18T11:45:00'
  },
  {
    id: 5,
    maBenhNhan: 'BN005',
    hoTen: 'Hoàng Văn Em',
    ngaySinh: '1988-07-08',
    gioiTinh: 'NAM',
    soDienThoai: '0777888999',
    email: 'hoangvanem@email.com',
    diaChi: '654 Đường JKL, Quận 5, TP.HCM',
    soBaoHiem: 'BH077788899',
    ngayTao: '2024-01-19T16:20:00',
    ngayCapNhat: '2024-01-19T16:20:00'
  }
]

export const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<BenhNhanResponse[]>(mockPatients)
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingPatient, setEditingPatient] = useState<BenhNhanResponse | null>(null)
  const [form] = Form.useForm()
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(mockPatients.length)

  // Fetch patients (using mock data for now)
  const fetchPatients = async (page: number = 1, size: number = 10, keyword?: string) => {
    try {
      setLoading(true)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let filteredData = mockPatients
      if (keyword) {
        filteredData = mockPatients.filter(patient =>
          patient.hoTen.toLowerCase().includes(keyword.toLowerCase()) ||
          patient.maBenhNhan.toLowerCase().includes(keyword.toLowerCase()) ||
          patient.soDienThoai?.includes(keyword) ||
          patient.email?.toLowerCase().includes(keyword.toLowerCase())
        )
      }
      
      const startIndex = (page - 1) * size
      const endIndex = startIndex + size
      const paginatedData = filteredData.slice(startIndex, endIndex)
      
      setPatients(paginatedData)
      setTotal(filteredData.length)
      setCurrentPage(page)
      setPageSize(size)
    } catch (error) {
      message.error('Lỗi khi tải danh sách bệnh nhân')
      console.error('Error fetching patients:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const getGenderText = (gender?: string) => {
    switch (gender) {
      case 'NAM':
        return 'Nam'
      case 'NU':
        return 'Nữ'
      case 'KHAC':
        return 'Khác'
      default:
        return 'Chưa xác định'
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

  const handleSearch = (value: string) => {
    setSearchText(value)
    fetchPatients(1, pageSize, value)
  }

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

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa bệnh nhân này?',
      onOk: async () => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500))
          setPatients(patients.filter(p => p.id !== id))
          message.success('Xóa bệnh nhân thành công')
          fetchPatients(currentPage, pageSize, searchText)
        } catch (error) {
          message.error('Lỗi khi xóa bệnh nhân')
          console.error('Error deleting patient:', error)
        }
      },
    })
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingPatient) {
        // Update existing patient
        await new Promise(resolve => setTimeout(resolve, 500))
        const updatedPatient = { ...editingPatient, ...values }
        setPatients(patients.map(p => p.id === editingPatient.id ? updatedPatient : p))
        message.success('Cập nhật bệnh nhân thành công')
      } else {
        // Add new patient
        await new Promise(resolve => setTimeout(resolve, 500))
        const newPatient: BenhNhanResponse = {
          id: Date.now(),
          maBenhNhan: `BN${String(Date.now()).slice(-3)}`,
          ...values,
          ngayTao: new Date().toISOString(),
          ngayCapNhat: new Date().toISOString()
        }
        setPatients([newPatient, ...patients])
        message.success('Thêm bệnh nhân thành công')
      }
      setIsModalVisible(false)
      form.resetFields()
      fetchPatients(currentPage, pageSize, searchText)
    } catch (error) {
      message.error('Lỗi khi lưu bệnh nhân')
      console.error('Error saving patient:', error)
    }
  }

  const handlePageChange = (page: number, size?: number) => {
    fetchPatients(page, size || pageSize, searchText)
  }

  return (
    <div>
      <PatientHeader 
        onAdd={handleAdd}
        onSearch={handleSearch}
      />
      
      <PatientTable
        patients={patients}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        getGenderText={getGenderText}
        getGenderColor={getGenderColor}
      />

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} bệnh nhân`}
          onChange={handlePageChange}
          onShowSizeChange={handlePageChange}
        />
      </div>

      <PatientForm
        visible={isModalVisible}
        editingPatient={editingPatient}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
        form={form}
      />
    </div>
  )
} 