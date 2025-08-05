import React from 'react'
import { Form, Input, Select, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import { MedicineItem as StyledMedicineItem } from '../styled'

const { Option } = Select

interface Medicine {
  id: string
  name: string
  quantity: string
  unit: string
  frequency: string
  duration: string
}

interface MedicineItemProps {
  medicine: Medicine
  index: number
  onMedicineChange: (medicineId: string, field: keyof Medicine, value: string) => void
  onRemove: (medicineId: string) => void
  onFieldTouch: (medicineId: string, field: keyof Medicine) => void
  mockMedicines: Array<{ id: string; name: string; dosage: string }>
  validateMedicine: (medicine: Medicine, index: number, forceValidate?: boolean) => string[]
}

export const MedicineItem: React.FC<MedicineItemProps> = ({
  medicine,
  index,
  onMedicineChange,
  onRemove,
  onFieldTouch,
  mockMedicines,
  validateMedicine
}) => {
  const { t } = useLanguage()
  const errors = validateMedicine(medicine, index)
  const nameErrors = errors.filter(error => error.includes(t('treatment.validation.selectMedicine')))
  const quantityErrors = errors.filter(error => error.includes(t('treatment.validation.enterQuantity')))
  const unitErrors = errors.filter(error => error.includes(t('treatment.validation.selectUnit')))
  const frequencyErrors = errors.filter(error => error.includes(t('treatment.validation.selectFrequency')))
  const durationErrors = errors.filter(error => error.includes(t('treatment.validation.selectDuration')))

  const unitOptions = [
    { value: 'viên', label: t('treatment.units.pill') },
    { value: 'chai', label: t('treatment.units.bottle') },
    { value: 'hộp', label: t('treatment.units.box') },
    { value: 'gói', label: t('treatment.units.pack') },
    { value: 'ml', label: 'ml' },
    { value: 'mg', label: 'mg' },
    { value: 'g', label: 'g' },
  ]

  const frequencyOptions = [
    { value: '1 lần/ngày', label: t('treatment.frequencies.onceDaily') },
    { value: '2 lần/ngày', label: t('treatment.frequencies.twiceDaily') },
    { value: '3 lần/ngày', label: t('treatment.frequencies.thriceDaily') },
    { value: '4 lần/ngày', label: t('treatment.frequencies.fourTimesDaily') },
    { value: '1 lần/tuần', label: t('treatment.frequencies.onceWeekly') },
    { value: '2 lần/tuần', label: t('treatment.frequencies.twiceWeekly') },
    { value: '1 lần/tháng', label: t('treatment.frequencies.onceMonthly') },
  ]

  const durationOptions = [
    { value: '3 ngày', label: t('treatment.durations.threeDays') },
    { value: '5 ngày', label: t('treatment.durations.fiveDays') },
    { value: '7 ngày', label: t('treatment.durations.sevenDays') },
    { value: '10 ngày', label: t('treatment.durations.tenDays') },
    { value: '14 ngày', label: t('treatment.durations.fourteenDays') },
    { value: '21 ngày', label: t('treatment.durations.twentyOneDays') },
    { value: '30 ngày', label: t('treatment.durations.thirtyDays') },
    { value: '1 tháng', label: t('treatment.durations.oneMonth') },
    { value: '2 tháng', label: t('treatment.durations.twoMonths') },
    { value: '3 tháng', label: t('treatment.durations.threeMonths') },
    { value: '6 tháng', label: t('treatment.durations.sixMonths') },
    { value: '1 năm', label: t('treatment.durations.oneYear') },
  ]

  const handleFieldChange = (field: keyof Medicine, value: string) => {
    onFieldTouch(medicine.id, field)
    onMedicineChange(medicine.id, field, value)
  }

  return (
    <StyledMedicineItem>
      <Form.Item
        label={t('treatment.medicine')}
        className="medicine-select"
        required
        validateStatus={nameErrors.length > 0 ? 'error' : ''}
        help={nameErrors.join(' ')}
      >
        <Select
          placeholder={t('treatment.medicinePlaceholder')}
          size="large"
          value={medicine.name}
          onChange={(value) => handleFieldChange('name', value)}
          onFocus={() => onFieldTouch(medicine.id, 'name')}
          showSearch
          filterOption={(input, option) =>
            (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
          }
        >
          {mockMedicines.map(med => (
            <Option key={med.id} value={med.name}>
              {med.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={t('treatment.quantity')}
        className="quantity-input"
        required
        validateStatus={quantityErrors.length > 0 ? 'error' : ''}
        help={quantityErrors.join(' ')}
      >
        <Input
          placeholder={t('treatment.quantityPlaceholder')}
          size="large"
          value={medicine.quantity}
          onChange={(e) => handleFieldChange('quantity', e.target.value)}
          onFocus={() => onFieldTouch(medicine.id, 'quantity')}
          type="number"
          min="1"
        />
      </Form.Item>

      <Form.Item
        label={t('treatment.unit')}
        className="unit-select"
        required
        validateStatus={unitErrors.length > 0 ? 'error' : ''}
        help={unitErrors.join(' ')}
      >
        <Select
          placeholder={t('treatment.unitPlaceholder')}
          size="large"
          value={medicine.unit}
          onChange={(value) => handleFieldChange('unit', value)}
          onFocus={() => onFieldTouch(medicine.id, 'unit')}
        >
          {unitOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={t('treatment.frequency')}
        className="frequency-select"
        required
        validateStatus={frequencyErrors.length > 0 ? 'error' : ''}
        help={frequencyErrors.join(' ')}
      >
        <Select
          placeholder={t('treatment.frequencyPlaceholder')}
          size="large"
          value={medicine.frequency}
          onChange={(value) => handleFieldChange('frequency', value)}
          onFocus={() => onFieldTouch(medicine.id, 'frequency')}
        >
          {frequencyOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={t('treatment.duration')}
        className="duration-select"
        required
        validateStatus={durationErrors.length > 0 ? 'error' : ''}
        help={durationErrors.join(' ')}
      >
        <Select
          placeholder={t('treatment.durationPlaceholder')}
          size="large"
          value={medicine.duration}
          onChange={(value) => handleFieldChange('duration', value)}
          onFocus={() => onFieldTouch(medicine.id, 'duration')}
        >
          {durationOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Button
        type="text"
        icon={<DeleteOutlined />}
        className="remove-button"
        onClick={() => onRemove(medicine.id)}
        danger
        title={t('treatment.removeMedicine')}
      />
    </StyledMedicineItem>
  )
} 