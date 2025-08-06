import React from 'react'
import { Table, Tag, Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import type { BenhNhanResponse } from '@/types'

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
  const columns = [
    {
      title: 'Mã BN',
      dataIndex: 'maBenhNhan',
      key: 'maBenhNhan',
      width: 120,
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDienThoai',
      key: 'soDienThoai',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioiTinh',
      key: 'gioiTinh',
      render: (gender?: string) => (
        <Tag color={getGenderColor(gender)}>
          {getGenderText(gender)}
        </Tag>
      ),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi',
      ellipsis: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngayTao',
      key: 'ngayTao',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 120,
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