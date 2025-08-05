import React from 'react'
import { Button, Input, Typography } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import { StyledCard } from '../styled'

const { Title } = Typography
const { Search } = Input

interface PatientHeaderProps {
  onAdd: () => void
  onSearch: (value: string) => void
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({
  onAdd,
  onSearch
}) => {
  const { t } = useLanguage()

  return (
    <StyledCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>{t('patient.title')}</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={onAdd}
        >
          {t('patient.addPatient')}
        </Button>
      </div>
      
      <Search
        placeholder={t('patient.searchPatient')}
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
        style={{ marginBottom: 16 }}
      />
    </StyledCard>
  )
} 