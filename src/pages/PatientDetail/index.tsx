import React from 'react'
import { 
  Typography, 
  Tag, 
  Avatar,
  Badge,
  Card,
  Row,
  Col,
  Statistic,
  Space,
  Alert
} from 'antd'
import { 
  ArrowLeftOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  FileTextOutlined,
  TeamOutlined,
  AlertOutlined
} from '@ant-design/icons'
import { useParams, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { 
  PatientHeader,
  BackButton,
  PatientStats,
  InfoCard,
  StyledTabs,
  AddTreatmentButton
} from './styled'
import { usePatient } from '@/hooks/usePatients'
import { useLanguage } from '@/hooks/useLanguage'

const { Text, Title } = Typography


export const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useLanguage()
  
  // Sử dụng hook
  const { patient, isLoadingPatient } = usePatient(parseInt(id || '0'))

  const getGenderText = (gender?: string) => {
    switch (gender) {
      case 'NAM':
        return t('common.male')
      case 'NU':
        return t('common.female')
      case 'KHAC':
        return t('common.other')
      default:
        return t('patient.noData')
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

  const getTreatmentStatusText = (status: string) => {
    switch (status) {
      case 'MOI_TAO':
        return t('patient.treatmentStatus')
      case 'DA_DUYET':
        return t('patient.treatmentStatus')
      case 'DANG_DIEU_TRI':
        return t('patient.treatmentStatus')
      case 'HOAN_THANH':
        return t('patient.treatmentStatus')
      case 'HUY_BO':
        return t('patient.treatmentStatus')
      default:
        return t('patient.noData')
    }
  }

  const handleAddTreatment = () => {
    navigate(`/patients/${id}/add-treatment`)
  }

  if (isLoadingPatient) {
    return <div>Đang tải...</div>
  }

  if (!patient) {
    return <div>Không tìm thấy bệnh nhân</div>
  }

  const tabItems = [
    {
      key: 'overview',
      label: (
        <Space>
          <UserOutlined />
          {t('patient.overview')}
        </Space>
      ),
      children: (
        <div>
          {/* Bottom Section - Main Information Cards */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <InfoCard
                title={
                  <Space>
                    <UserOutlined />
                    {t('patient.personalInfo')}
                  </Space>
                }
              >
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">
                      <UserOutlined style={{ marginRight: '8px' }} />
                      {t('patient.fullName')}:
                    </span>
                    <span className="info-value">{patient.hoTen || '---'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <CalendarOutlined style={{ marginRight: '8px' }} />
                      {t('common.age')}:
                    </span>
                    <span className="info-value">
                      {patient.ngaySinh ? `${dayjs().diff(dayjs(patient.ngaySinh), 'year')} ${t('common.age')}` : '---'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <UserOutlined style={{ marginRight: '8px' }} />
                      {t('common.gender')}:
                    </span>
                    <span className="info-value">
                      <Tag color={getGenderColor(patient.gioiTinh)}>
                        {getGenderText(patient.gioiTinh)}
                      </Tag>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <PhoneOutlined style={{ marginRight: '8px' }} />
                      {t('common.phone')}:
                    </span>
                    <span className="info-value">{patient.soDienThoai || '---'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <MailOutlined style={{ marginRight: '8px' }} />
                      {t('common.email')}:
                    </span>
                    <span className="info-value">{patient.email || '---'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <HomeOutlined style={{ marginRight: '8px' }} />
                      {t('common.address')}:
                    </span>
                    <span className="info-value">{patient.diaChi || '---'}</span>
                  </div>
                </div>
              </InfoCard>
            </Col>

            <Col xs={24} lg={12}>
              <InfoCard
                title={
                  <Space>
                    <MedicineBoxOutlined />
                    {t('patient.medicalInfo')}
                  </Space>
                }
              >
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">
                      <MedicineBoxOutlined style={{ marginRight: '8px' }} />
                      {t('patient.bloodType')}:
                    </span>
                    <span className="info-value">
                      {patient.nhomMau ? (
                        <Tag color="red" style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                          {patient.nhomMau}
                        </Tag>
                      ) : (
                        '---'
                      )}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <PhoneOutlined style={{ marginRight: '8px' }} />
                      {t('patient.emergencyContact')}:
                    </span>
                    <span className="info-value">{patient.lienHeKhanCap || '---'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <FileTextOutlined style={{ marginRight: '8px' }} />
                      {t('patient.medicalHistory')}:
                    </span>
                    <span className="info-value">
                      {patient.danhSachBenhLyNen && patient.danhSachBenhLyNen.length > 0 ? (
                        <Space wrap>
                          {patient.danhSachBenhLyNen.map((benhLy) => (
                            <Tag key={benhLy.id} color="blue" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #dbeafe' }}>
                              {benhLy.tenBenh}
                            </Tag>
                          ))}
                        </Space>
                      ) : (
                        '---'
                      )}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <AlertOutlined style={{ marginRight: '8px' }} />
                      {t('patient.allergies')}:
                    </span>
                    <span className="info-value">
                      {patient.danhSachDiUng && patient.danhSachDiUng.length > 0 ? (
                        <Space wrap>
                          {patient.danhSachDiUng.map((diUng) => (
                            <Tag key={diUng.id} color="red" style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                              {diUng.thuoc.tenThuoc}
                              {diUng.trieuChung && ` (${diUng.trieuChung})`}
                            </Tag>
                          ))}
                        </Space>
                      ) : (
                        '---'
                      )}
                    </span>
                  </div>
                </div>
              </InfoCard>
            </Col>
          </Row>
        </div>
      )
    },
    {
      key: 'treatment-history',
      label: (
        <Space>
          <MedicineBoxOutlined />
          {t('patient.treatmentHistory')}
        </Space>
      ),
      children: (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '24px' 
          }}>
            <Title level={4}>{t('patient.treatmentHistory')}</Title>
          </div>

          {patient.danhSachDieuTri && patient.danhSachDieuTri.length > 0 ? (
            <div>
              {patient.danhSachDieuTri.map((treatment) => (
                <Card 
                  key={treatment.id} 
                  style={{ 
                    marginBottom: '16px',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      {/* Date and Status */}
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '16px', marginRight: '12px' }}>
                          {treatment.donThuocDieuTri ? dayjs(treatment.donThuocDieuTri.ngayKeDon).format('DD/MM/YYYY') : t('patient.noData')}
                        </div>
                        <Badge
                          status={treatment.trangThai === 'HOAN_THANH' ? 'success' : 
                                 treatment.trangThai === 'DANG_DIEU_TRI' ? 'processing' : 
                                 treatment.trangThai === 'DA_DUYET' ? 'default' : 'warning'}
                          text={getTreatmentStatusText(treatment.trangThai)}
                        />
                      </div>

                      {/* Diagnosis */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>
                          {t('patient.diagnosis')}
                        </div>
                        <div style={{ color: '#6b7280' }}>
                          {treatment.chanDoanChinh}
                          {treatment.chanDoanPhu && ` - ${treatment.chanDoanPhu}`}
                        </div>
                      </div>

                      {/* Symptoms */}
                      {treatment.trieuChung && (
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>
                            {t('patient.symptoms')}
                          </div>
                          <div style={{ color: '#6b7280' }}>
                            {treatment.trieuChung}
                          </div>
                        </div>
                      )}

                      {/* Doctor and Prescription in a row */}
                      <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
                        {/* Doctor */}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <UserOutlined style={{ marginRight: '8px', color: '#6b7280' }} />
                            <span style={{ fontWeight: 'bold', color: '#374151' }}>{t('patient.doctor')}</span>
                          </div>
                          <div style={{ color: '#6b7280' }}>
                            {treatment.bacSiDieuTri}
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {treatment.donThuocDieuTri?.ghiChu && (
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>
                            {t('patient.notes')}
                          </div>
                          <div style={{ color: '#6b7280' }}>
                            {treatment.donThuocDieuTri.ghiChu}
                          </div>
                        </div>
                      )}

                      {/* Medicine List */}
                      {treatment.donThuocDieuTri?.danhSachThuoc && treatment.donThuocDieuTri.danhSachThuoc.length > 0 && (
                        <div>
                          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>
                            {t('patient.medicineList')}
                          </div>
                          <div style={{ color: '#6b7280', marginBottom: '8px' }}>
                            {treatment.donThuocDieuTri.danhSachThuoc.map(med => `${med.thuoc.tenThuoc} x ${med.lieuDung}`).join(', ')}
                          </div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {treatment.donThuocDieuTri.danhSachThuoc.map((med, index) => (
                              <Tag 
                                key={index}
                                style={{ 
                                  backgroundColor: '#eff6ff', 
                                  color: '#1d4ed8', 
                                  border: '1px solid #dbeafe',
                                  borderRadius: '16px',
                                  padding: '4px 12px'
                                }}
                              >
                                {med.thuoc.tenThuoc}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Alert
              message={t('patient.noTreatmentHistory')}
              description={t('patient.noTreatmentHistoryDesc')}
              type="info"
              showIcon
            />
          )}
        </div>
      )
    }
  ]

  return (
    <div>
      <BackButton onClick={() => navigate('/patients')}>
        <ArrowLeftOutlined /> {t('patient.back')}
      </BackButton>

      <PatientHeader>
        <div className="patient-avatar">
          <Avatar size={100} icon={<UserOutlined />} />
          <div className="status-indicator">
            <Badge status="success" />
          </div>
        </div>
        
        <div className="patient-info">
          <h1 className="patient-name">{patient.hoTen}</h1>
          <div className="patient-meta">
            <Tag className="status-tag">{t('patient.patientId')}: {patient.maBenhNhan}</Tag>
            <Tag color={getGenderColor(patient.gioiTinh)}>
              {getGenderText(patient.gioiTinh)}
            </Tag>
          </div>
          <div className="patient-contact">
            {patient.soDienThoai && (
              <Text>
                <PhoneOutlined /> {patient.soDienThoai}
              </Text>
            )}
            {patient.email && (
              <Text>
                <MailOutlined /> {patient.email}
              </Text>
            )}
            {patient.diaChi && (
              <Text>
                <HomeOutlined /> {patient.diaChi}
              </Text>
            )}
          </div>
        </div>
      </PatientHeader>

      <PatientStats>
        <Card>
          <Statistic
            title={t('patient.totalAppointments')}
            value={patient.danhSachDieuTri ? patient.danhSachDieuTri.length : 0}
            prefix={<TeamOutlined />}
            valueStyle={{ color: '#10b981' }}
          />
        </Card>
        <Card>
          <Statistic
            title={t('patient.lastAppointment')}
            value={patient.danhSachDieuTri && patient.danhSachDieuTri.length > 0 ? dayjs(patient.danhSachDieuTri[0]?.donThuocDieuTri?.ngayKeDon).format('DD/MM/YYYY') : t('patient.noData')}
            prefix={<CalendarOutlined />}
            valueStyle={{ color: '#1f2937' }}
          />
        </Card>
        <Card>
          <Statistic
            title={t('patient.nextAppointment')}
            value={t('patient.noData')}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: '#8b5cf6' }}
          />
        </Card>
      </PatientStats>

      <div style={{ 
        position: 'relative',
        marginBottom: '24px' 
      }}>
        <StyledTabs
          defaultActiveKey="overview"
          items={tabItems}
          size="large"
        />
        <div style={{ 
          position: 'absolute',
          top: '8px',
          right: '0',
          zIndex: 1
        }}>
          <AddTreatmentButton
            icon={<PlusOutlined />}
            onClick={handleAddTreatment}
          >
            {t('patient.addTreatment')}
          </AddTreatmentButton>
        </div>
      </div>
    </div>
  )
} 