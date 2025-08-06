import React from 'react'
import { Form, Input, Select, InputNumber, Modal } from 'antd'
import type { ThuocResponse } from '@/types'

const { Option } = Select

interface MedicineFormProps {
  visible: boolean
  editingMedicine: ThuocResponse | null
  onCancel: () => void
  onOk: () => void
  form: ReturnType<typeof Form.useForm>[0]
}

export const MedicineForm: React.FC<MedicineFormProps> = ({
  visible,
  editingMedicine,
  onCancel,
  onOk,
  form
}) => {
  return (
    <Modal
      title={editingMedicine ? 'Chỉnh sửa thuốc' : 'Thêm thuốc mới'}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={600}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="tenThuoc"
          label="Tên thuốc"
          rules={[{ required: true, message: 'Vui lòng nhập tên thuốc' }]}
        >
          <Input placeholder="Nhập tên thuốc" />
        </Form.Item>
        
        <Form.Item
          name="tenHoatChat"
          label="Tên hoạt chất"
        >
          <Input placeholder="Nhập tên hoạt chất" />
        </Form.Item>
        
        <Form.Item
          name="nongDo"
          label="Nồng độ"
        >
          <Input placeholder="Nhập nồng độ" />
        </Form.Item>
        
        <Form.Item
          name="dangBaoChe"
          label="Dạng bào chế"
        >
          <Input placeholder="Nhập dạng bào chế" />
        </Form.Item>
        
        <Form.Item
          name="hangSanXuat"
          label="Hãng sản xuất"
        >
          <Input placeholder="Nhập hãng sản xuất" />
        </Form.Item>
        
        <Form.Item
          name="nuocSanXuat"
          label="Nước sản xuất"
        >
          <Input placeholder="Nhập nước sản xuất" />
        </Form.Item>
        
        <Form.Item
          name="giaBan"
          label="Giá bán"
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
            placeholder="Nhập giá bán"
          />
        </Form.Item>
        
        <Form.Item
          name="donViTinh"
          label="Đơn vị tính"
        >
          <Input placeholder="Nhập đơn vị tính" />
        </Form.Item>
        
        <Form.Item
          name="chiDinh"
          label="Chỉ định"
        >
          <Input.TextArea rows={3} placeholder="Nhập chỉ định" />
        </Form.Item>
        
        <Form.Item
          name="chongChiDinh"
          label="Chống chỉ định"
        >
          <Input.TextArea rows={3} placeholder="Nhập chống chỉ định" />
        </Form.Item>
        
        <Form.Item
          name="nhomThuoc"
          label="Nhóm thuốc"
        >
          <Select placeholder="Chọn nhóm thuốc">
            <Option value="KHANG_SINH">Kháng sinh</Option>
            <Option value="GIAM_DAU">Giảm đau</Option>
            <Option value="CHONG_VIEM">Chống viêm</Option>
            <Option value="TIM_MACH">Tim mạch</Option>
            <Option value="TIEU_HOA">Tiêu hóa</Option>
            <Option value="HOI_SUC">Hồi sức</Option>
            <Option value="KHAC">Khác</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
} 