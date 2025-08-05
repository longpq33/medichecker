import React from 'react'
import { Row, Col, Statistic, Typography } from 'antd'
import {
  UserOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { StyledCard, StatCard } from './styled'

const { Title } = Typography

export const HomePage: React.FC = () => {
  return (
    <div>
      <StyledCard>
        <Title level={2}>Dashboard</Title>
        <p>Chào mừng bạn đến với hệ thống MediChecker</p>
      </StyledCard>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard>
            <Statistic
              title="Tổng số bệnh nhân"
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </StatCard>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatCard>
            <Statistic
              title="Thuốc trong kho"
              value={567}
              prefix={<MedicineBoxOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </StatCard>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatCard>
            <Statistic
              title="Lịch hẹn hôm nay"
              value={89}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </StatCard>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatCard>
            <Statistic
              title="Hồ sơ bệnh án"
              value={2341}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </StatCard>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <StyledCard title="Hoạt động gần đây">
            <p>Danh sách các hoạt động gần đây sẽ được hiển thị ở đây...</p>
          </StyledCard>
        </Col>
        
        <Col xs={24} lg={12}>
          <StyledCard title="Thống kê">
            <p>Biểu đồ thống kê sẽ được hiển thị ở đây...</p>
          </StyledCard>
        </Col>
      </Row>
    </div>
  )
} 