import React, { useState } from 'react'
import { 
  Modal,
  Form,
  Card,
  message,
  Button,
  Input,
  Select,
  Table,
  Tag,
  Space,
  Popconfirm
} from 'antd'
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined 
} from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import dayjs from 'dayjs'

const { Option } = Select

interface Prescription {
  id: number
  maDonThuoc: string
  benhNhan: {
    id: number
    hoTen: string
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
      giaBan: number
    }
    soLuong: number
    thanhTien: number
  }>
}

const mockPrescriptions: Prescription[] = [
  {
    id: 1,
    maDonThuoc: 'DT001',
    benhNhan: {
      id: 1,
      hoTen: 'Nguyễn Văn A'
    },
    bacSiKeDon: 'BS. Nguyễn Văn B',
    ghiChu: 'Uống sau ăn',
    trangThai: 'DA_DUYET',
    ngayKeDon: '2024-01-15T10:30:00',
    danhSachThuoc: [
      {
        id: 1,
        thuoc: {
          id: 1,
          tenThuoc: 'Paracetamol 500mg',
          giaBan: 5000
        },
        soLuong: 30,
        thanhTien: 150000
      }
    ]
  },
  {
    id: 2,
    maDonThuoc: 'DT002',
    benhNhan: {
      id: 2,
      hoTen: 'Trần Thị B'
    },
    bacSiKeDon: 'BS. Lê Văn C',
    ghiChu: 'Uống trước ăn 30 phút',
    trangThai: 'MOI_TAO',
    ngayKeDon: '2024-01-16T14:20:00',
    danhSachThuoc: [
      {
        id: 2,
        thuoc: {
          id: 2,
          tenThuoc: 'Amoxicillin 250mg',
          giaBan: 15000
        },
        soLuong: 20,
        thanhTien: 300000
      }
    ]
  }
]

export const PrescriptionList: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions)
  const [searchText, setSearchText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingPrescription, setEditingPrescription] = useState<Prescription | null>(null)
  const [form] = Form.useForm()
  const { t } = useLanguage()

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

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const handleAdd = () => {
    setEditingPrescription(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (prescription: Prescription) => {
    setEditingPrescription(prescription)
    form.setFieldsValue({
      benhNhanId: prescription.benhNhan.id,
      bacSiKeDon: prescription.bacSiKeDon,
      ghiChu: prescription.ghiChu
    })
    setIsModalVisible(true)
  }

  const handleView = (prescription: Prescription) => {
    // Navigate to prescription detail page
    console.log('View prescription:', prescription.id)
  }

  const handleDelete = (id: number) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id))
    message.success(t('prescription.deleteSuccess'))
  }

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingPrescription) {
        // Update prescription
        setPrescriptions(prescriptions.map(p => 
          p.id === editingPrescription.id 
            ? { ...p, ...values }
            : p
        ))
        message.success(t('prescription.updateSuccess'))
      } else {
        // Create new prescription
        const newPrescription: Prescription = {
          id: Date.now(),
          maDonThuoc: `DT${String(Date.now()).slice(-3)}`,
          benhNhan: {
            id: values.benhNhanId,
            hoTen: 'Bệnh nhân mới'
          },
          bacSiKeDon: values.bacSiKeDon,
          ghiChu: values.ghiChu,
          trangThai: 'MOI_TAO',
          ngayKeDon: new Date().toISOString(),
          danhSachThuoc: []
        }
        setPrescriptions([...prescriptions, newPrescription])
        message.success(t('prescription.createSuccess'))
      }
      setIsModalVisible(false)
    })
  }

  const columns = [
    {
      title: t('prescription.prescriptionCode'),
      dataIndex: 'maDonThuoc',
      key: 'maDonThuoc',
    },
    {
      title: t('prescription.patientName'),
      dataIndex: ['benhNhan', 'hoTen'],
      key: 'patientName',
    },
    {
      title: t('prescription.doctorName'),
      dataIndex: 'bacSiKeDon',
      key: 'doctorName',
    },
    {
      title: t('prescription.prescriptionDate'),
      dataIndex: 'ngayKeDon',
      key: 'prescriptionDate',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: t('prescription.prescriptionStatus'),
      dataIndex: 'trangThai',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: unknown, record: Prescription) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            title={t('common.view')}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            title={t('common.edit')}
          />
          <Popconfirm
            title={t('prescription.deleteConfirm')}
            description={t('prescription.deleteWarning')}
            onConfirm={() => handleDelete(record.id)}
            okText={t('common.save')}
            cancelText={t('common.cancel')}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              title={t('common.delete')}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.maDonThuoc.toLowerCase().includes(searchText.toLowerCase()) ||
    prescription.benhNhan.hoTen.toLowerCase().includes(searchText.toLowerCase()) ||
    prescription.bacSiKeDon.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2>{t('prescription.title')}</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            {t('prescription.addPrescription')}
          </Button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Input.Search
            placeholder={t('prescription.searchPrescription')}
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredPrescriptions}
          rowKey="id"
          pagination={{
            total: filteredPrescriptions.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} ${t('prescription.prescriptions')}`,
          }}
        />
      </Card>

      <Modal
        title={editingPrescription ? t('prescription.editPrescription') : t('prescription.addPrescription')}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="benhNhanId"
            label={t('prescription.patientName')}
            rules={[{ required: true, message: t('validation.required', { field: t('prescription.patientName') }) }]}
          >
            <Select placeholder={t('prescription.patientName')}>
              <Option value={1}>Nguyễn Văn A</Option>
              <Option value={2}>Trần Thị B</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="bacSiKeDon"
            label={t('prescription.doctorName')}
            rules={[{ required: true, message: t('validation.required', { field: t('prescription.doctorName') }) }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="ghiChu"
            label={t('prescription.prescriptionNotes')}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
} 