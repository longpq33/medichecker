import React from 'react'
import { Card, Row, Col, Tag, Space, Typography, Statistic } from 'antd'
import {
  MedicineBoxOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  InfoCircleOutlined,
  FileTextOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import styled from 'styled-components'
import { SPACING, BORDER_RADIUS, COLORS } from '@/constants'
import { useLanguage } from '@/hooks/useLanguage'

const { Text } = Typography

const StyledCard = styled(Card)<{ theme?: any }>`
  margin-bottom: ${SPACING.MARGIN_MD};
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  border: 1px solid ${props => props.theme?.borderPrimary || COLORS.BORDER_PRIMARY};
  background: ${props => props.theme?.cardBg || 'transparent'};
  
  .ant-card-head {
    border-bottom: 1px solid ${props => props.theme?.borderSecondary || COLORS.BORDER_SECONDARY};
    padding: ${SPACING.PADDING_MD} ${SPACING.PADDING_LG};
  }
  
  .ant-card-head-title {
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme?.textPrimary || COLORS.TEXT_PRIMARY};
  }
  
  .ant-card-body {
    padding: ${SPACING.PADDING_LG};
  }
`

interface Medicine {
  id: string
  thuocId: number
  name: string
  soLuong: number
  lieuDung: string
  duongDung: string
  tanSuat: string
  thoiGianDung: string
  huongDanSuDung?: string
  giaDonVi: number
  thanhTien: number
}

interface MedicineInfoProps {
  medicines: Medicine[]
  loading?: boolean
}

export const MedicineInfo: React.FC<MedicineInfoProps> = ({
  medicines,
  loading = false
}) => {
  const { t } = useLanguage()

  if (loading) {
    return (
      <StyledCard>
        <div>{t('common.loading')}</div>
      </StyledCard>
    )
  }

  if (!medicines || medicines.length === 0) {
    return (
      <StyledCard
        title={
          <Space>
            <MedicineBoxOutlined />
            {t('treatment.medicineInfo')}
          </Space>
        }
      >
        <div style={{ textAlign: 'center', color: COLORS.TEXT_SECONDARY }}>
          {t('treatment.noMedicineSelected')}
        </div>
      </StyledCard>
    )
  }

  // Tính toán tổng quan
  const totalMedicines = medicines.length
  const totalQuantity = medicines.reduce((sum, med) => sum + med.soLuong, 0)
  const totalCost = medicines.reduce((sum, med) => sum + med.thanhTien, 0)
  const hasInstructions = medicines.some(med => med.huongDanSuDung)

  // Nhóm thuốc theo đường dùng
  const medicinesByRoute = medicines.reduce((acc, med) => {
    const route = med.duongDung || 'Khác'
    if (!acc[route]) acc[route] = []
    acc[route].push(med)
    return acc
  }, {} as Record<string, Medicine[]>)

  return (
    <StyledCard
      title={
        <Space>
          <MedicineBoxOutlined />
          {t('treatment.medicineInfo')}
        </Space>
      }
    >
      {/* Thống kê tổng quan */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Statistic
            title={t('treatment.totalMedicines')}
            value={totalMedicines}
            prefix={<MedicineBoxOutlined />}
            valueStyle={{ fontSize: 20, color: COLORS.PRIMARY }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={t('treatment.totalQuantity')}
            value={totalQuantity}
            prefix={<ShoppingCartOutlined />}
            valueStyle={{ fontSize: 20, color: COLORS.SUCCESS }}
          />
        </Col>
        <Col span={24}>
          <Statistic
            title={t('treatment.totalCost')}
            value={totalCost}
            prefix={<DollarOutlined />}
            suffix="₫"
            valueStyle={{ fontSize: 24, color: COLORS.WARNING }}
          />
        </Col>
      </Row>

      {/* Danh sách thuốc theo đường dùng */}
      {Object.entries(medicinesByRoute).map(([route, routeMedicines]) => (
        <div key={route} style={{ marginBottom: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <ClockCircleOutlined style={{ marginRight: 8, color: COLORS.PRIMARY }} />
            <Text strong style={{ color: COLORS.PRIMARY }}>
              {route}
            </Text>
            <Tag color="blue" style={{ marginLeft: 8 }}>
              {routeMedicines.length} {t('treatment.medicines')}
            </Tag>
          </div>
          
          <Space direction="vertical" style={{ width: '100%' }}>
            {routeMedicines.map((medicine) => (
              <div key={medicine.id} style={{ 
                padding: 12, 
                border: `1px solid ${COLORS.BORDER_SECONDARY}`, 
                borderRadius: BORDER_RADIUS.SM,
                backgroundColor: COLORS.BG_SECONDARY
              }}>
                <div style={{ marginBottom: 8 }}>
                  <Text strong style={{ fontSize: 14 }}>
                    {medicine.name}
                  </Text>
                  <Tag color="green" style={{ marginLeft: 8 }}>
                    {medicine.soLuong} {t('treatment.units')}
                  </Tag>
                </div>
                
                <div style={{ marginBottom: 6 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {t('treatment.dosage')}: {medicine.lieuDung}
                  </Text>
                </div>
                
                <div style={{ marginBottom: 6 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {t('treatment.frequency')}: {medicine.tanSuat}
                  </Text>
                </div>
                
                <div style={{ marginBottom: 6 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {t('treatment.duration')}: {medicine.thoiGianDung}
                  </Text>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {t('treatment.unitPrice')}: {medicine.giaDonVi.toLocaleString()}₫
                  </Text>
                  <Text strong style={{ color: COLORS.WARNING }}>
                    {medicine.thanhTien.toLocaleString()}₫
                  </Text>
                </div>
              </div>
            ))}
          </Space>
        </div>
      ))}

      {/* Hướng dẫn sử dụng */}
      {hasInstructions && (
        <div style={{ marginTop: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <InfoCircleOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            <Text strong>{t('treatment.instructions')}:</Text>
          </div>
          <div>
            {medicines
              .filter(med => med.huongDanSuDung)
              .map((medicine) => (
                <div key={medicine.id} style={{ marginBottom: 8 }}>
                  <Text strong style={{ fontSize: 12 }}>
                    {medicine.name}:
                  </Text>
                  <Text style={{ marginLeft: 8, fontSize: 12 }}>
                    {medicine.huongDanSuDung}
                  </Text>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Tóm tắt đơn thuốc */}
      <div style={{ 
        marginTop: 20, 
        padding: 16, 
        backgroundColor: '#f6ffed', 
        border: '1px solid #b7eb8f', 
        borderRadius: BORDER_RADIUS.SM 
      }}>
        <div style={{ marginBottom: 8 }}>
          <FileTextOutlined style={{ marginRight: 8, color: COLORS.SUCCESS }} />
          <Text strong style={{ color: COLORS.SUCCESS }}>
            {t('treatment.prescriptionSummary')}:
          </Text>
        </div>
        <div>
          <Text style={{ fontSize: 12 }}>
            {t('treatment.totalMedicines')}: {totalMedicines} | {t('treatment.totalQuantity')}: {totalQuantity} | {t('treatment.totalCost')}: {totalCost.toLocaleString()}₫
          </Text>
        </div>
      </div>
    </StyledCard>
  )
}
