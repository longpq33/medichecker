import React from 'react'
import { Table, Tag, Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import type { BenhNhanResponse } from '@/types'
import { useLanguage } from '@/hooks/useLanguage'

interface PatientTableProps {
  patients: BenhNhanResponse[]
  loading?: boolean
  onEdit: (patient: BenhNhanResponse) => void
  onDelete: (id: number) => void
  onView: (patient: BenhNhanResponse) => void
  getGenderText: (gender?: string) => string
  getGenderColor: (gender?: string) => string
}

export const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  loading = false,
  onEdit,
  onDelete,
  onView,
  getGenderText,
  getGenderColor
}) => {
  const { t } = useLanguage()

  const columns = [
    {
      title: t('patient.patientCode'),
      dataIndex: 'maBenhNhan',
      key: 'maBenhNhan',
      width: 140,
    },
    {
      title: t('patient.fullName'),
      dataIndex: 'hoTen',
      key: 'hoTen',
      width: 200,
    },
    {
      title: t('common.phone'),
      dataIndex: 'soDienThoai',
      key: 'soDienThoai',
      width: 150,
    },
    {
      title: t('common.email'),
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: t('common.gender'),
      dataIndex: 'gioiTinh',
      key: 'gioiTinh',
      width: 120,
      render: (gender?: string) => (
        <Tag color={getGenderColor(gender)}>
          {getGenderText(gender)}
        </Tag>
      ),
    },
    {
      title: t('common.address'),
      dataIndex: 'diaChi',
      key: 'diaChi',
      width: 250,
      ellipsis: true,
    },
    {
      title: t('common.createdDate'),
      dataIndex: 'ngayTao',
      key: 'ngayTao',
      width: 140,
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      width: 140,
      render: (_: unknown, record: BenhNhanResponse) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => onView(record)}
            style={{ color: '#1890ff' }}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => onEdit(record)}
            style={{ color: '#52c41a' }}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => onDelete(record.id)}
            style={{ color: '#ff4d4f' }}
          />
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={patients}
      rowKey="id"
      loading={loading}
      pagination={false}
    />
  )
} 