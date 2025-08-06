import React from 'react'
import { Table, Tag, Button, Space, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'

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
      sorter: (a: Medicine, b: Medicine) => a.name.localeCompare(b.name),
    },
    {
      title: t('medicine.medicineCode'),
      dataIndex: 'code',
      key: 'code',
      width: 120,
    },
    {
      title: t('medicine.category'),
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },
    {
      title: t('medicine.manufacturer'),
      dataIndex: 'manufacturer',
      key: 'manufacturer',
      width: 200,
      ellipsis: true,
    },
    {
      title: t('medicine.price'),
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price: number) => `${price.toLocaleString()} VNĐ`,
      sorter: (a: Medicine, b: Medicine) => a.price - b.price,
    },
    {
      title: t('medicine.stock'),
      dataIndex: 'stock',
      key: 'stock',
      width: 100,
      render: (stock: number, record: Medicine) => `${stock} ${record.unit}`,
      sorter: (a: Medicine, b: Medicine) => a.stock - b.stock,
    },
    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
      filters: [
        { text: t('medicine.available'), value: 'available' },
        { text: t('medicine.outOfStock'), value: 'out_of_stock' },
        { text: t('medicine.discontinued'), value: 'discontinued' },
      ],
      onFilter: (value: boolean | React.Key, record: Medicine) => record.status === value,
    },
    {
      title: t('medicine.expiryDate'),
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
      sorter: (a: Medicine, b: Medicine) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime(),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      width: 120,
      fixed: 'right' as const,
      render: (_: unknown, record: Medicine) => (
        <Space size="small">
          <Tooltip title={t('common.view')}>
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => onView(record)}
            />
          </Tooltip>
          <Tooltip title={t('common.edit')}>
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title={t('common.delete')}>
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              size="small"
              danger
              onClick={() => onDelete(record.id)}
            />
          </Tooltip>
        </Space>
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
      scroll={{ x: 1200 }}
      size="middle"
    />
  )
} 