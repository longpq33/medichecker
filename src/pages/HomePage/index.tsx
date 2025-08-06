import React from 'react'
import { Row, Col, Statistic, Typography } from 'antd'
import {
  UserOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import { StyledCard, StatCard } from './styled'

const { Title, Paragraph } = Typography

export const HomePage: React.FC = () => {
  const { t } = useLanguage()

  return (
    <div >
      <StyledCard>
        <Title level={2}>{t('dashboard.title')}</Title>
        <Paragraph>{t('dashboard.welcome')}</Paragraph>
      </StyledCard>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard>
            <Statistic
              title={t('dashboard.totalPatients')}
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </StatCard>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatCard>
            <Statistic
              title={t('dashboard.medicinesInStock')}
              value={567}
              prefix={<MedicineBoxOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </StatCard>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatCard>
            <Statistic
              title={t('dashboard.todayAppointments')}
              value={89}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </StatCard>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatCard>
            <Statistic
              title={t('dashboard.medicalRecords')}
              value={2341}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </StatCard>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <StyledCard title={t('dashboard.recentActivities')}>
            <Paragraph>{t('dashboard.recentActivitiesPlaceholder')}</Paragraph>
          </StyledCard>
        </Col>
        
        <Col xs={24} lg={12}>
          <StyledCard title={t('dashboard.statistics')}>
            <Paragraph>{t('dashboard.statisticsPlaceholder')}</Paragraph>
          </StyledCard>
        </Col>
      </Row>
    </div>
  )
} 