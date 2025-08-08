import React from 'react'
import { Tag } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import type { BenhNhanResponse } from '@/types'
import { useLanguage } from '@/hooks/useLanguage'
import { DataTable } from '@/components'

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
      fixed: 'left' as const,
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
  ]

  const actions = [
    {
      key: 'view',
      icon: <EyeOutlined />,
      color: '#1890ff',
      onClick: (record: BenhNhanResponse) => onView(record)
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      color: '#52c41a',
      onClick: (record: BenhNhanResponse) => onEdit(record)
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      color: '#ff4d4f',
      onClick: (record: BenhNhanResponse) => onDelete(record.id)
    }
  ]

  return (
    <DataTable<BenhNhanResponse>
      dataSource={patients}
      loading={loading}
      columns={columns}
      actions={actions}
      scroll={{ x: 1200 }}
    />
  )
} 