import React from 'react'
import { Form, Input, Select, InputNumber, Modal } from 'antd'
import type { ThuocResponse } from '@/types'
import { useLanguage } from '@/hooks/useLanguage'

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
  const { t } = useLanguage()

  return (
    <Modal
      title={editingMedicine ? t('medicine.editMedicine') : t('medicine.addMedicine')}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={600}
      okText={t('common.save')}
      cancelText={t('common.cancel')}
      style={{ top: 20 }}
      bodyStyle={{ 
        maxHeight: '70vh', 
        overflowY: 'auto',
        paddingRight: '8px'
      }}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="tenThuoc"
          label={t('medicine.drugName')}
          rules={[{ required: true, message: t('medicine.drugName') + ' ' + t('common.required') }]}
        >
          <Input placeholder={t('medicine.drugName')} />
        </Form.Item>
        
        <Form.Item
          name="tenHoatChat"
          label={t('medicine.activeIngredientName')}
        >
          <Input placeholder={t('medicine.activeIngredientName')} />
        </Form.Item>
        
        <Form.Item
          name="nongDo"
          label={t('medicine.concentrationValue')}
        >
          <Input placeholder={t('medicine.concentrationValue')} />
        </Form.Item>
        
        <Form.Item
          name="dangBaoChe"
          label={t('medicine.dosageFormType')}
        >
          <Input placeholder={t('medicine.dosageFormType')} />
        </Form.Item>
        
        <Form.Item
          name="hangSanXuat"
          label={t('medicine.manufacturerName')}
        >
          <Input placeholder={t('medicine.manufacturerName')} />
        </Form.Item>
        
        <Form.Item
          name="nuocSanXuat"
          label={t('medicine.countryOfOrigin')}
        >
          <Input placeholder={t('medicine.countryOfOrigin')} />
        </Form.Item>
        
        <Form.Item
          name="giaBan"
          label={t('medicine.priceValue')}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
            placeholder={t('medicine.priceValue')}
          />
        </Form.Item>
        
        <Form.Item
          name="donViTinh"
          label={t('medicine.unitOfMeasurement')}
        >
          <Input placeholder={t('medicine.unitOfMeasurement')} />
        </Form.Item>
        
        <Form.Item
          name="chiDinh"
          label={t('medicine.indicationsText')}
        >
          <Input.TextArea rows={3} placeholder={t('medicine.indicationsText')} />
        </Form.Item>
        
        <Form.Item
          name="chongChiDinh"
          label={t('medicine.contraindicationsText')}
        >
          <Input.TextArea rows={3} placeholder={t('medicine.contraindicationsText')} />
        </Form.Item>
        
        <Form.Item
          name="nhomThuoc"
          label={t('medicine.drugGroupType')}
        >
          <Select placeholder={t('medicine.drugGroupType')}>
            <Option value="KHANG_SINH">{t('medicine.groups.antibiotic')}</Option>
            <Option value="GIAM_DAU">{t('medicine.groups.painkiller')}</Option>
            <Option value="CHONG_VIEM">{t('medicine.groups.antiInflammatory')}</Option>
            <Option value="TIM_MACH">{t('medicine.groups.cardiovascular')}</Option>
            <Option value="TIEU_HOA">{t('medicine.groups.digestive')}</Option>
            <Option value="HOI_SUC">{t('medicine.groups.respiratory')}</Option>
            <Option value="KHAC">{t('medicine.groups.other')}</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
} 