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
  IdcardOutlined,
  EditOutlined,
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
  ActionButton,
  BackButton,
  PatientStats,
  InfoCard,
  StyledTabs,
  AddTreatmentButton
} from './styled'
import { usePatient } from '@/hooks/usePatients'

const { Text, Title } = Typography

// Mock data cho lịch sử điều trị - chỉ sử dụng khi API chưa sẵn sàng
// const mockTreatmentHistory = [
//   {
//     id: 1,
//     ngayKham: '2024-01-20T10:30:00',
//     bacSi: 'BS. Trần Thị B',
//     chuanDoan: 'Cảm cúm, sốt nhẹ',
//     donThuoc: 'DT001',
//     trangThai: 'HOAN_THANH',
//     ghiChu: 'Bệnh nhân đáp ứng tốt với điều trị, triệu chứng giảm sau 3 ngày',
//     danhSachThuoc: [
//       { tenThuoc: 'Paracetamol 500mg', lieuDung: '3 lần/ngày' },
//       { tenThuoc: 'Vitamin C 1000mg', lieuDung: '1 lần/ngày' }
//     ]
//   },
//   {
//     id: 2,
//     ngayKham: '2024-01-15T14:20:00',
//     bacSi: 'BS. Lê Văn Cường',
//     chuanDoan: 'Viêm họng',
//     donThuoc: 'DT002',
//     trangThai: 'DANG_THUC_HIEN',
//     ghiChu: 'Uống thuốc kháng sinh theo đơn',
//     danhSachThuoc: [
//       { tenThuoc: 'Amoxicillin 250mg', lieuDung: '2 lần/ngày' }
//     ]
//   },
//   {
//     id: 3,
//     ngayKham: '2024-01-10T09:15:00',
//     bacSi: 'BS. Phạm Thị Dung',
//     chuanDoan: 'Tăng huyết áp',
//     donThuoc: 'DT003',
//     trangThai: 'DA_DUYET',
//     ghiChu: 'Theo dõi huyết áp hàng ngày',
//     danhSachThuoc: [
//       { tenThuoc: 'Amlodipine 5mg', lieuDung: '1 lần/ngày' }
//     ]
//   }
// ]

export const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  // Sử dụng hook
  const { patient, isLoadingPatient } = usePatient(parseInt(id || '0'))

  const getGenderText = (gender?: string) => {
    switch (gender) {
      case 'NAM':
        return 'Nam'
      case 'NU':
        return 'Nữ'
      case 'KHAC':
        return 'Khác'
      default:
        return 'Chưa xác định'
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
        return 'Mới tạo'
      case 'DA_DUYET':
        return 'Đã duyệt'
      case 'DANG_THUC_HIEN':
        return 'Đang thực hiện'
      case 'HOAN_THANH':
        return 'Hoàn thành'
      case 'HUY_BO':
        return 'Hủy bỏ'
      default:
        return status
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
          Tổng quan
        </Space>
      ),
      children: (
        <div>
          {/* Top Section - Summary Cards */}
          <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Tổng số lần khám"
                  value={patient.danhSachDieuTri?.length || 0}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: '#1f2937' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Lần khám gần nhất"
                  value={patient.danhSachDieuTri && patient.danhSachDieuTri.length > 0 ? dayjs(patient.danhSachDieuTri[0]?.ngayKham).format('DD/MM/YYYY') : 'Chưa có'}
                  prefix={<CalendarOutlined />}
                  valueStyle={{ color: '#1f2937' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Lịch hẹn tiếp theo"
                  value="15/02/2024"
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#8b5cf6' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Bottom Section - Main Information Cards */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <InfoCard
                title={
                  <Space>
                    <UserOutlined />
                    Thông tin cá nhân
                  </Space>
                }
              >
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">
                      <UserOutlined style={{ marginRight: '8px' }} />
                      Họ tên:
                    </span>
                    <span className="info-value">{patient.hoTen}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <CalendarOutlined style={{ marginRight: '8px' }} />
                      Tuổi:
                    </span>
                    <span className="info-value">
                      {patient.ngaySinh ? `${dayjs().diff(dayjs(patient.ngaySinh), 'year')} tuổi` : 'Chưa có'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <UserOutlined style={{ marginRight: '8px' }} />
                      Giới tính:
                    </span>
                    <span className="info-value">
                      <Tag color={getGenderColor(patient.gioiTinh)}>
                        {getGenderText(patient.gioiTinh)}
                      </Tag>
                    </span>
                  </div>
                  {patient.soDienThoai && (
                    <div className="info-item">
                      <span className="info-label">
                        <PhoneOutlined style={{ marginRight: '8px' }} />
                        Số điện thoại:
                      </span>
                      <span className="info-value">{patient.soDienThoai}</span>
                    </div>
                  )}
                  {patient.email && (
                    <div className="info-item">
                      <span className="info-label">
                        <MailOutlined style={{ marginRight: '8px' }} />
                        Email:
                      </span>
                      <span className="info-value">{patient.email}</span>
                    </div>
                  )}
                  {patient.diaChi && (
                    <div className="info-item">
                      <span className="info-label">
                        <HomeOutlined style={{ marginRight: '8px' }} />
                        Địa chỉ:
                      </span>
                      <span className="info-value">{patient.diaChi}</span>
                    </div>
                  )}
                </div>
              </InfoCard>
            </Col>

            <Col xs={24} lg={12}>
              <InfoCard
                title={
                  <Space>
                    <MedicineBoxOutlined />
                    Thông tin y tế
                  </Space>
                }
              >
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">
                      <MedicineBoxOutlined style={{ marginRight: '8px' }} />
                      Nhóm máu:
                    </span>
                    <span className="info-value">
                      <Tag color="red" style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                        {patient.nhomMau || 'A+'}
                      </Tag>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <PhoneOutlined style={{ marginRight: '8px' }} />
                      Liên hệ khẩn cấp:
                    </span>
                    <span className="info-value">{patient.lienHeKhanCap || '0987654321 (Vợ)'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <FileTextOutlined style={{ marginRight: '8px' }} />
                      Tiền sử bệnh:
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
                        'Tiền sử bệnh tim mạch, huyết áp cao'
                      )}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <AlertOutlined style={{ marginRight: '8px' }} />
                      Dị ứng:
                    </span>
                    <span className="info-value">
                      {patient.danhSachDiUng && patient.danhSachDiUng.length > 0 ? (
                        <Space wrap>
                          {patient.danhSachDiUng.map((diUng) => (
                            <Tag key={diUng.id} color="red" style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                              {diUng.tenDiUng}
                            </Tag>
                          ))}
                        </Space>
                      ) : (
                        <Space wrap>
                          <Tag color="red" style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                            Penicillin
                          </Tag>
                          <Tag color="red" style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                            Aspirin
                          </Tag>
                          <Tag color="red" style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                            Sulfa drugs
                          </Tag>
                        </Space>
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
          Lịch sử điều trị
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
            <Title level={4}>Lịch sử điều trị</Title>
            <AddTreatmentButton
              icon={<PlusOutlined />}
              onClick={handleAddTreatment}
            >
              Thêm điều trị mới
            </AddTreatmentButton>
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
                          {dayjs(treatment.ngayKham).format('DD/MM/YYYY')}
                        </div>
                        <Badge
                          status={treatment.trangThai === 'HOAN_THANH' ? 'success' : 
                                 treatment.trangThai === 'DANG_THUC_HIEN' ? 'processing' : 
                                 treatment.trangThai === 'DA_DUYET' ? 'default' : 'warning'}
                          text={getTreatmentStatusText(treatment.trangThai)}
                        />
                      </div>

                      {/* Diagnosis */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>
                          Chẩn đoán
                        </div>
                        <div style={{ color: '#6b7280' }}>
                          {treatment.chuanDoan}
                        </div>
                      </div>

                      {/* Doctor and Prescription in a row */}
                      <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
                        {/* Doctor */}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <UserOutlined style={{ marginRight: '8px', color: '#6b7280' }} />
                            <span style={{ fontWeight: 'bold', color: '#374151' }}>Bác sĩ</span>
                          </div>
                          <div style={{ color: '#6b7280' }}>
                            {treatment.bacSi}
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {treatment.ghiChu && (
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>
                            Ghi chú
                          </div>
                          <div style={{ color: '#6b7280' }}>
                            {treatment.ghiChu}
                          </div>
                        </div>
                      )}

                      {/* Medicine List */}
                      {treatment.danhSachThuoc && treatment.danhSachThuoc.length > 0 && (
                        <div>
                          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>
                            Danh sách thuốc
                          </div>
                          <div style={{ color: '#6b7280', marginBottom: '8px' }}>
                            {treatment.danhSachThuoc.map(med => `${med.thuoc.tenThuoc} x ${med.lieuDung}`).join(', ')}
                          </div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {treatment.danhSachThuoc.map((med, index) => (
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
              message="Chưa có lịch sử điều trị"
              description="Bệnh nhân chưa có lịch sử điều trị nào."
              type="info"
              showIcon
            />
          )}
        </div>
      )
    }
  ]

  return (
    <div style={{ padding: '24px' }}>
      <BackButton onClick={() => navigate('/patients')}>
        <ArrowLeftOutlined /> Quay lại
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
            <Tag className="status-tag">Mã BN: {patient.maBenhNhan}</Tag>
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
        
        <div className="patient-actions">
          <ActionButton type="primary" icon={<EditOutlined />}>
            Chỉnh sửa
          </ActionButton>
        </div>
      </PatientHeader>

      <PatientStats>
        <Card>
          <Statistic
            title="Ngày tạo"
            value={dayjs(patient.ngayTao).format('DD/MM/YYYY')}
            prefix={<CalendarOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Ngày cập nhật"
            value={dayjs(patient.ngayCapNhat).format('DD/MM/YYYY')}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
        {patient.soBaoHiem && (
          <Card>
            <Statistic
              title="Số bảo hiểm"
              value={patient.soBaoHiem}
              prefix={<IdcardOutlined />}
            />
          </Card>
        )}
      </PatientStats>

      <StyledTabs
        defaultActiveKey="overview"
        items={tabItems}
        size="large"
      />
    </div>
  )
} 