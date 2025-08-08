import React from 'react'
import { Row, Col, Typography } from 'antd'
import {
  UserOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import { StatCard, InfoCard } from '@/components'
import { StyledCard } from './styled'

const { Title, Paragraph } = Typography

export const HomePage: React.FC = () => {
  const { t } = useLanguage()

  return (
    <div>
      <StyledCard>
        <Title level={2}>{t('dashboard.title')}</Title>
        <Paragraph>{t('dashboard.welcome')}</Paragraph>
      </StyledCard>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t('dashboard.totalPatients')}
            value={1234}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t('dashboard.medicinesInStock')}
            value={567}
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

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <InfoCard title={t('dashboard.recentActivities')}>
            <Paragraph>{t('dashboard.recentActivitiesPlaceholder')}</Paragraph>
          </InfoCard>
        </Col>
        
        <Col xs={24} lg={12}>
          <InfoCard title={t('dashboard.statistics')}>
            <Paragraph>{t('dashboard.statisticsPlaceholder')}</Paragraph>
          </InfoCard>
        </Col>
      </Row>
    </div>
  )
} 