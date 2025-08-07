import React from 'react'
import { Input, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@/components/Button'
import { useLanguage } from '@/hooks/useLanguage'
import { SPACING } from '@/constants'

const { Search } = Input

interface MedicineHeaderProps {
  onAdd: () => void
  onSearch: (value: string) => void
}

export const MedicineHeader: React.FC<MedicineHeaderProps> = ({ onAdd, onSearch }) => {
  const { t } = useLanguage()

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: SPACING.MARGIN_MD 
    }}>
      <h2>{t('medicine.title')}</h2>
      <Space>
        <Search
          placeholder={t('medicine.searchMedicine')}
          allowClear
          onSearch={onSearch}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAdd}
        >
          {t('medicine.addMedicine')}
        </Button>
      </Space>
    </div>
  )
} 