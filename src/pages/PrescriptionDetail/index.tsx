import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Card, 
  Descriptions, 
  Table, 
  Tag, 
  Button, 
  Space, 
  Divider,
  Typography,
  Row,
  Col,
  Statistic
} from 'antd'
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  DollarOutlined, 
  MedicineBoxOutlined, 
  CalendarOutlined 
} from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import dayjs from 'dayjs'

const { Title, Text } = Typography

interface PrescriptionDetail {
  id: number
  maDonThuoc: string
  benhNhan: {
    id: number
    hoTen: string
    soDienThoai: string
    email: string
    ngaySinh: string
    gioiTinh: string
    diaChi: string
  }
  bacSiKeDon: string
  ghiChu?: string
  trangThai: 'MOI_TAO' | 'DA_DUYET' | 'DANG_THUC_HIEN' | 'HOAN_THANH' | 'HUY_BO'
  ngayKeDon: string
  danhSachThuoc: Array<{
    id: number
    thuoc: {
      id: number
      tenThuoc: string
      maThuoc: string
      giaBan: number
      donViTinh: string
      hangSanXuat: string
    }
    soLuong: number
    lieuDung: string
    duongDung: string
    tanSuat: string
    thoiGianDung: string
    huongDanSuDung: string
    giaDonVi: number
    thanhTien: number
  }>
}

const mockPrescriptionDetail: PrescriptionDetail = {
  id: 1,
  maDonThuoc: 'DT001',
  benhNhan: {
    id: 1,
    hoTen: 'Nguyễn Văn A',
    soDienThoai: '0901234567',
    email: 'nguyenvana@email.com',
    ngaySinh: '1990-01-15',
    gioiTinh: 'NAM',
    diaChi: '123 Đường ABC, Quận 1, TP.HCM'
  },
  bacSiKeDon: 'BS. Nguyễn Văn B',
  ghiChu: 'Uống sau ăn 30 phút. Không uống rượu bia trong thời gian điều trị.',
  trangThai: 'DA_DUYET',
  ngayKeDon: '2024-01-15T10:30:00',
  danhSachThuoc: [
    {
      id: 1,
      thuoc: {
        id: 1,
        tenThuoc: 'Paracetamol 500mg',
        maThuoc: 'T001',
        giaBan: 5000,
        donViTinh: 'Viên',
        hangSanXuat: 'Công ty Dược ABC'
      },
      soLuong: 30,
      lieuDung: '1 viên/lần',
      duongDung: 'Uống',
      tanSuat: '3 lần/ngày',
      thoiGianDung: '7 ngày',
      huongDanSuDung: 'Uống sau ăn 30 phút',
      giaDonVi: 5000,
      thanhTien: 150000
    },
    {
      id: 2,
      thuoc: {
        id: 2,
        tenThuoc: 'Amoxicillin 250mg',
        maThuoc: 'T002',
        giaBan: 15000,
        donViTinh: 'Viên',
        hangSanXuat: 'Công ty Dược XYZ'
      },
      soLuong: 20,
      lieuDung: '1 viên/lần',
      duongDung: 'Uống',
      tanSuat: '2 lần/ngày',
      thoiGianDung: '10 ngày',
      huongDanSuDung: 'Uống trước ăn 1 giờ',
      giaDonVi: 15000,
      thanhTien: 300000
    }
  ]
}

export const PrescriptionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useLanguage()
  
  // Mock data - trong thực tế sẽ fetch từ API dựa trên id
  const prescription = mockPrescriptionDetail

  // Sử dụng id để tránh lỗi unused variable
  React.useEffect(() => {
    if (id) {
      // TODO: Fetch prescription data based on id
    }
  }, [id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'MOI_TAO':
        return 'blue'
      case 'DA_DUYET':
        return 'green'
      case 'DANG_THUC_HIEN':
        return 'orange'
      case 'HOAN_THANH':
        return 'green'
      case 'HUY_BO':
        return 'red'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'MOI_TAO':
        return t('prescription.status.new')
      case 'DA_DUYET':
        return t('prescription.status.approved')
      case 'DANG_THUC_HIEN':
        return t('prescription.status.inProgress')
      case 'HOAN_THANH':
        return t('prescription.status.completed')
      case 'HUY_BO':
        return t('prescription.status.cancelled')
      default:
        return status
    }
  }

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'NAM':
        return t('common.male')
      case 'NU':
        return t('common.female')
      case 'KHAC':
        return t('common.other')
      default:
        return gender
    }
  }

  const medicineColumns = [
    {
      title: t('medicine.medicineName'),
      dataIndex: ['thuoc', 'tenThuoc'],
      key: 'medicineName',
    },
    {
      title: t('medicine.medicineCode'),
      dataIndex: ['thuoc', 'maThuoc'],
      key: 'medicineCode',
    },
    {
      title: t('medicine.medicineStock'),
      dataIndex: 'soLuong',
      key: 'quantity',
    },
    {
      title: t('medicine.medicineUnit'),
      dataIndex: ['thuoc', 'donViTinh'],
      key: 'unit',
    },
    {
      title: 'Liều dùng',
      dataIndex: 'lieuDung',
      key: 'dosage',
    },
    {
      title: 'Tần suất',
      dataIndex: 'tanSuat',
      key: 'frequency',
    },
    {
      title: 'Thời gian',
      dataIndex: 'thoiGianDung',
      key: 'duration',
    },
    {
      title: t('medicine.sellingPrice'),
      dataIndex: 'giaDonVi',
      key: 'unitPrice',
      render: (price: number) => `${price.toLocaleString('vi-VN')} VNĐ`,
    },
    {
      title: t('prescription.totalAmount'),
      dataIndex: 'thanhTien',
      key: 'total',
      render: (total: number) => `${total.toLocaleString('vi-VN')} VNĐ`,
    },
  ]

  const totalAmount = prescription.danhSachThuoc.reduce((sum, item) => sum + item.thanhTien, 0)

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/prescriptions')}
            >
              Quay lại
            </Button>
            <Title level={3} style={{ margin: 0 }}>
              {t('prescription.prescriptionInfo')} - {prescription.maDonThuoc}
            </Title>
          </Space>
          <Space>
            <Button icon={<EditOutlined />} type="primary">
              {t('common.edit')}
            </Button>
          </Space>
        </div>

        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={8}>
            <Statistic
              title="Tổng tiền"
              value={totalAmount}
              prefix={<DollarOutlined />}
              suffix="VNĐ"
              valueStyle={{ color: '#3f8600' }}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title="Số loại thuốc"
              value={prescription.danhSachThuoc.length}
              prefix={<MedicineBoxOutlined />}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title="Ngày kê đơn"
              value={dayjs(prescription.ngayKeDon).format('DD/MM/YYYY')}
              prefix={<CalendarOutlined />}
            />
          </Col>
        </Row>

        <Divider orientation="left">
          <Title level={4}>Thông tin đơn thuốc</Title>
        </Divider>

        <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
          <Descriptions.Item label={t('prescription.prescriptionCode')} span={2}>
            {prescription.maDonThuoc}
          </Descriptions.Item>
          <Descriptions.Item label={t('prescription.doctorName')} span={2}>
            {prescription.bacSiKeDon}
          </Descriptions.Item>
          <Descriptions.Item label={t('prescription.prescriptionDate')} span={2}>
            {dayjs(prescription.ngayKeDon).format('DD/MM/YYYY HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label={t('prescription.prescriptionStatus')} span={2}>
            <Tag color={getStatusColor(prescription.trangThai)}>
              {getStatusText(prescription.trangThai)}
            </Tag>
          </Descriptions.Item>
          {prescription.ghiChu && (
            <Descriptions.Item label={t('prescription.prescriptionNotes')} span={4}>
              {prescription.ghiChu}
            </Descriptions.Item>
          )}
        </Descriptions>

        <Divider orientation="left">
          <Title level={4}>Thông tin bệnh nhân</Title>
        </Divider>

        <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
          <Descriptions.Item label={t('prescription.patientName')} span={2}>
            {prescription.benhNhan.hoTen}
          </Descriptions.Item>
          <Descriptions.Item label={t('common.phone')} span={2}>
            {prescription.benhNhan.soDienThoai}
          </Descriptions.Item>
          <Descriptions.Item label={t('common.email')} span={2}>
            {prescription.benhNhan.email}
          </Descriptions.Item>
          <Descriptions.Item label={t('common.age')} span={1}>
            {dayjs().diff(dayjs(prescription.benhNhan.ngaySinh), 'year')} tuổi
          </Descriptions.Item>
          <Descriptions.Item label={t('common.gender')} span={1}>
            {getGenderText(prescription.benhNhan.gioiTinh)}
          </Descriptions.Item>
          <Descriptions.Item label={t('common.address')} span={4}>
            {prescription.benhNhan.diaChi}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">
          <Title level={4}>Danh sách thuốc</Title>
        </Divider>

        <Table
          columns={medicineColumns}
          dataSource={prescription.danhSachThuoc}
          rowKey="id"
          pagination={false}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={8}>
                <Text strong>Tổng cộng:</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text strong>{totalAmount.toLocaleString('vi-VN')} VNĐ</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />

        <Divider orientation="left">
          <Title level={4}>Hướng dẫn sử dụng</Title>
        </Divider>

        <Card size="small">
          {prescription.danhSachThuoc.map((medicine, index) => (
            <div key={medicine.id} style={{ marginBottom: '16px' }}>
              <Text strong>{index + 1}. {medicine.thuoc.tenThuoc}</Text>
              <br />
              <Text type="secondary">
                - Liều dùng: {medicine.lieuDung} - {medicine.tanSuat}
                <br />
                - Thời gian: {medicine.thoiGianDung}
                <br />
                - Hướng dẫn: {medicine.huongDanSuDung}
              </Text>
              {index < prescription.danhSachThuoc.length - 1 && <Divider />}
            </div>
          ))}
        </Card>
      </Card>
    </div>
  )
} 