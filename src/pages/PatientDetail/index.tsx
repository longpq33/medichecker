import React, { useState, useEffect } from 'react'
import { 
  Typography, 
  Tag, 
  Avatar,
  Badge
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
  TeamOutlined
} from '@ant-design/icons'
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'
import { 
  StyledCard, 
  StyledTabs, 
  InfoSection, 
  TreatmentHistory,
  PatientHeader,
  ActionButton,
  BackButton
} from './styled'

const { Title } = Typography

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
}

interface TreatmentRecord {
  id: string
  date: string
  diagnosis: string
  prescription: string
  doctor: string
  status: 'completed' | 'ongoing' | 'scheduled'
  notes: string
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
  allergies: ['Penicillin', 'Aspirin'],
  createdAt: '2024-01-15',
}

const mockTreatmentHistory: TreatmentRecord[] = [
  {
    id: '1',
    date: '2024-01-20',
    diagnosis: 'Cảm cúm, sốt nhẹ',
    prescription: 'Paracetamol 500mg x 3 lần/ngày, Vitamin C',
    doctor: 'BS. Trần Thị B',
    status: 'completed',
    notes: 'Bệnh nhân đáp ứng tốt với điều trị',
  },
  {
    id: '2',
    date: '2024-01-15',
    diagnosis: 'Tăng huyết áp',
    prescription: 'Amlodipine 5mg x 1 lần/ngày',
    doctor: 'BS. Lê Văn C',
    status: 'ongoing',
    notes: 'Theo dõi huyết áp hàng tuần',
  },
  {
    id: '3',
    date: '2024-01-10',
    diagnosis: 'Đau đầu, mất ngủ',
    prescription: 'Melatonin 3mg trước khi ngủ',
    doctor: 'BS. Nguyễn Thị D',
    status: 'completed',
    notes: 'Triệu chứng cải thiện sau 1 tuần',
  },
]

export const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useLanguage()
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
        return t('common.active')
      case 'inactive':
        return t('common.inactive')
      case 'pending':
        return t('common.pending')
      default:
        return status
    }
  }

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male':
        return t('common.male')
      case 'female':
        return t('common.female')
      case 'other':
        return t('common.other')
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
      key: 'info',
      label: (
        <span>
          <UserOutlined />
          Thông tin bệnh nhân
        </span>
      ),
      children: (
        <div>
          <StyledCard>
            <PatientHeader>
              <div className="patient-avatar">
                <Avatar size={80} icon={<UserOutlined />} />
              </div>
              <div className="patient-info">
                <Title level={2} className="patient-name">{patient.name}</Title>
                <div className="patient-id">ID: {patient.id}</div>
                <div className="patient-status">
                  <Tag color={getStatusColor(patient.status)}>
                    {getStatusText(patient.status)}
                  </Tag>
                </div>
              </div>
            </PatientHeader>

            <InfoSection>
              <div className="section-title">Thông tin cá nhân</div>
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
                    <HomeOutlined className="info-icon" />
                    Địa chỉ
                  </div>
                  <div className="info-value">{patient.address}</div>
                </div>
              </div>
            </InfoSection>

            <InfoSection>
              <div className="section-title">Thông tin y tế</div>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">
                    <HeartOutlined className="info-icon" />
                    Nhóm máu
                  </div>
                  <div className="info-value">{patient.bloodType}</div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">
                    <TeamOutlined className="info-icon" />
                    Liên hệ khẩn cấp
                  </div>
                  <div className="info-value">{patient.emergencyContact}</div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">
                    <IdcardOutlined className="info-icon" />
                    Tiền sử bệnh
                  </div>
                  <div className="info-value">{patient.medicalHistory}</div>
                </div>
                
                <div className="info-item">
                  <div className="info-label">
                    <AlertOutlined className="info-icon" />
                    Dị ứng
                  </div>
                  <div className="info-value">
                    {patient.allergies.length > 0 ? (
                      <div className="allergies-container">
                        {patient.allergies.map((allergy, index) => (
                          <Tag key={index} className="allergy-tag">
                            {allergy}
                          </Tag>
                        ))}
                      </div>
                    ) : (
                      'Không có'
                    )}
                  </div>
                </div>
              </div>
            </InfoSection>
          </StyledCard>
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
          <StyledCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Title level={3} style={{ margin: 0 }}>Lịch sử điều trị</Title>
              <ActionButton 
                type="primary" 
                icon={<FileTextOutlined />}
                onClick={() => navigate(`/patients/${patient.id}/add-treatment`)}
              >
                Thêm điều trị mới
              </ActionButton>
            </div>

            <TreatmentHistory>
              {treatmentHistory.map((treatment) => (
                <div key={treatment.id} className="treatment-item">
                  <div className="treatment-header">
                    <span className="treatment-date">
                      <CalendarOutlined className="date-icon" />
                      {new Date(treatment.date).toLocaleDateString('vi-VN')}
                    </span>
                    <Badge 
                      status={getTreatmentStatusColor(treatment.status)}
                      text={getTreatmentStatusText(treatment.status)}
                    />
                  </div>
                  <div className="treatment-content">
                    <div className="treatment-section treatment-diagnosis">
                      <div className="section-label">Chẩn đoán</div>
                      <div className="section-value">{treatment.diagnosis}</div>
                    </div>
                    
                    <div className="treatment-section treatment-prescription">
                      <div className="section-label">Đơn thuốc</div>
                      <div className="section-value">{treatment.prescription}</div>
                    </div>
                    
                    <div className="treatment-section treatment-doctor">
                      <div className="section-label">Bác sĩ</div>
                      <div className="section-value">{treatment.doctor}</div>
                    </div>
                    
                    {treatment.notes && (
                      <div className="treatment-section treatment-notes">
                        <div className="section-label">Ghi chú</div>
                        <div className="section-value">{treatment.notes}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </TreatmentHistory>
          </StyledCard>
        </div>
      ),
    },
  ]

  return (
    <div>
      <BackButton 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/patients')}
      >
        Quay lại danh sách
      </BackButton>

      <StyledTabs
        defaultActiveKey="info"
        items={tabItems}
        size="large"
      />
    </div>
  )
} 