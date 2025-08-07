import React from 'react'
import { Modal, Form, Input, Select, DatePicker } from 'antd'
import type { FormInstance } from 'antd/es/form'
import type { BenhNhanResponse } from '@/types'
import { useLanguage } from '@/hooks/useLanguage'

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
  const { t } = useLanguage()

  return (
    <Modal
      title={editingPatient ? t('patient.editPatient') : t('patient.addPatient')}
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
          label={t('patient.fullName')}
          rules={[{ required: true, message: t('patient.fullName') + ' ' + t('common.required') }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="ngaySinh"
          label={t('patient.dateOfBirth')}
        >
          <DatePicker 
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            placeholder={t('patient.dateOfBirth')}
          />
        </Form.Item>
        
        <Form.Item
          name="gioiTinh"
          label={t('common.gender')}
        >
          <Select placeholder={t('common.gender')}>
            <Option value="NAM">{t('common.male')}</Option>
            <Option value="NU">{t('common.female')}</Option>
            <Option value="KHAC">{t('common.other')}</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="soDienThoai"
          label={t('common.phone')}
          rules={[
            { required: true, message: t('common.phone') + ' ' + t('common.required') },
            { pattern: /^[0-9]{10,11}$/, message: t('common.phone') + ' ' + t('common.invalid') }
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="email"
          label={t('common.email')}
          rules={[
            { type: 'email', message: t('common.email') + ' ' + t('common.invalid') }
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="diaChi"
          label={t('common.address')}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        
        <Form.Item
          name="soBaoHiem"
          label={t('patient.insurance')}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
} 