import React from 'react'
import { Card, Row, Col, Tag, Space, Typography } from 'antd'
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CalendarOutlined,
  AlertOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import styled from 'styled-components'
import { SPACING, BORDER_RADIUS, COLORS } from '@/constants'
import { useLanguage } from '@/hooks/useLanguage'
import dayjs from 'dayjs'

const { Text } = Typography

const StyledCard = styled(Card)`
  margin-bottom: ${SPACING.MARGIN_MD};
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  
  .ant-card-head {
    border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
    padding: ${SPACING.PADDING_MD} ${SPACING.PADDING_LG};
  }
  
  .ant-card-head-title {
    font-size: 16px;
    font-weight: 600;
    color: ${COLORS.TEXT_PRIMARY};
  }
  
  .ant-card-body {
    padding: ${SPACING.PADDING_LG};
  }
`

interface PatientInfoProps {
  patient: {
    hoTen?: string
    ngaySinh?: string
    gioiTinh?: string
    soDienThoai?: string
    email?: string
    diaChi?: string
    danhSachDiUng?: string[]
    danhSachBenhLyNen?: string[]
  }
  loading?: boolean
}

export const PatientInfo: React.FC<PatientInfoProps> = ({
  patient,
  loading = false
}) => {
  const { t } = useLanguage()

  const calculateAge = (dateOfBirth?: string) => {
    if (!dateOfBirth) return null
    const birthDate = dayjs(dateOfBirth)
    if (!birthDate.isValid()) return null
    return dayjs().diff(birthDate, 'year')
  }

  const age = calculateAge(patient?.ngaySinh)

  const getGenderText = (gender?: string) => {
    switch (gender) {
      case 'NAM':
        return t('common.male')
      case 'NU':
        return t('common.female')
      case 'KHAC':
        return t('common.other')
      default:
        return gender || ''
    }
  }

  const getGenderColor = (gender?: string) => {
    switch (gender) {
      case 'NAM':
        return 'blue'
      case 'NU':
        return 'pink'
      case 'KHAC':
        return 'orange'
      default:
        return 'default'
    }
  }

  if (loading) {
    return (
      <StyledCard>
        <div>Đang tải...</div>
      </StyledCard>
    )
  }

  return (
    <StyledCard
      title={
        <Space>
          <UserOutlined />
          {t('patient.basicInfo')}
        </Space>
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div style={{ marginBottom: 16 }}>
            <Text strong style={{ fontSize: 16 }}>
              {patient.hoTen || '---'}
            </Text>
            {age && (
              <Text type="secondary" style={{ marginLeft: 8 }}>
                ({age} {t('common.years')})
              </Text>
            )}
          </div>
        </Col>
        
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <PhoneOutlined style={{ marginRight: 8, color: COLORS.TEXT_SECONDARY }} />
              <Text>{patient.soDienThoai || '---'}</Text>
            </div>
            
            <div>
              <MailOutlined style={{ marginRight: 8, color: COLORS.TEXT_SECONDARY }} />
              <Text>{patient.email || '---'}</Text>
            </div>
            
            <div>
              <HomeOutlined style={{ marginRight: 8, color: COLORS.TEXT_SECONDARY }} />
              <Text>{patient.diaChi || '---'}</Text>
            </div>
            
            <div>
              <CalendarOutlined style={{ marginRight: 8, color: COLORS.TEXT_SECONDARY }} />
              <Tag color={getGenderColor(patient.gioiTinh)}>
                {getGenderText(patient.gioiTinh)}
              </Tag>
            </div>
          </Space>
        </Col>
      </Row>

      {/* Dị ứng */}
      {patient.danhSachDiUng && patient.danhSachDiUng.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 8 }}>
            <AlertOutlined style={{ marginRight: 8, color: '#faad14' }} />
            <Text strong>{t('patient.allergies')}:</Text>
          </div>
          <div>
            {patient.danhSachDiUng.map((allergy, index) => (
              <Tag key={index} color="orange" style={{ marginBottom: 4 }}>
                {allergy}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {/* Bệnh lý nền */}
      {patient.danhSachBenhLyNen && patient.danhSachBenhLyNen.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 8 }}>
            <FileTextOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            <Text strong>{t('patient.medicalHistory')}:</Text>
          </div>
          <div>
            {patient.danhSachBenhLyNen.map((condition, index) => (
              <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
                {condition}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </StyledCard>
  )
} 