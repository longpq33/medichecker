import React from 'react'
import { Table, Tag, Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import type { ThuocResponse } from '@/types'
import { useLanguage } from '@/hooks/useLanguage'

interface MedicineTableProps {
  medicines: ThuocResponse[]
  loading?: boolean
  onEdit: (medicine: ThuocResponse) => void
  onDelete: (id: number) => void
  onView: (medicine: ThuocResponse) => void
  getNhomThuocText: (nhomThuoc?: string) => string
  getNhomThuocColor: (nhomThuoc?: string) => string
}

export const MedicineTable: React.FC<MedicineTableProps> = ({
  medicines,
  loading = false,
  onEdit,
  onDelete,
  onView,
  getNhomThuocText,
  getNhomThuocColor
}) => {
  const { t } = useLanguage()

  const columns = [
    {
      title: t('medicine.drugCode'),
      dataIndex: 'maThuoc',
      key: 'maThuoc',
      width: 120,
      fixed: 'left' as const,
    },
    {
      title: t('medicine.drugName'),
      dataIndex: 'tenThuoc',
      key: 'tenThuoc',
      width: 250,
      sorter: (a: ThuocResponse, b: ThuocResponse) => a.tenThuoc.localeCompare(b.tenThuoc),
    },
    {
      title: t('medicine.activeIngredientName'),
      dataIndex: 'tenHoatChat',
      key: 'tenHoatChat',
      width: 180,
      ellipsis: true,
    },
    {
      title: t('medicine.concentrationValue'),
      dataIndex: 'nongDo',
      key: 'nongDo',
      width: 120,
    },
    {
      title: t('medicine.dosageFormType'),
      dataIndex: 'dangBaoChe',
      key: 'dangBaoChe',
      width: 140,
    },
    {
      title: t('medicine.manufacturerName'),
      dataIndex: 'hangSanXuat',
      key: 'hangSanXuat',
      width: 200,
      ellipsis: true,
    },
    {
      title: t('medicine.countryOfOrigin'),
      dataIndex: 'nuocSanXuat',
      key: 'nuocSanXuat',
      width: 140,
    },
    {
      title: t('medicine.priceValue'),
      dataIndex: 'giaBan',
      key: 'giaBan',
      width: 140,
      render: (giaBan?: number) => giaBan ? `${giaBan.toLocaleString()} VNĐ` : '-',
      sorter: (a: ThuocResponse, b: ThuocResponse) => (a.giaBan || 0) - (b.giaBan || 0),
    },
    {
      title: t('medicine.unitOfMeasurement'),
      dataIndex: 'donViTinh',
      key: 'donViTinh',
      width: 120,
    },
    {
      title: t('medicine.drugGroupType'),
      dataIndex: 'nhomThuoc',
      key: 'nhomThuoc',
      width: 140,
      render: (nhomThuoc?: string) => (
        <Tag color={getNhomThuocColor(nhomThuoc)}>
          {getNhomThuocText(nhomThuoc)}
        </Tag>
      ),
    },
    {
      title: t('medicine.isActive'),
      dataIndex: 'kichHoat',
      key: 'kichHoat',
      width: 100,
      render: (kichHoat: boolean) => (
        <Tag color={kichHoat ? 'green' : 'red'}>
          {kichHoat ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: t('medicine.createdAt'),
      dataIndex: 'ngayTao',
      key: 'ngayTao',
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: t('medicine.actions'),
      key: 'actions',
      width: 120,
      fixed: 'right' as const,
      render: (_: unknown, record: ThuocResponse) => (
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
      dataSource={medicines}
      rowKey="id"
      loading={loading}
      pagination={false}
      scroll={{ x: 1500 }}
    />
  )
} 