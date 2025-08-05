import React from 'react'
import { Form, Input, Select, InputNumber, DatePicker, Modal } from 'antd'
import { useLanguage } from '@/hooks/useLanguage'

const { Option } = Select

interface Medicine {
  id: string
  name: string
  code: string
  category: string
  manufacturer: string
  price: number
  stock: number
  unit: string
  status: 'available' | 'out_of_stock' | 'discontinued'
  expiryDate: string
}

interface MedicineFormProps {
  visible: boolean
  editingMedicine: Medicine | null
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
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label={t('medicine.medicineName')}
          rules={[{ required: true, message: t('validation.required', { field: t('medicine.medicineName') }) }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="code"
          label={t('medicine.medicineCode')}
          rules={[{ required: true, message: t('validation.required', { field: t('medicine.medicineCode') }) }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="category"
          label={t('medicine.category')}
          rules={[{ required: true, message: t('validation.required', { field: t('medicine.category') }) }]}
        >
          <Select>
            <Option value="Thuốc giảm đau">Thuốc giảm đau</Option>
            <Option value="Thuốc kháng sinh">Thuốc kháng sinh</Option>
            <Option value="Vitamin">Vitamin</Option>
            <Option value="Thuốc tim mạch">Thuốc tim mạch</Option>
            <Option value="Thuốc tiêu hóa">Thuốc tiêu hóa</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="manufacturer"
          label={t('medicine.manufacturer')}
          rules={[{ required: true, message: t('validation.required', { field: t('medicine.manufacturer') }) }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="price"
          label={t('medicine.price')}
          rules={[{ required: true, message: t('validation.required', { field: t('medicine.price') }) }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
          />
        </Form.Item>
        
        <Form.Item
          name="stock"
          label={t('medicine.stock')}
          rules={[{ required: true, message: t('validation.required', { field: t('medicine.stock') }) }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
          />
        </Form.Item>
        
        <Form.Item
          name="unit"
          label={t('medicine.unit')}
          rules={[{ required: true, message: t('validation.required', { field: t('medicine.unit') }) }]}
        >
          <Select>
            <Option value="Viên">Viên</Option>
            <Option value="Chai">Chai</Option>
            <Option value="Hộp">Hộp</Option>
            <Option value="Gói">Gói</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="status"
          label={t('common.status')}
          rules={[{ required: true, message: t('validation.required', { field: t('common.status') }) }]}
        >
          <Select>
            <Option value="available">{t('medicine.available')}</Option>
            <Option value="out_of_stock">{t('medicine.outOfStock')}</Option>
            <Option value="discontinued">{t('medicine.discontinued')}</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="expiryDate"
          label={t('medicine.expiryDate')}
          rules={[{ required: true, message: t('validation.required', { field: t('medicine.expiryDate') }) }]}
        >
          <DatePicker 
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
} 