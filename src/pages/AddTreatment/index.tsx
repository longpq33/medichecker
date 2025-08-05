import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Form, 
  Input, 
  message,
  Modal
} from 'antd'
import { 
  ArrowLeftOutlined,
  PlusOutlined,
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { useLanguage } from '@/hooks/useLanguage'
import { MedicineItem } from './components'
import { 
  StyledCard,
  FormContainer,
  FormSection,
  AddMedicineButton,
  ActionButtons,
  PrimaryButton,
  SecondaryButton,
  BackButton,
  StyledForm,
  DatePickerStyled,
  PrescriptionSummary,
  SummaryTitle,
  SummaryItem,
  SummaryMedicineName,
  SummaryDosageText,
  StyledTitle
} from './styled'

const { TextArea } = Input

interface Medicine {
  id: string
  name: string
  quantity: string
  unit: string
  frequency: string
  duration: string
}

interface TouchedFields {
  [medicineId: string]: {
    name?: boolean
    quantity?: boolean
    unit?: boolean
    frequency?: boolean
    duration?: boolean
  }
}

const mockMedicines = [
  { id: '1', name: 'Paracetamol 500mg', dosage: '1 viên x 3 lần/ngày' },
  { id: '2', name: 'Amoxicillin 500mg', dosage: '1 viên x 2 lần/ngày' },
  { id: '3', name: 'Ibuprofen 400mg', dosage: '1 viên x 3 lần/ngày' },
  { id: '4', name: 'Vitamin C 1000mg', dosage: '1 viên x 1 lần/ngày' },
  { id: '5', name: 'Omeprazole 20mg', dosage: '1 viên x 1 lần/ngày' },
  { id: '6', name: 'Cetirizine 10mg', dosage: '1 viên x 1 lần/ngày' },
]

export const AddTreatment: React.FC = () => {
  const { id: patientId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()

  const handleAddMedicine = () => {
    const newMedicine: Medicine = {
      id: `medicine-${Date.now()}`,
      name: '',
      quantity: '',
      unit: '',
      frequency: '',
      duration: ''
    }
    setMedicines(prev => [...prev, newMedicine])
  }

  const handleRemoveMedicine = (medicineId: string) => {
    setMedicines(prev => prev.filter(medicine => medicine.id !== medicineId))
  }

  const handleMedicineChange = (medicineId: string, field: keyof Medicine, value: string) => {
    setMedicines(prev => prev.map(medicine => 
      medicine.id === medicineId ? { ...medicine, [field]: value } : medicine
    ))
  }

  const handleFieldTouch = (medicineId: string, field: keyof Medicine) => {
    setTouchedFields(prev => ({
      ...prev,
      [medicineId]: {
        ...prev[medicineId],
        [field]: true
      }
    }))
  }

  const validateMedicine = (medicine: Medicine, index: number, forceValidate = false): string[] => {
    const errors: string[] = []
    const medicineTouched = touchedFields[medicine.id] || {}
    
    if (!medicine.name || medicine.name.trim() === '') {
      if (forceValidate || medicineTouched.name) {
        errors.push(`${index + 1}: ${t('treatment.validation.selectMedicine')}`)
      }
    }
    
    if (!medicine.quantity || medicine.quantity.trim() === '') {
      if (forceValidate || medicineTouched.quantity) {
        errors.push(`${index + 1}: ${t('treatment.validation.enterQuantity')}`)
      }
    }

    if (!medicine.unit || medicine.unit.trim() === '') {
      if (forceValidate || medicineTouched.unit) {
        errors.push(`${index + 1}: ${t('treatment.validation.selectUnit')}`)
      }
    }

    if (!medicine.frequency || medicine.frequency.trim() === '') {
      if (forceValidate || medicineTouched.frequency) {
        errors.push(`${index + 1}: ${t('treatment.validation.selectFrequency')}`)
      }
    }

    if (!medicine.duration || medicine.duration.trim() === '') {
      if (forceValidate || medicineTouched.duration) {
        errors.push(`${index + 1}: ${t('treatment.validation.selectDuration')}`)
      }
    }
    
    return errors
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Validate medicines
      if (medicines.length === 0) {
        message.error(t('treatment.validation.noMedicines'))
        return
      }

      // Mark all fields as touched for final validation
      const allTouchedFields: TouchedFields = {}
      medicines.forEach(medicine => {
        allTouchedFields[medicine.id] = {
          name: true,
          quantity: true,
          unit: true,
          frequency: true,
          duration: true
        }
      })
      setTouchedFields(allTouchedFields)

      // Validate each medicine with force validation
      const medicineErrors: string[] = []
      
      medicines.forEach((medicine, index) => {
        const errors = validateMedicine(medicine, index, true) // Force validate on submit
        medicineErrors.push(...errors)
      })

      if (medicineErrors.length > 0) {
        message.error(medicineErrors.join('\n'))
        return
      }

      // Check for duplicate medicines
      const medicineNames = medicines.map(m => m.name.toLowerCase().trim())
      const uniqueNames = new Set(medicineNames)
      if (uniqueNames.size !== medicineNames.length) {
        message.error(t('treatment.validation.duplicateMedicine'))
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      message.success(t('treatment.successMessage'))
      navigate(`/patients/${patientId}`)
    } catch {
      message.error(t('treatment.errorMessage'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    Modal.confirm({
      title: t('treatment.confirmCancel'),
      content: t('treatment.cancelMessage'),
      onOk: () => navigate(`/patients/${patientId}`)
    })
  }

  return (
    <div>
      <BackButton 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate(`/patients/${patientId}`)}
      >
        {t('treatment.backToPatient')}
      </BackButton>

      <FormContainer>
        <StyledCard>
          <StyledTitle level={2}>
            {t('treatment.title')}
          </StyledTitle>

          <StyledForm
            form={form}
            layout="vertical"
            onFinish={() => {
              handleSubmit()
            }}
            onFinishFailed={() => {
              // Even if form validation fails, we should still validate medicines
              handleSubmit()
            }}
            initialValues={{
              treatmentDate: dayjs()
            }}
          >
            <FormSection>
              <div className="section-title">{t('treatment.diagnosisInfo')}</div>
              
              <Form.Item
                name="diagnosis"
                label={t('treatment.diagnosis')}
                rules={[
                  { required: true, message: t('validation.required', { field: t('treatment.diagnosis') }) },
                  { min: 10, message: t('validation.minLength', { field: t('treatment.diagnosis'), min: 10 }) }
                ]}
              >
                <Input 
                  placeholder={t('treatment.diagnosisPlaceholder')}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="treatmentDate"
                label={t('treatment.treatmentDate')}
                rules={[
                  { required: true, message: t('validation.required', { field: t('treatment.treatmentDate') }) }
                ]}
              >
                <DatePickerStyled 
                  size="large"
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </FormSection>

            <FormSection>
              <div className="section-title">{t('treatment.prescription')}</div>
              
              {medicines.map((medicine, index) => (
                <MedicineItem
                  key={medicine.id}
                  medicine={medicine}
                  index={index}
                  onMedicineChange={handleMedicineChange}
                  onRemove={handleRemoveMedicine}
                  onFieldTouch={handleFieldTouch}
                  mockMedicines={mockMedicines}
                  validateMedicine={validateMedicine}
                />
              ))}

              <AddMedicineButton
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleAddMedicine}
              >
                {t('treatment.addMedicine')}
              </AddMedicineButton>

              {medicines.length > 0 && (
                <PrescriptionSummary>
                  <SummaryTitle>{t('treatment.summary')}:</SummaryTitle>
                  {medicines.map((medicine, index) => {
                    const dosageText = medicine.quantity && medicine.unit && medicine.frequency && medicine.duration
                      ? `${medicine.quantity} ${medicine.unit} ${medicine.frequency} ${t('common.of')} ${medicine.duration}`
                      : t('treatment.incompleteInfo')
                    
                    return (
                      <SummaryItem key={medicine.id}>
                        <SummaryMedicineName>{index + 1}. {medicine.name || t('treatment.selectMedicine')}:</SummaryMedicineName>
                        <SummaryDosageText>{dosageText}</SummaryDosageText>
                      </SummaryItem>
                    )
                  })}
                </PrescriptionSummary>
              )}
            </FormSection>

            <FormSection>
              <div className="section-title">{t('treatment.notes')}</div>
              
              <Form.Item
                name="notes"
                label={t('treatment.notes')}
              >
                <TextArea
                  placeholder={t('treatment.notesPlaceholder')}
                  rows={6}
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </FormSection>

            <ActionButtons>
              <SecondaryButton
                icon={<CloseOutlined />}
                onClick={handleCancel}
              >
                {t('treatment.cancelTreatment')}
              </SecondaryButton>
              
              <PrimaryButton
                type="primary"
                icon={<SaveOutlined />}
                htmlType="submit"
                loading={isSubmitting}
              >
                {t('treatment.saveTreatment')}
              </PrimaryButton>
            </ActionButtons>
          </StyledForm>
        </StyledCard>
      </FormContainer>
    </div>
  )
} 