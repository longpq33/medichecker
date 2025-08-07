import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Card, 
  Descriptions, 
  Tag, 
  Button, 
  Typography,
  Row,
  Col,
  Statistic,
  Alert,
  Spin,
  Space
} from 'antd'
import { 
  ArrowLeftOutlined, 
  MedicineBoxOutlined,
  DollarOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  SafetyOutlined
} from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import { useMedicine } from '@/hooks/useMedicines'
import dayjs from 'dayjs'

const { Title } = Typography

export const MedicineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useLanguage()
  
  // Sử dụng hook để lấy dữ liệu thuốc
  const { medicine, isLoadingMedicine, medicineError } = useMedicine(parseInt(id || '0'))

  const getDrugGroupText = (group?: string) => {
    switch (group) {
      case 'KHANG_SINH':
        return t('medicine.groups.antibiotic')
      case 'GIAM_DAU':
        return t('medicine.groups.painkiller')
      case 'CHONG_VIEM':
        return t('medicine.groups.antiInflammatory')
      case 'TIM_MACH':
        return t('medicine.groups.cardiovascular')
      case 'TIEU_HOA':
        return t('medicine.groups.digestive')
      case 'HOI_SUC':
        return t('medicine.groups.respiratory')
      case 'KHAC':
        return t('medicine.groups.other')
      default:
        return t('medicine.noData')
    }
  }

  const getDrugGroupColor = (group?: string) => {
    switch (group) {
      case 'KHANG_SINH':
        return 'red'
      case 'GIAM_DAU':
        return 'orange'
      case 'CHONG_VIEM':
        return 'blue'
      case 'TIM_MACH':
        return 'purple'
      case 'TIEU_HOA':
        return 'green'
      case 'HOI_SUC':
        return 'cyan'
      case 'KHAC':
        return 'default'
      default:
        return 'default'
    }
  }

  if (isLoadingMedicine) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <Spin size="large" />
      </div>
    )
  }

  if (medicineError || !medicine) {
    return (
      <div style={{ padding: '24px' }}>
        <Alert
          message={t('medicine.error')}
          description={t('medicine.noData')}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => navigate('/medicines')}>
              {t('medicine.backToMedicines')}
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/medicines')}
          style={{ marginBottom: '16px' }}
        >
          {t('medicine.backToMedicines')}
        </Button>
        
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <MedicineBoxOutlined style={{ fontSize: '24px', marginRight: '12px', color: '#1890ff' }} />
            <Title level={2} style={{ margin: 0 }}>
              {medicine.tenThuoc}
            </Title>
          </div>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Statistic
                title={t('medicine.drugCode')}
                value={medicine.maThuoc}
                prefix={<InfoCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
            <Col xs={24} md={8}>
              <Statistic
                title={t('medicine.priceValue')}
                value={medicine.giaBan ? `${medicine.giaBan.toLocaleString()} VNĐ` : '---'}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col xs={24} md={8}>
              <Statistic
                title={t('medicine.createdAt')}
                value={medicine.ngayTao ? dayjs(medicine.ngayTao).format('DD/MM/YYYY') : '---'}
                prefix={<CalendarOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Col>
          </Row>
        </Card>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title={t('medicine.medicineInfo')}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label={t('medicine.drugCode')}>
                    {medicine.maThuoc || '---'}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('medicine.drugName')}>
                    {medicine.tenThuoc || '---'}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('medicine.activeIngredientName')}>
                    {medicine.tenHoatChat || '---'}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('medicine.concentrationValue')}>
                    {medicine.nongDo || '---'}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('medicine.dosageFormType')}>
                    {medicine.dangBaoChe || '---'}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('medicine.manufacturerName')}>
                    {medicine.hangSanXuat || '---'}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('medicine.countryOfOrigin')}>
                    {medicine.nuocSanXuat || '---'}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('medicine.unitOfMeasurement')}>
                    {medicine.donViTinh || '---'}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('medicine.drugGroupType')}>
                    {medicine.nhomThuoc ? (
                      <Tag color={getDrugGroupColor(medicine.nhomThuoc)}>
                        {getDrugGroupText(medicine.nhomThuoc)}
                      </Tag>
                    ) : (
                      '---'
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('medicine.isActive')}>
                    <Tag color={medicine.kichHoat ? 'green' : 'red'}>
                      {medicine.kichHoat ? t('medicine.available') : t('medicine.outOfStock')}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title={t('medicine.indicationsText')} style={{ height: '100%' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert
                message={t('medicine.indicationsText')}
                description={medicine.chiDinh || '---'}
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
              />
              <Alert
                message={t('medicine.contraindicationsText')}
                description={medicine.chongChiDinh || '---'}
                type="warning"
                showIcon
                icon={<SafetyOutlined />}
              />
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
} 