import React from 'react'
import { Form, Input, Select, Modal } from 'antd'
import { useLanguage } from '@/hooks/useLanguage'

const { Option } = Select

interface Patient {
  id: string
  name: string
  phone: string
  email: string
  age: number
  gender: 'male' | 'female' | 'other'
  address: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
}

interface PatientFormProps {
  visible: boolean
  editingPatient: Patient | null
  onCancel: () => void
  onOk: () => void
  form: any
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
          name="name"
          label={t('patient.patientName')}
          rules={[{ required: true, message: t('validation.required', { field: t('patient.patientName') }) }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="phone"
          label={t('common.phone')}
          rules={[{ required: true, message: t('validation.required', { field: t('common.phone') }) }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="email"
          label={t('common.email')}
          rules={[
            { required: true, message: t('validation.required', { field: t('common.email') }) },
            { type: 'email', message: t('validation.email') }
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="age"
          label={t('common.age')}
          rules={[{ required: true, message: t('validation.required', { field: t('common.age') }) }]}
        >
          <Input type="number" />
        </Form.Item>
        
        <Form.Item
          name="gender"
          label={t('common.gender')}
          rules={[{ required: true, message: t('validation.required', { field: t('common.gender') }) }]}
        >
          <Select>
            <Option value="male">{t('common.male')}</Option>
            <Option value="female">{t('common.female')}</Option>
            <Option value="other">{t('common.other')}</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="address"
          label={t('common.address')}
          rules={[{ required: true, message: t('validation.required', { field: t('common.address') }) }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        
        <Form.Item
          name="status"
          label={t('common.status')}
          rules={[{ required: true, message: t('validation.required', { field: t('common.status') }) }]}
        >
          <Select>
            <Option value="active">{t('common.active')}</Option>
            <Option value="inactive">{t('common.inactive')}</Option>
            <Option value="pending">{t('common.pending')}</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
} 