import React, { useState, useEffect } from 'react'
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
  Button,
  Timeline,
  Alert
} from 'antd'
import { 
  ArrowLeftOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CalendarOutlined,
  HeartOutlined,
  AlertOutlined,
  IdcardOutlined,
  TeamOutlined,
  EditOutlined,
  PrinterOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { useParams, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { 
  StyledTabs, 
  TreatmentHistory,
  PatientHeader,
  ActionButton,
  BackButton,
  PatientStats,
  InfoCard,
  TreatmentCard,
  AllergyTag
} from './styled'

const { Title, Text } = Typography

interface Patient {
  id: string
  name: string
  phone: string
  email: string
  age: number
  gender: 'male' | 'female' | 'other'
  address: string
  status: 'active' | 'inactive' | 'pending'
  bloodType: string
  emergencyContact: string
  medicalHistory: string
  allergies: string[]
  createdAt: string
  lastVisit?: string
  totalVisits?: number
  nextAppointment?: string
}

interface TreatmentRecord {
  id: string
  date: string
  diagnosis: string
  prescription: string
  doctor: string
  status: 'completed' | 'ongoing' | 'scheduled'
  notes: string
  medicines?: string[]
}

const mockPatient: Patient = {
  id: '1',
  name: 'Nguyễn Văn A',
  phone: '0123456789',
  email: 'nguyenvana@email.com',
  age: 35,
  gender: 'male',
  address: '123 Đường ABC, Quận 1, TP.HCM',
  status: 'active',
  bloodType: 'A+',
  emergencyContact: '0987654321 (Vợ)',
  medicalHistory: 'Tiền sử bệnh tim mạch, huyết áp cao',
  allergies: ['Penicillin', 'Aspirin', 'Sulfa drugs'],
  createdAt: '2024-01-15',
  lastVisit: '2024-01-20',
  totalVisits: 12,
  nextAppointment: '2024-02-15'
}

const mockTreatmentHistory: TreatmentRecord[] = [
  {
    id: '1',
    date: '2024-01-20',
    diagnosis: 'Cảm cúm, sốt nhẹ',
    prescription: 'Paracetamol 500mg x 3 lần/ngày, Vitamin C',
    doctor: 'BS. Trần Thị B',
    status: 'completed',
    notes: 'Bệnh nhân đáp ứng tốt với điều trị, triệu chứng giảm sau 3 ngày',
    medicines: ['Paracetamol 500mg', 'Vitamin C 1000mg']
  },
  {
    id: '2',
    date: '2024-01-15',
    diagnosis: 'Tăng huyết áp',
    prescription: 'Amlodipine 5mg x 1 lần/ngày',
    doctor: 'BS. Lê Văn C',
    status: 'ongoing',
    notes: 'Theo dõi huyết áp hàng tuần, huyết áp ổn định ở mức 130/85 mmHg',
    medicines: ['Amlodipine 5mg']
  },
  {
    id: '3',
    date: '2024-01-10',
    diagnosis: 'Đau đầu, mất ngủ',
    prescription: 'Melatonin 3mg trước khi ngủ',
    doctor: 'BS. Nguyễn Thị D',
    status: 'completed',
    notes: 'Triệu chứng cải thiện sau 1 tuần, giấc ngủ ổn định',
    medicines: ['Melatonin 3mg']
  },
]

export const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [treatmentHistory, setTreatmentHistory] = useState<TreatmentRecord[]>([])

  useEffect(() => {
    // Simulate API call
    setPatient(mockPatient)
    setTreatmentHistory(mockTreatmentHistory)
  }, [id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'inactive':
        return 'red'
      case 'pending':
        return 'orange'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Hoạt động'
      case 'inactive':
        return 'Không hoạt động'
      case 'pending':
        return 'Chờ xử lý'
      default:
        return status
    }
  }

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male':
        return 'Nam'
      case 'female':
        return 'Nữ'
      case 'other':
        return 'Khác'
      default:
        return gender
    }
  }

  const getTreatmentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'ongoing':
        return 'processing'
      case 'scheduled':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getTreatmentStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành'
      case 'ongoing':
        return 'Đang điều trị'
      case 'scheduled':
        return 'Đã lên lịch'
      default:
        return status
    }
  }

  if (!patient) {
    return <div>Loading...</div>
  }

  const tabItems = [
    {
      key: 'overview',
      label: (
        <span>
          <UserOutlined />
          Tổng quan
        </span>
      ),
      children: (
        <div>
          {/* Patient Header */}
          <PatientHeader>
            <div className="patient-avatar">
              <Avatar size={100} icon={<UserOutlined />} />
              <div className="status-indicator">
                <Badge status={patient.status === 'active' ? 'success' : 'error'} />
              </div>
            </div>
            <div className="patient-info">
              <Title level={2} className="patient-name">{patient.name}</Title>
              <div className="patient-meta">
                <Text type="secondary">ID: {patient.id}</Text>
                <Tag color={getStatusColor(patient.status)} className="status-tag">
                  {getStatusText(patient.status)}
                </Tag>
              </div>
              <div className="patient-contact">
                <Space>
                  <Text><PhoneOutlined /> {patient.phone}</Text>
                  <Text><MailOutlined /> {patient.email}</Text>
                </Space>
              </div>
            </div>
            <div className="patient-actions">
              <Space>
                <Button icon={<EditOutlined />} type="primary">
                  Chỉnh sửa
                </Button>
                <Button icon={<PrinterOutlined />}>
                  In hồ sơ
                </Button>
              </Space>
            </div>
          </PatientHeader>

          {/* Patient Statistics */}
          <PatientStats>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Tổng số lần khám"
                    value={patient.totalVisits || 0}
                    prefix={<UserOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Lần khám gần nhất"
                    value={patient.lastVisit ? dayjs(patient.lastVisit).format('DD/MM/YYYY') : 'N/A'}
                    prefix={<CalendarOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Lịch hẹn tiếp theo"
                    value={patient.nextAppointment ? dayjs(patient.nextAppointment).format('DD/MM/YYYY') : 'N/A'}
                    prefix={<ClockCircleOutlined />}
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
            </Row>
          </PatientStats>

          {/* Patient Information */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <InfoCard 
                title={
                  <span>
                    <UserOutlined /> Thông tin cá nhân
                  </span>
                }
              >
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-label">
                      <UserOutlined className="info-icon" />
                      Họ tên
                    </div>
                    <div className="info-value">{patient.name}</div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-label">
                      <CalendarOutlined className="info-icon" />
                      Tuổi
                    </div>
                    <div className="info-value">{patient.age} tuổi</div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-label">
                      <UserOutlined className="info-icon" />
                      Giới tính
                    </div>
                    <div className="info-value">{getGenderText(patient.gender)}</div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-label">
                      <PhoneOutlined className="info-icon" />
                      Số điện thoại
                    </div>
                    <div className="info-value">{patient.phone}</div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-label">
                      <MailOutlined className="info-icon" />
                      Email
                    </div>
                    <div className="info-value">{patient.email}</div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-label">
                      <HomeOutlined className="info-icon" />
                      Địa chỉ
                    </div>
                    <div className="info-value">{patient.address}</div>
                  </div>
                </div>
              </InfoCard>
            </Col>

            <Col xs={24} lg={12}>
              <InfoCard 
                title={
                  <span>
                    <HeartOutlined /> Thông tin y tế
                  </span>
                }
              >
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-label">
                      <HeartOutlined className="info-icon" />
                      Nhóm máu
                    </div>
                    <div className="info-value">
                      <Tag color="red">{patient.bloodType}</Tag>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-label">
                      <TeamOutlined className="info-icon" />
                      Liên hệ khẩn cấp
                    </div>
                    <div className="info-value">{patient.emergencyContact}</div>
                  </div>
                  
                  <div className="info-item full-width">
                    <div className="info-label">
                      <IdcardOutlined className="info-icon" />
                      Tiền sử bệnh
                    </div>
                    <div className="info-value">{patient.medicalHistory}</div>
                  </div>
                  
                  <div className="info-item full-width">
                    <div className="info-label">
                      <AlertOutlined className="info-icon" />
                      Dị ứng
                    </div>
                    <div className="info-value">
                      {patient.allergies.length > 0 ? (
                        <div className="allergies-container">
                          {patient.allergies.map((allergy, index) => (
                            <AllergyTag key={index} color="error">
                              {allergy}
                            </AllergyTag>
                          ))}
                        </div>
                      ) : (
                        <Text type="secondary">Không có</Text>
                      )}
                    </div>
                  </div>
                </div>
              </InfoCard>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'treatment',
      label: (
        <span>
          <MedicineBoxOutlined />
          Lịch sử điều trị
        </span>
      ),
      children: (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <Title level={3} style={{ margin: 0 }}>Lịch sử điều trị</Title>
            <ActionButton 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => navigate(`/patients/${patient.id}/add-treatment`)}
            >
              Thêm điều trị mới
            </ActionButton>
          </div>

          <TreatmentHistory>
            <Timeline
              items={treatmentHistory.map((treatment) => ({
                color: treatment.status === 'completed' ? 'green' : 
                       treatment.status === 'ongoing' ? 'blue' : 'orange',
                children: (
                  <TreatmentCard>
                    <div className="treatment-header">
                      <div className="treatment-date">
                        <CalendarOutlined className="date-icon" />
                        {dayjs(treatment.date).format('DD/MM/YYYY')}
                      </div>
                      <Badge 
                        status={getTreatmentStatusColor(treatment.status)}
                        text={getTreatmentStatusText(treatment.status)}
                      />
                    </div>
                    
                    <div className="treatment-content">
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                          <div className="treatment-section">
                            <div className="section-label">
                              <ExclamationCircleOutlined /> Chẩn đoán
                            </div>
                            <div className="section-value">{treatment.diagnosis}</div>
                          </div>
                        </Col>
                        
                        <Col xs={24} md={12}>
                          <div className="treatment-section">
                            <div className="section-label">
                              <UserOutlined /> Bác sĩ
                            </div>
                            <div className="section-value">{treatment.doctor}</div>
                          </div>
                        </Col>
                        
                        <Col xs={24}>
                          <div className="treatment-section">
                            <div className="section-label">
                              <MedicineBoxOutlined /> Đơn thuốc
                            </div>
                            <div className="section-value">{treatment.prescription}</div>
                            {treatment.medicines && (
                              <div className="medicines-list">
                                {treatment.medicines.map((medicine, index) => (
                                  <Tag key={index} color="blue" style={{ margin: '4px' }}>
                                    {medicine}
                                  </Tag>
                                ))}
                              </div>
                            )}
                          </div>
                        </Col>
                        
                        {treatment.notes && (
                          <Col xs={24}>
                            <div className="treatment-section">
                              <div className="section-label">
                                <FileTextOutlined /> Ghi chú
                              </div>
                              <div className="section-value">
                                <Alert
                                  message={treatment.notes}
                                  type="info"
                                  showIcon
                                  style={{ marginTop: 8 }}
                                />
                              </div>
                            </div>
                          </Col>
                        )}
                      </Row>
                    </div>
                  </TreatmentCard>
                )
              }))}
            />
          </TreatmentHistory>
        </div>
      ),
    },
  ]

  return (
    <div style={{ padding: '24px' }}>
      <BackButton 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/patients')}
      >
        Quay lại danh sách
      </BackButton>

      <StyledTabs
        defaultActiveKey="overview"
        items={tabItems}
        size="large"
      />
    </div>
  )
} 