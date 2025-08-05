import React from 'react'
import { Table, Tag, Button } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import { ActionButtons } from '../styled'

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

interface MedicineTableProps {
  medicines: Medicine[]
  onEdit: (medicine: Medicine) => void
  onDelete: (id: string) => void
  onView: (medicine: Medicine) => void
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
}

export const MedicineTable: React.FC<MedicineTableProps> = ({
  medicines,
  onEdit,
  onDelete,
  onView,
  getStatusColor,
  getStatusText
}) => {
  const { t } = useLanguage()

  const columns = [
    {
      title: t('medicine.medicineName'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('medicine.medicineCode'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('medicine.category'),
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: t('medicine.manufacturer'),
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: t('medicine.price'),
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: t('medicine.stock'),
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number, record: Medicine) => `${stock} ${record.unit}`,
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
      title: t('medicine.expiryDate'),
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: unknown, record: Medicine) => (
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
      dataSource={medicines}
      rowKey="id"
      pagination={{
        total: medicines.length,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => 
          `${range[0]}-${range[1]} ${t('common.of')} ${total} ${t('medicine.medicines')}`,
      }}
    />
  )
} 