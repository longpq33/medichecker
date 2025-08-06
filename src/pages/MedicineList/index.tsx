import React, { useState } from 'react'
import { 
  Modal,
  Form,
  Card,
  message
} from 'antd'
import { useLanguage } from '@/hooks/useLanguage'
import { useNavigate } from 'react-router-dom'
import { MedicineForm, MedicineTable, MedicineHeader } from './components'

interface Medicine {
  id: string
  name: string
  code: string
  category: string
  manufacturer: string
  price: number
  stock: number
  unit: string
  status: 'available' | 'out_of_stock' | 'discontinued'
  expiryDate: string
}

const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    code: 'MED001',
    category: 'Thuốc giảm đau',
    manufacturer: 'Công ty Dược phẩm A',
    price: 5000,
    stock: 100,
    unit: 'Viên',
    status: 'available',
    expiryDate: '2025-12-31',
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    code: 'MED002',
    category: 'Thuốc kháng sinh',
    manufacturer: 'Công ty Dược phẩm B',
    price: 15000,
    stock: 50,
    unit: 'Viên',
    status: 'available',
    expiryDate: '2025-06-30',
  },
  {
    id: '3',
    name: 'Vitamin C 1000mg',
    code: 'MED003',
    category: 'Vitamin',
    manufacturer: 'Công ty Dược phẩm C',
    price: 8000,
    stock: 0,
    unit: 'Viên',
    status: 'out_of_stock',
    expiryDate: '2025-03-15',
  },
]

export const MedicineList: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines)
  const [searchText, setSearchText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null)
  const [form] = Form.useForm()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'green'
      case 'out_of_stock':
        return 'red'
      case 'discontinued':
        return 'orange'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return t('medicine.available')
      case 'out_of_stock':
        return t('medicine.outOfStock')
      case 'discontinued':
        return t('medicine.discontinued')
      default:
        return status
    }
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const handleAdd = () => {
    setEditingMedicine(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (medicine: Medicine) => {
    setEditingMedicine(medicine)
    form.setFieldsValue({
      ...medicine,
      expiryDate: medicine.expiryDate ? new Date(medicine.expiryDate) : null
    })
    setIsModalVisible(true)
  }

  const handleView = (medicine: Medicine) => {
    // Navigate to medicine detail page
    navigate(`/medicines/${medicine.id}`)
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: t('messages.confirmDelete'),
      content: t('medicine.deleteConfirm'),
      okText: t('common.save'),
      cancelText: t('common.cancel'),
      onOk: () => {
        setMedicines(medicines.filter(m => m.id !== id))
        message.success(t('medicine.deleteSuccess'))
      },
    })
  }

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingMedicine) {
        // Update existing medicine
        setMedicines(medicines.map(m => 
          m.id === editingMedicine.id ? { ...m, ...values } : m
        ))
        message.success(t('medicine.updateSuccess'))
      } else {
        // Add new medicine
        const newMedicine: Medicine = {
          id: Date.now().toString(),
          ...values,
          expiryDate: values.expiryDate ? values.expiryDate.toISOString().split('T')[0] : '',
        }
        setMedicines([...medicines, newMedicine])
        message.success(t('medicine.createSuccess'))
      }
      setIsModalVisible(false)
      form.resetFields()
    }).catch(() => {
      message.error(t('medicine.createError'))
    })
  }

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchText.toLowerCase()) ||
    medicine.code.toLowerCase().includes(searchText.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchText.toLowerCase()) ||
    medicine.manufacturer.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div style={{ padding: '24px' }}>
      <MedicineHeader 
        onAdd={handleAdd}
        onSearch={handleSearch}
      />
      
      <Card style={{ marginTop: '16px' }}>
        <MedicineTable
          medicines={filteredMedicines}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />
      </Card>

      <MedicineForm
        visible={isModalVisible}
        editingMedicine={editingMedicine}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
        form={form}
      />
    </div>
  )
} 