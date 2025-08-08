import React from 'react'
import { Form } from 'antd'
import type { FormInstance } from 'antd/es/form'
import type { BenhNhanResponse } from '@/types'
import { useLanguage } from '@/hooks/useLanguage'
import { Modal, FormField } from '@/components'

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

  const genderOptions = [
    { value: 'NAM', label: t('common.male') },
    { value: 'NU', label: t('common.female') },
    { value: 'KHAC', label: t('common.other') }
  ]

  return (
    <Modal
      visible={visible}
      title={editingPatient ? t('patient.editPatient') : t('patient.addPatient')}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <FormField
          type="input"
          name="hoTen"
          label={t('patient.fullName')}
          placeholder={t('patient.fullName')}
          rules={[{ required: true, message: t('patient.fullName') + ' ' + t('common.required') }]}
        />
        
        <FormField
          type="date"
          name="ngaySinh"
          label={t('patient.dateOfBirth')}
          placeholder={t('patient.dateOfBirth')}
        />
        
        <FormField
          type="select"
          name="gioiTinh"
          label={t('common.gender')}
          placeholder={t('common.gender')}
          options={genderOptions}
        />
        
        <FormField
          type="input"
          name="soDienThoai"
          label={t('common.phone')}
          placeholder={t('common.phone')}
          rules={[
            { required: true, message: t('common.phone') + ' ' + t('common.required') },
            { pattern: /^[0-9]{10,11}$/, message: t('common.phone') + ' ' + t('common.invalid') }
          ]}
        />
        
        <FormField
          type="input"
          name="email"
          label={t('common.email')}
          placeholder={t('common.email')}
          rules={[
            { type: 'email', message: t('common.email') + ' ' + t('common.invalid') }
          ]}
        />
        
        <FormField
          type="textarea"
          name="diaChi"
          label={t('common.address')}
          placeholder={t('common.address')}
        />
        
        <FormField
          type="input"
          name="soBaoHiem"
          label={t('patient.insurance')}
          placeholder={t('patient.insurance')}
        />
      </Form>
    </Modal>
  )
} 