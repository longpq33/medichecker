import React from 'react'
import { Modal, Form, Input, Select, DatePicker } from 'antd'
import type { FormInstance } from 'antd/es/form'
import type { BenhNhanResponse } from '@/types'

const { Option } = Select

interface PatientFormProps {
  visible: boolean
  editingPatient: BenhNhanResponse | null
  onCancel: () => void
  onOk: () => void
  form: FormInstance
}

export const PatientForm: React.FC<PatientFormProps> = ({
  visible,
  editingPatient,
  onCancel,
  onOk,
  form
}) => {
  return (
    <Modal
      title={editingPatient ? 'Chỉnh sửa bệnh nhân' : 'Thêm bệnh nhân mới'}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="hoTen"
          label="Họ tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="ngaySinh"
          label="Ngày sinh"
        >
          <DatePicker 
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            placeholder="Chọn ngày sinh"
          />
        </Form.Item>
        
        <Form.Item
          name="gioiTinh"
          label="Giới tính"
        >
          <Select placeholder="Chọn giới tính">
            <Option value="NAM">Nam</Option>
            <Option value="NU">Nữ</Option>
            <Option value="KHAC">Khác</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="soDienThoai"
          label="Số điện thoại"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại' },
            { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: 'email', message: 'Email không hợp lệ' }
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="diaChi"
          label="Địa chỉ"
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        
        <Form.Item
          name="soBaoHiem"
          label="Số bảo hiểm"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
} 