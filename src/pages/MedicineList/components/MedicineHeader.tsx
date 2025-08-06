import React from 'react'
import { Input, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@/components/Button'
import { SPACING } from '@/constants'

const { Search } = Input

interface MedicineHeaderProps {
  onAdd: () => void
  onSearch: (value: string) => void
}

export const MedicineHeader: React.FC<MedicineHeaderProps> = ({ onAdd, onSearch }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: SPACING.MARGIN_MD 
    }}>
      <h2>Quản lý thuốc</h2>
      <Space>
        <Search
          placeholder="Tìm kiếm thuốc..."
          allowClear
          onSearch={onSearch}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAdd}
        >
          Thêm thuốc mới
        </Button>
      </Space>
    </div>
  )
} 