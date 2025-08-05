import React, { useState } from 'react'
import { 
  Modal,
  Form
} from 'antd'
import { useLanguage } from '@/hooks/useLanguage'
import { PatientForm, PatientTable, PatientHeader } from './components'

interface Patient {
  id: string
  name: string
  phone: string
  email: string
  age: number
  gender: 'male' | 'female' | 'other'
  address: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    phone: '0123456789',
    email: 'nguyenvana@email.com',
    age: 35,
    gender: 'male',
    address: 'Hà Nội',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    phone: '0987654321',
    email: 'tranthib@email.com',
    age: 28,
    gender: 'female',
    address: 'TP.HCM',
    status: 'active',
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Lê Văn C',
    phone: '0555666777',
    email: 'levanc@email.com',
    age: 45,
    gender: 'male',
    address: 'Đà Nẵng',
    status: 'inactive',
    createdAt: '2024-01-05',
  },
]

export const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients)
  const [searchText, setSearchText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [form] = Form.useForm()
  const { t } = useLanguage()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'inactive':
        return 'red'
      case 'pending':
        return 'orange'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return t('common.active')
      case 'inactive':
        return t('common.inactive')
      case 'pending':
        return t('common.pending')
      default:
        return status
    }
  }

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male':
        return t('common.male')
      case 'female':
        return t('common.female')
      case 'other':
        return t('common.other')
      default:
        return gender
    }
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const handleAdd = () => {
    setEditingPatient(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient)
    form.setFieldsValue(patient)
    setIsModalVisible(true)
  }

  const handleView = (patient: Patient) => {
    // Navigate to patient detail page
    window.location.href = `/patients/${patient.id}`
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: t('messages.confirmDelete'),
      content: t('patient.deleteConfirm'),
      onOk: () => {
        setPatients(patients.filter(p => p.id !== id))
      },
    })
  }

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingPatient) {
        // Update existing patient
        setPatients(patients.map(p => 
          p.id === editingPatient.id ? { ...p, ...values } : p
        ))
      } else {
        // Add new patient
        const newPatient: Patient = {
          id: Date.now().toString(),
          ...values,
          createdAt: new Date().toISOString().split('T')[0],
        }
        setPatients([...patients, newPatient])
      }
      setIsModalVisible(false)
      form.resetFields()
    })
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchText.toLowerCase()) ||
    patient.phone.includes(searchText) ||
    patient.email.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div>
      <PatientHeader 
        onAdd={handleAdd}
        onSearch={handleSearch}
      />
      
      <PatientTable
        patients={filteredPatients}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
        getGenderText={getGenderText}
      />

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