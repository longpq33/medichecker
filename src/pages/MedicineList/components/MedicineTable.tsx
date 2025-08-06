import React from 'react'
import { Table, Tag, Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import type { ThuocResponse } from '@/types'

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
  const columns = [
    {
      title: 'Mã thuốc',
      dataIndex: 'maThuoc',
      key: 'maThuoc',
      width: 100,
      fixed: 'left' as const,
    },
    {
      title: 'Tên thuốc',
      dataIndex: 'tenThuoc',
      key: 'tenThuoc',
      width: 200,
      sorter: (a: ThuocResponse, b: ThuocResponse) => a.tenThuoc.localeCompare(b.tenThuoc),
    },
    {
      title: 'Hoạt chất',
      dataIndex: 'tenHoatChat',
      key: 'tenHoatChat',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Nồng độ',
      dataIndex: 'nongDo',
      key: 'nongDo',
      width: 100,
    },
    {
      title: 'Dạng bào chế',
      dataIndex: 'dangBaoChe',
      key: 'dangBaoChe',
      width: 120,
    },
    {
      title: 'Hãng sản xuất',
      dataIndex: 'hangSanXuat',
      key: 'hangSanXuat',
      width: 180,
      ellipsis: true,
    },
    {
      title: 'Nước sản xuất',
      dataIndex: 'nuocSanXuat',
      key: 'nuocSanXuat',
      width: 120,
    },
    {
      title: 'Giá bán',
      dataIndex: 'giaBan',
      key: 'giaBan',
      width: 120,
      render: (giaBan?: number) => giaBan ? `${giaBan.toLocaleString()} VNĐ` : '-',
      sorter: (a: ThuocResponse, b: ThuocResponse) => (a.giaBan || 0) - (b.giaBan || 0),
    },
    {
      title: 'Đơn vị tính',
      dataIndex: 'donViTinh',
      key: 'donViTinh',
      width: 100,
    },
    {
      title: 'Nhóm thuốc',
      dataIndex: 'nhomThuoc',
      key: 'nhomThuoc',
      width: 120,
      render: (nhomThuoc?: string) => (
        <Tag color={getNhomThuocColor(nhomThuoc)}>
          {getNhomThuocText(nhomThuoc)}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
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
      title: 'Ngày tạo',
      dataIndex: 'ngayTao',
      key: 'ngayTao',
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
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