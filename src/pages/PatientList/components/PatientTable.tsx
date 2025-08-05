import React from 'react'
import { Table, Tag, Button } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import { ActionButtons } from '../styled'

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

interface PatientTableProps {
  patients: Patient[]
  onEdit: (patient: Patient) => void
  onDelete: (id: string) => void
  onView: (patient: Patient) => void
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
  getGenderText: (gender: string) => string
}

export const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onEdit,
  onDelete,
  onView,
  getStatusColor,
  getStatusText,
  getGenderText
}) => {
  const { t } = useLanguage()

  const columns = [
    {
      title: t('patient.patientName'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('common.phone'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('common.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('common.age'),
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: t('common.gender'),
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => (
        <Tag color={gender === 'male' ? 'blue' : 'pink'}>
          {getGenderText(gender)}
        </Tag>
      ),
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: unknown, record: Patient) => (
        <ActionButtons>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => onView(record)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => onEdit(record)}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            size="small"
            danger
            onClick={() => onDelete(record.id)}
          />
        </ActionButtons>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={patients}
      rowKey="id"
      pagination={{
        total: patients.length,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => 
          `${range[0]}-${range[1]} ${t('common.of')} ${total} ${t('patient.patients')}`,
      }}
    />
  )
} 