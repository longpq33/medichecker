import React from 'react'
import { Form, Input, Select, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import { MedicineItem as StyledMedicineItem } from '../styled'

const { Option } = Select

interface Medicine {
  id: string
  thuocId: number
  name: string
  soLuong: number
  lieuDung: string
  duongDung: string
  tanSuat: string
  thoiGianDung: string
  huongDanSuDung?: string
  giaDonVi: number
  thanhTien: number
}

interface MedicineItemProps {
  medicine: Medicine
  index: number
  onMedicineChange: (medicineId: string, field: keyof Medicine, value: string | number) => void
  onRemove: (medicineId: string) => void
  onFieldTouch: (medicineId: string, field: keyof Medicine) => void
  mockMedicines: Array<{ id: string; name: string; dosage: string }>
  validateMedicine: (medicine: Medicine, index: number, forceValidate?: boolean) => string[]
  isLoadingMedicines?: boolean
  medicinesData?: { content: Array<{ id: number; giaBan?: number }> }
}

export const MedicineItem: React.FC<MedicineItemProps> = ({
  medicine,
  index,
  onMedicineChange,
  onRemove,
  onFieldTouch,
  mockMedicines,
  validateMedicine,
  isLoadingMedicines = false,
  medicinesData
}) => {
  const { t } = useLanguage()
  const errors = validateMedicine(medicine, index)
  const thuocIdErrors = errors.filter(error => error.includes(t('treatment.validation.selectMedicine')))
  const soLuongErrors = errors.filter(error => error.includes(t('treatment.validation.enterQuantity')))
  const lieuDungErrors = errors.filter(error => error.includes(t('treatment.validation.enterDosage')))
  const duongDungErrors = errors.filter(error => error.includes(t('treatment.validation.selectRoute')))
  const tanSuatErrors = errors.filter(error => error.includes(t('treatment.validation.selectFrequency')))
  const thoiGianDungErrors = errors.filter(error => error.includes(t('treatment.validation.selectDuration')))

  const duongDungOptions = [
    { value: 'uống', label: t('treatment.routes.oral') },
    { value: 'tiêm', label: t('treatment.routes.injection') },
    { value: 'bôi', label: t('treatment.routes.topical') },
    { value: 'nhỏ mắt', label: t('treatment.routes.eyeDrops') },
    { value: 'nhỏ mũi', label: t('treatment.routes.nasalDrops') },
    { value: 'xịt', label: t('treatment.routes.spray') },
  ]

  const tanSuatOptions = [
    { value: '1 lần/ngày', label: t('treatment.frequencies.onceDaily') },
    { value: '2 lần/ngày', label: t('treatment.frequencies.twiceDaily') },
    { value: '3 lần/ngày', label: t('treatment.frequencies.thriceDaily') },
    { value: '4 lần/ngày', label: t('treatment.frequencies.fourTimesDaily') },
    { value: '1 lần/tuần', label: t('treatment.frequencies.onceWeekly') },
    { value: '2 lần/tuần', label: t('treatment.frequencies.twiceWeekly') },
    { value: '1 lần/tháng', label: t('treatment.frequencies.onceMonthly') },
  ]

  const thoiGianDungOptions = [
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

  const handleFieldChange = (field: keyof Medicine, value: string | number) => {
    onFieldTouch(medicine.id, field)
    onMedicineChange(medicine.id, field, value)
  }

  const handleMedicineSelect = (value: string) => {
    const selectedMedicine = mockMedicines.find(med => med.name === value)
    if (selectedMedicine) {
      const thuocId = parseInt(selectedMedicine.id)
      handleFieldChange('thuocId', thuocId)
      handleFieldChange('name', selectedMedicine.name)
      
      // Lấy giá đơn vị từ API
      const selectedMedicineData = medicinesData?.content?.find(med => med.id === thuocId)
      if (selectedMedicineData) {
        const giaDonVi = selectedMedicineData.giaBan || 0
        handleFieldChange('giaDonVi', giaDonVi)
        // Tính thanh tiền
        const thanhTien = giaDonVi * medicine.soLuong
        handleFieldChange('thanhTien', thanhTien)
      }
    }
  }

  const handleQuantityChange = (value: number) => {
    handleFieldChange('soLuong', value)
    // Tính lại thanh tiền
    const thanhTien = medicine.giaDonVi * value
    handleFieldChange('thanhTien', thanhTien)
  }

  return (
    <StyledMedicineItem>
      <Form.Item
        label={t('treatment.medicine')}
        className="medicine-select"
        required
        validateStatus={thuocIdErrors.length > 0 ? 'error' : ''}
        help={thuocIdErrors.join(' ')}
      >
        <Select
          placeholder={t('treatment.medicinePlaceholder')}
          size="large"
          value={medicine.name}
          onChange={handleMedicineSelect}
          onFocus={() => onFieldTouch(medicine.id, 'thuocId')}
          showSearch
          loading={isLoadingMedicines}
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
        validateStatus={soLuongErrors.length > 0 ? 'error' : ''}
        help={soLuongErrors.join(' ')}
      >
        <Input
          placeholder={t('treatment.quantityPlaceholder')}
          size="large"
          value={medicine.soLuong}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
          onFocus={() => onFieldTouch(medicine.id, 'soLuong')}
          type="number"
          min="1"
        />
      </Form.Item>

      <Form.Item
        label={t('treatment.dosage')}
        className="dosage-input"
        required
        validateStatus={lieuDungErrors.length > 0 ? 'error' : ''}
        help={lieuDungErrors.join(' ')}
      >
        <Input
          placeholder={t('treatment.dosagePlaceholder')}
          size="large"
          value={medicine.lieuDung}
          onChange={(e) => handleFieldChange('lieuDung', e.target.value)}
          onFocus={() => onFieldTouch(medicine.id, 'lieuDung')}
        />
      </Form.Item>

      <Form.Item
        label={t('treatment.route')}
        className="route-select"
        required
        validateStatus={duongDungErrors.length > 0 ? 'error' : ''}
        help={duongDungErrors.join(' ')}
      >
        <Select
          placeholder={t('treatment.routePlaceholder')}
          size="large"
          value={medicine.duongDung}
          onChange={(value) => handleFieldChange('duongDung', value)}
          onFocus={() => onFieldTouch(medicine.id, 'duongDung')}
        >
          {duongDungOptions.map(option => (
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
        validateStatus={tanSuatErrors.length > 0 ? 'error' : ''}
        help={tanSuatErrors.join(' ')}
      >
        <Select
          placeholder={t('treatment.frequencyPlaceholder')}
          size="large"
          value={medicine.tanSuat}
          onChange={(value) => handleFieldChange('tanSuat', value)}
          onFocus={() => onFieldTouch(medicine.id, 'tanSuat')}
        >
          {tanSuatOptions.map(option => (
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
        validateStatus={thoiGianDungErrors.length > 0 ? 'error' : ''}
        help={thoiGianDungErrors.join(' ')}
      >
        <Select
          placeholder={t('treatment.durationPlaceholder')}
          size="large"
          value={medicine.thoiGianDung}
          onChange={(value) => handleFieldChange('thoiGianDung', value)}
          onFocus={() => onFieldTouch(medicine.id, 'thoiGianDung')}
        >
          {thoiGianDungOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={t('treatment.instructions')}
        className="instructions-input"
      >
        <Input
          placeholder={t('treatment.instructionsPlaceholder')}
          size="large"
          value={medicine.huongDanSuDung}
          onChange={(e) => handleFieldChange('huongDanSuDung', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label={t('treatment.unitPrice')}
        className="unit-price-input"
      >
        <Input
          placeholder={t('treatment.unitPrice')}
          size="large"
          value={medicine.giaDonVi.toLocaleString()}
          disabled
          prefix="₫"
        />
      </Form.Item>

      <Form.Item
        label={t('treatment.totalPrice')}
        className="total-price-input"
      >
        <Input
          placeholder={t('treatment.totalPrice')}
          size="large"
          value={medicine.thanhTien.toLocaleString()}
          disabled
          prefix="₫"
        />
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