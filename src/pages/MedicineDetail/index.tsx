import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Card, 
  Descriptions, 
  Tag, 
  Button, 
  Space, 
  Divider,
  Typography,
  Row,
  Col,
  Statistic,
  Alert
} from 'antd'
import { 
  ArrowLeftOutlined, 
  MedicineBoxOutlined,
  DollarOutlined,
  CalendarOutlined,
  SafetyOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import dayjs from 'dayjs'

const { Title } = Typography

interface MedicineDetail {
  id: number
  maThuoc: string
  tenThuoc: string
  tenHoatChat: string
  nongDo: string
  dangBaoChe: string
  hangSanXuat: string
  nuocSanXuat: string
  giaBan: number
  donViTinh: string
  chiDinh: string
  chongChiDinh: string
  tacDungPhu: string
  lieuDungNguoiLon: string
  lieuDungTreEm: string
  nhomThuoc: 'KHANG_SINH' | 'GIAM_DAU' | 'CHONG_VIEM' | 'TIM_MACH' | 'TIEU_HOA' | 'HOI_SUC' | 'KHAC'
  kichHoat: boolean
  ngayTao: string
  ngayHetHan: string
  soLuongTon: number
  donViNhoNhat: string
  baoQuan: string
  thanhPhan: string
  quyCach: string
  dangKiemSoat: boolean
  thuocKeDon: boolean
  thuocBaoHiem: boolean
}

const mockMedicineDetail: MedicineDetail = {
  id: 1,
  maThuoc: 'T001',
  tenThuoc: 'Paracetamol 500mg',
  tenHoatChat: 'Paracetamol',
  nongDo: '500mg',
  dangBaoChe: 'Viên nén',
  hangSanXuat: 'Công ty Dược phẩm ABC',
  nuocSanXuat: 'Việt Nam',
  giaBan: 5000,
  donViTinh: 'Viên',
  chiDinh: 'Giảm đau, hạ sốt trong các trường hợp: đau đầu, đau răng, đau cơ, đau khớp, đau bụng kinh, sốt do cảm cúm, sốt do nhiễm khuẩn.',
  chongChiDinh: 'Quá mẫn với paracetamol hoặc bất kỳ thành phần nào của thuốc. Bệnh nhân suy gan nặng.',
  tacDungPhu: 'Hiếm gặp: phản ứng dị ứng, mày đay, phù mạch. Rất hiếm: giảm bạch cầu, thiếu máu, tổn thương gan.',
  lieuDungNguoiLon: 'Người lớn và trẻ em trên 12 tuổi: 1-2 viên/lần, 3-4 lần/ngày. Không quá 8 viên/ngày.',
  lieuDungTreEm: 'Trẻ em 6-12 tuổi: 0.5-1 viên/lần, 3-4 lần/ngày. Trẻ em dưới 6 tuổi: tham khảo ý kiến bác sĩ.',
  nhomThuoc: 'GIAM_DAU',
  kichHoat: true,
  ngayTao: '2024-01-01T00:00:00',
  ngayHetHan: '2026-12-31T00:00:00',
  soLuongTon: 1000,
  donViNhoNhat: 'Hộp 10 vỉ x 10 viên',
  baoQuan: 'Bảo quản ở nhiệt độ không quá 30°C, tránh ánh sáng trực tiếp và ẩm.',
  thanhPhan: 'Paracetamol 500mg, tá dược vừa đủ 1 viên.',
  quyCach: 'Hộp 10 vỉ x 10 viên',
  dangKiemSoat: false,
  thuocKeDon: false,
  thuocBaoHiem: true
}

export const MedicineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useLanguage()
  
  // Mock data - trong thực tế sẽ fetch từ API dựa trên id
  const medicine = mockMedicineDetail
  
  // Log id để tránh lỗi unused variable
  console.log('Medicine ID:', id)

  const getDrugGroupText = (group: string) => {
    switch (group) {
      case 'KHANG_SINH':
        return 'Kháng sinh'
      case 'GIAM_DAU':
        return 'Giảm đau'
      case 'CHONG_VIEM':
        return 'Chống viêm'
      case 'TIM_MACH':
        return 'Tim mạch'
      case 'TIEU_HOA':
        return 'Tiêu hóa'
      case 'HOI_SUC':
        return 'Hồi sức'
      case 'KHAC':
        return 'Khác'
      default:
        return group
    }
  }

  const getDrugGroupColor = (group: string) => {
    switch (group) {
      case 'KHANG_SINH':
        return 'red'
      case 'GIAM_DAU':
        return 'blue'
      case 'CHONG_VIEM':
        return 'orange'
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

  const isExpired = dayjs(medicine.ngayHetHan).isBefore(dayjs())
  const isExpiringSoon = dayjs(medicine.ngayHetHan).diff(dayjs(), 'month') <= 3

  return (
    <div>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/medicines')}
            >
              Quay lại
            </Button>
            <Title level={3} style={{ margin: 0 }}>
              {t('medicine.medicineInfo')} - {medicine.maThuoc}
            </Title>
          </Space>
        </div>

        {(isExpired || isExpiringSoon) && (
          <Alert
            message={isExpired ? "Thuốc đã hết hạn!" : "Thuốc sắp hết hạn!"}
            description={isExpired 
              ? `Thuốc đã hết hạn từ ${dayjs(medicine.ngayHetHan).format('DD/MM/YYYY')}`
              : `Thuốc sẽ hết hạn vào ${dayjs(medicine.ngayHetHan).format('DD/MM/YYYY')}`
            }
            type={isExpired ? "error" : "warning"}
            showIcon
            style={{ marginBottom: '16px' }}
          />
        )}

        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={8}>
            <Statistic
              title="Giá bán"
              value={medicine.giaBan}
              prefix={<DollarOutlined />}
              suffix="VNĐ"
              valueStyle={{ color: '#3f8600' }}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title="Tồn kho"
              value={medicine.soLuongTon}
              prefix={<MedicineBoxOutlined />}
              suffix={medicine.donViTinh}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title="Ngày hết hạn"
              value={dayjs(medicine.ngayHetHan).format('DD/MM/YYYY')}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: isExpired ? '#cf1322' : isExpiringSoon ? '#faad14' : '#3f8600' }}
            />
          </Col>
        </Row>

        <Divider orientation="left">
          <Title level={4}>Thông tin cơ bản</Title>
        </Divider>

        <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
          <Descriptions.Item label={t('medicine.medicineCode')} span={2}>
            {medicine.maThuoc}
          </Descriptions.Item>
          <Descriptions.Item label={t('medicine.medicineName')} span={2}>
            {medicine.tenThuoc}
          </Descriptions.Item>
          <Descriptions.Item label="Hoạt chất" span={2}>
            {medicine.tenHoatChat}
          </Descriptions.Item>
          <Descriptions.Item label="Nồng độ" span={2}>
            {medicine.nongDo}
          </Descriptions.Item>
          <Descriptions.Item label="Dạng bào chế" span={2}>
            {medicine.dangBaoChe}
          </Descriptions.Item>
          <Descriptions.Item label="Hãng sản xuất" span={2}>
            {medicine.hangSanXuat}
          </Descriptions.Item>
          <Descriptions.Item label="Nước sản xuất" span={2}>
            {medicine.nuocSanXuat}
          </Descriptions.Item>
          <Descriptions.Item label="Nhóm thuốc" span={2}>
            <Tag color={getDrugGroupColor(medicine.nhomThuoc)}>
              {getDrugGroupText(medicine.nhomThuoc)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Đơn vị tính" span={1}>
            {medicine.donViTinh}
          </Descriptions.Item>
          <Descriptions.Item label="Quy cách" span={1}>
            {medicine.quyCach}
          </Descriptions.Item>
          <Descriptions.Item label="Thành phần" span={4}>
            {medicine.thanhPhan}
          </Descriptions.Item>
          <Descriptions.Item label="Bảo quản" span={4}>
            {medicine.baoQuan}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">
          <Title level={4}>Thông tin y tế</Title>
        </Divider>

        <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Chỉ định" span={4}>
            {medicine.chiDinh}
          </Descriptions.Item>
          <Descriptions.Item label="Chống chỉ định" span={4}>
            {medicine.chongChiDinh}
          </Descriptions.Item>
          <Descriptions.Item label="Tác dụng phụ" span={4}>
            {medicine.tacDungPhu}
          </Descriptions.Item>
          <Descriptions.Item label="Liều dùng người lớn" span={2}>
            {medicine.lieuDungNguoiLon}
          </Descriptions.Item>
          <Descriptions.Item label="Liều dùng trẻ em" span={2}>
            {medicine.lieuDungTreEm}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">
          <Title level={4}>Thông tin quản lý</Title>
        </Divider>

        <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Ngày tạo" span={2}>
            {dayjs(medicine.ngayTao).format('DD/MM/YYYY HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày hết hạn" span={2}>
            {dayjs(medicine.ngayHetHan).format('DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" span={1}>
            <Tag color={medicine.kichHoat ? 'green' : 'red'}>
              {medicine.kichHoat ? 'Hoạt động' : 'Không hoạt động'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Đăng kiểm soát" span={1}>
            <Tag color={medicine.dangKiemSoat ? 'orange' : 'default'}>
              {medicine.dangKiemSoat ? 'Có' : 'Không'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Thuốc kê đơn" span={1}>
            <Tag color={medicine.thuocKeDon ? 'red' : 'default'}>
              {medicine.thuocKeDon ? 'Có' : 'Không'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Thuốc bảo hiểm" span={1}>
            <Tag color={medicine.thuocBaoHiem ? 'blue' : 'default'}>
              {medicine.thuocBaoHiem ? 'Có' : 'Không'}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">
          <Title level={4}>Lưu ý quan trọng</Title>
        </Divider>

        <Card size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Alert
              message="Chỉ định"
              description={medicine.chiDinh}
              type="info"
              showIcon
              icon={<InfoCircleOutlined />}
            />
            <Alert
              message="Chống chỉ định"
              description={medicine.chongChiDinh}
              type="warning"
              showIcon
              icon={<SafetyOutlined />}
            />
            <Alert
              message="Tác dụng phụ"
              description={medicine.tacDungPhu}
              type="error"
              showIcon
              icon={<MedicineBoxOutlined />}
            />
          </Space>
        </Card>
      </Card>
    </div>
  )
} 