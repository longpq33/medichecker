import React from 'react'
import { Input, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@/components/Button'
import { SPACING } from '@/constants'

const { Search } = Input

interface PatientHeaderProps {
  onAdd: () => void
  onSearch: (value: string) => void
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({ onAdd, onSearch }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: SPACING.MARGIN_MD 
    }}>
      <h2>Quản lý bệnh nhân</h2>
      <Space>
        <Search
          placeholder="Tìm kiếm bệnh nhân..."
          allowClear
          onSearch={onSearch}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAdd}
        >
          Thêm bệnh nhân mới
        </Button>
      </Space>
    </div>
  )
} 