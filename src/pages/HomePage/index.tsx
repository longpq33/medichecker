import React from 'react'
import { Row, Col, Typography, Card, Space } from 'antd'
import {
  UserOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import { usePatients, useMedicines } from '@/hooks'
import { StatCard } from '@/components'
import { StyledCard } from './styled'

const { Title, Paragraph, Text } = Typography

export const HomePage: React.FC = () => {
  const { t } = useLanguage()

  // Lấy dữ liệu bệnh nhân và thuốc cho dashboard
  const { patientsData } = usePatients({ page: 0, size: 1 }, '')
  const { medicinesData } = useMedicines({ page: 0, size: 1 }, '')

  // Tính tổng số bệnh nhân và thuốc
  const totalPatients = patientsData?.totalElements || 0
  const totalMedicines = medicinesData?.totalElements || 0

  return (
    <div>
      <StyledCard>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space align="center" size="large">
            <img 
              src="/medichecker-favicon.svg" 
              alt="MediChecker Logo" 
              style={{ 
                width: '64px', 
                height: '64px',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }} 
            />
            <div>
              <Title level={1} style={{ margin: 0, color: '#1890ff' }}>
                MediChecker
              </Title>
              <Title level={3} style={{ margin: 0, fontWeight: 'normal', color: '#666' }}>
                {t('dashboard.subtitle')}
              </Title>
            </div>
          </Space>
        </Space>
      </StyledCard>

      {/* Mô tả dự án */}
      <Card 
        style={{ marginBottom: '24px' }}
        title={
          <span>
            <InfoCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
            {t('dashboard.projectDescription')}
          </span>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div>
              <Title level={4}>{t('dashboard.whatIsMediChecker')}</Title>
              <Paragraph>
                {t('dashboard.medicheckerDescription')}
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div>
              <Title level={4}>{t('dashboard.keyFeatures')}</Title>
              <ul style={{ paddingLeft: '20px' }}>
                <li><Text>{t('dashboard.feature1')}</Text></li>
                <li><Text>{t('dashboard.feature2')}</Text></li>
                <li><Text>{t('dashboard.feature3')}</Text></li>
                <li><Text>{t('dashboard.feature4')}</Text></li>
              </ul>
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t('dashboard.totalPatients')}
            value={totalPatients}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t('dashboard.medicinesInStock')}
            value={totalMedicines}
            prefix={<MedicineBoxOutlined />}
            valueStyle={{ color: '#52c41a' }}
          />
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t('dashboard.todayAppointments')}
            value={89}
            prefix={<CalendarOutlined />}
            valueStyle={{ color: '#faad14' }}
          />
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t('dashboard.medicalRecords')}
            value={2341}
            prefix={<FileTextOutlined />}
            valueStyle={{ color: '#f5222d' }}
          />
        </Col>
      </Row>
    </div>
  )
} 