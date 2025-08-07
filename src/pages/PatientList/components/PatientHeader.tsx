import React from 'react'
import { Input, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@/components/Button'
import { useLanguage } from '@/hooks/useLanguage'
import { SPACING } from '@/constants'

const { Search } = Input

interface PatientHeaderProps {
  onAdd: () => void
  onSearch: (value: string) => void
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({ onAdd, onSearch }) => {
  const { t } = useLanguage()

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: SPACING.MARGIN_MD 
    }}>
      <h2>{t('patient.title')}</h2>
      <Space>
        <Search
          placeholder={t('patient.searchPatient')}
          allowClear
          onSearch={onSearch}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAdd}
        >
          {t('patient.addPatient')}
        </Button>
      </Space>
    </div>
  )
} 