import React from 'react'
import { Form } from 'antd'
import type { ThuocResponse } from '@/types'
import { useLanguage } from '@/hooks/useLanguage'
import { Modal, FormField } from '@/components'

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
  const { t } = useLanguage()

  const nhomThuocOptions = [
    { value: 'KHANG_SINH', label: t('medicine.groups.antibiotic') },
    { value: 'GIAM_DAU', label: t('medicine.groups.painkiller') },
    { value: 'CHONG_VIEM', label: t('medicine.groups.antiInflammatory') },
    { value: 'TIM_MACH', label: t('medicine.groups.cardiovascular') },
    { value: 'TIEU_HOA', label: t('medicine.groups.digestive') },
    { value: 'HOI_SUC', label: t('medicine.groups.respiratory') },
    { value: 'KHAC', label: t('medicine.groups.other') }
  ]

  return (
    <Modal
      visible={visible}
      title={editingMedicine ? t('medicine.editMedicine') : t('medicine.addMedicine')}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <FormField
          type="input"
          name="tenThuoc"
          label={t('medicine.drugName')}
          placeholder={t('medicine.drugName')}
          rules={[{ required: true, message: t('medicine.drugName') + ' ' + t('common.required') }]}
        />
        
        <FormField
          type="input"
          name="tenHoatChat"
          label={t('medicine.activeIngredientName')}
          placeholder={t('medicine.activeIngredientName')}
        />
        
        <FormField
          type="input"
          name="nongDo"
          label={t('medicine.concentrationValue')}
          placeholder={t('medicine.concentrationValue')}
        />
        
        <FormField
          type="input"
          name="dangBaoChe"
          label={t('medicine.dosageFormType')}
          placeholder={t('medicine.dosageFormType')}
        />
        
        <FormField
          type="input"
          name="hangSanXuat"
          label={t('medicine.manufacturerName')}
          placeholder={t('medicine.manufacturerName')}
        />
        
        <FormField
          type="input"
          name="nuocSanXuat"
          label={t('medicine.countryOfOrigin')}
          placeholder={t('medicine.countryOfOrigin')}
        />
        
        <FormField
          type="number"
          name="giaBan"
          label={t('medicine.priceValue')}
          placeholder={t('medicine.priceValue')}
          numberProps={{
            formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            min: 0
          }}
        />
        
        <FormField
          type="input"
          name="donViTinh"
          label={t('medicine.unitOfMeasurement')}
          placeholder={t('medicine.unitOfMeasurement')}
        />
        
        <FormField
          type="textarea"
          name="chiDinh"
          label={t('medicine.indicationsText')}
          placeholder={t('medicine.indicationsText')}
        />
        
        <FormField
          type="textarea"
          name="chongChiDinh"
          label={t('medicine.contraindicationsText')}
          placeholder={t('medicine.contraindicationsText')}
        />
        
        <FormField
          type="select"
          name="nhomThuoc"
          label={t('medicine.drugGroupType')}
          placeholder={t('medicine.drugGroupType')}
          options={nhomThuocOptions}
        />
      </Form>
    </Modal>
  )
} 