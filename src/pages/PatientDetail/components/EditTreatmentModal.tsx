import React, { useState } from 'react'
import { 
  Modal, 
  Form, 
  Input, 
  message,
  Button
} from 'antd'
import { 
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { useLanguage } from '@/hooks/useLanguage'
import { useMedicines } from '@/hooks/useMedicines'
import { treatmentService } from '@/services/treatmentService'
import { MedicineItem } from '../../AddTreatment/components/MedicineItem'
import { 
  StyledForm,
  DatePickerStyled,
  FormSection,
  AddMedicineButton,
  PrescriptionSummary,
  SummaryTitle,
  SummaryItem,
  SummaryMedicineName,
  SummaryDosageText
} from '../../AddTreatment/styled'
import type { LichSuDieuTriResponse, ThuocDieuTriResponse } from '@/types/treatment'

const { TextArea } = Input

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

interface TouchedFields {
  [medicineId: string]: {
    thuocId?: boolean
    soLuong?: boolean
    lieuDung?: boolean
    duongDung?: boolean
    tanSuat?: boolean
    thoiGianDung?: boolean
  }
}

interface EditTreatmentModalProps {
  visible: boolean
  treatment: LichSuDieuTriResponse | null
  patientId: number
  onCancel: () => void
  onSuccess: () => void
}

export const EditTreatmentModal: React.FC<EditTreatmentModalProps> = ({
  visible,
  treatment,
  patientId,
  onCancel,
  onSuccess
}) => {
  const [form] = Form.useForm()
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()

  // Lấy danh sách thuốc từ API
  const { medicinesData, isLoadingMedicines } = useMedicines(
    { page: 0, size: 1000 },
    undefined
  )

  // Chuyển đổi dữ liệu từ API thành format cần thiết
  const availableMedicines = medicinesData?.content?.map(medicine => ({
    id: medicine.id.toString(),
    name: medicine.tenThuoc,
    dosage: `${medicine.nongDo || ''} ${medicine.dangBaoChe || ''}`.trim()
  })) || []

  // Khởi tạo form khi treatment thay đổi
  React.useEffect(() => {
    if (treatment && visible) {
      // Chuyển đổi dữ liệu treatment thành format form
      const initialMedicines: Medicine[] = treatment.donThuocDieuTri?.danhSachThuoc?.map((med: ThuocDieuTriResponse, index: number) => ({
        id: `medicine-${index}`,
        thuocId: med.thuoc.id,
        name: med.thuoc.tenThuoc,
        soLuong: med.soLuong,
        lieuDung: med.lieuDung,
        duongDung: med.duongDung,
        tanSuat: med.tanSuat,
        thoiGianDung: med.thoiGianDung,
        huongDanSuDung: med.huongDanSuDung || '',
        giaDonVi: med.giaDonVi || 0,
        thanhTien: med.thanhTien || 0
      })) || []

      setMedicines(initialMedicines)

      // Xử lý ngày bắt đầu - kiểm tra format
      let ngayBatDau = null
      if (treatment.ngayBatDau) {
        const parsedDate = dayjs(treatment.ngayBatDau)
        if (parsedDate.isValid()) {
          ngayBatDau = parsedDate
        } else {
          // Thử parse với format khác
          const alternativeDate = dayjs(treatment.ngayBatDau, 'YYYY-MM-DD')
          if (alternativeDate.isValid()) {
            ngayBatDau = alternativeDate
          }
        }
      }

      form.setFieldsValue({
        maChanDoan: treatment.maChanDoan || '',
        chanDoanChinh: treatment.chanDoanChinh || '',
        chanDoanPhu: treatment.chanDoanPhu || '',
        bacSiDieuTri: treatment.bacSiDieuTri || '',
        trieuChung: treatment.trieuChung || '',
        ngayBatDau: ngayBatDau,
        notes: treatment.donThuocDieuTri?.ghiChu || ''
      })
    }
  }, [treatment, visible, form])

  const handleAddMedicine = () => {
    const newMedicine: Medicine = {
      id: `medicine-${Date.now()}`,
      thuocId: 0,
      name: '',
      soLuong: 0,
      lieuDung: '',
      duongDung: '',
      tanSuat: '',
      thoiGianDung: '',
      huongDanSuDung: '',
      giaDonVi: 0,
      thanhTien: 0
    }
    setMedicines(prev => [...prev, newMedicine])
  }

  const handleRemoveMedicine = (medicineId: string) => {
    setMedicines(prev => prev.filter(medicine => medicine.id !== medicineId))
  }

  const handleMedicineChange = (medicineId: string, field: keyof Medicine, value: string | number) => {
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
    
    if (!medicine.thuocId || medicine.thuocId === 0) {
      if (forceValidate || medicineTouched.thuocId) {
        errors.push(`${index + 1}: ${t('treatment.validation.selectMedicine')}`)
      }
    }
    
    if (!medicine.soLuong || medicine.soLuong <= 0) {
      if (forceValidate || medicineTouched.soLuong) {
        errors.push(`${index + 1}: ${t('treatment.validation.enterQuantity')}`)
      }
    }

    if (!medicine.lieuDung || medicine.lieuDung.trim() === '') {
      if (forceValidate || medicineTouched.lieuDung) {
        errors.push(`${index + 1}: ${t('treatment.validation.enterDosage')}`)
      }
    }

    if (!medicine.duongDung || medicine.duongDung.trim() === '') {
      if (forceValidate || medicineTouched.duongDung) {
        errors.push(`${index + 1}: ${t('treatment.validation.selectRoute')}`)
      }
    }

    if (!medicine.tanSuat || medicine.tanSuat.trim() === '') {
      if (forceValidate || medicineTouched.tanSuat) {
        errors.push(`${index + 1}: ${t('treatment.validation.selectFrequency')}`)
      }
    }

    if (!medicine.thoiGianDung || medicine.thoiGianDung.trim() === '') {
      if (forceValidate || medicineTouched.thoiGianDung) {
        errors.push(`${index + 1}: ${t('treatment.validation.selectDuration')}`)
      }
    }
    
    return errors
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const values = await form.validateFields()
      
      // Validate medicines
      if (medicines.length === 0) {
        message.error(t('treatment.validation.noMedicines'))
        return
      }

      // Mark all fields as touched for final validation
      const allTouchedFields: TouchedFields = {}
      medicines.forEach(medicine => {
        allTouchedFields[medicine.id] = {
          thuocId: true,
          soLuong: true,
          lieuDung: true,
          duongDung: true,
          tanSuat: true,
          thoiGianDung: true
        }
      })
      setTouchedFields(allTouchedFields)

      // Validate each medicine with force validation
      const medicineErrors: string[] = []
      
      medicines.forEach((medicine, index) => {
        const errors = validateMedicine(medicine, index, true)
        medicineErrors.push(...errors)
      })

      if (medicineErrors.length > 0) {
        message.error(medicineErrors.join('\n'))
        return
      }

      // Check for duplicate medicines
      const medicineIds = medicines.map(m => m.thuocId)
      const uniqueIds = new Set(medicineIds)
      if (uniqueIds.size !== medicineIds.length) {
        message.error(t('treatment.validation.duplicateMedicine'))
        return
      }

      // Prepare data for API
      const treatmentData = {
        benhNhanId: patientId,
        maChanDoan: values.maChanDoan,
        chanDoanChinh: values.chanDoanChinh,
        chanDoanPhu: values.chanDoanPhu || '',
        trieuChung: values.trieuChung || '',
        bacSiDieuTri: values.bacSiDieuTri,
        trangThai: (treatment?.trangThai as 'MOI_TAO' | 'DA_DUYET' | 'DANG_THUC_HIEN' | 'HOAN_THANH' | 'HUY_BO') || 'MOI_TAO',
        ngayBatDau: values.ngayBatDau.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        donThuocDieuTri: {
          benhNhanId: patientId,
          dieuTriId: treatment?.id,
          maDonThuoc: treatment?.donThuocDieuTri?.maDonThuoc || `DT${Date.now()}`,
          bacSiKeDon: values.bacSiDieuTri,
          ghiChu: values.notes || '',
          trangThai: (treatment?.donThuocDieuTri?.trangThai as 'MOI_TAO' | 'DA_DUYET' | 'DANG_THUC_HIEN' | 'HOAN_THANH' | 'HUY_BO') || 'MOI_TAO',
          danhSachThuoc: medicines.map(medicine => ({
            thuocId: medicine.thuocId,
            soLuong: medicine.soLuong,
            lieuDung: medicine.lieuDung,
            duongDung: medicine.duongDung,
            tanSuat: medicine.tanSuat,
            thoiGianDung: medicine.thoiGianDung,
            huongDanSuDung: medicine.huongDanSuDung || '',
            giaDonVi: medicine.giaDonVi,
            thanhTien: medicine.thanhTien
          }))
        }
      }

      // Call API to update treatment
      await treatmentService.capNhatLichSuDieuTri(treatment?.id || 0, treatmentData)
      
      message.success(t('treatment.updateSuccessMessage'))
      onSuccess()
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'errorFields' in error) {
        // Form validation error
        return
      }
      const errorMessage = error instanceof Error ? error.message : t('treatment.errorMessage')
      message.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setMedicines([])
    setTouchedFields({})
    onCancel()
  }

  return (
    <Modal
      title={t('treatment.editTitle')}
      open={visible}
      onCancel={handleCancel}
      width={1000}
      style={{ top: 20 }}
      bodyStyle={{ 
        maxHeight: '70vh', 
        overflowY: 'auto', 
        paddingRight: '8px' 
      }}
      footer={[
        <Button key="cancel" onClick={handleCancel} icon={<CloseOutlined />}>
          {t('treatment.cancelTreatment')}
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          loading={isSubmitting}
          icon={<SaveOutlined />}
        >
          {t('treatment.saveTreatment')}
        </Button>
      ]}
    >
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <FormSection>
          <div className="section-title">{t('treatment.diagnosisInfo')}</div>
          
          <Form.Item
            name="maChanDoan"
            label={t('treatment.diagnosisCode')}
            rules={[
              { required: true, message: t('validation.required', { field: t('treatment.diagnosisCode') }) }
            ]}
          >
            <Input 
              placeholder={t('treatment.diagnosisCodePlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="chanDoanChinh"
            label={t('treatment.mainDiagnosis')}
            rules={[
              { required: true, message: t('validation.required', { field: t('treatment.mainDiagnosis') }) },
              { min: 10, message: t('validation.minLength', { field: t('treatment.mainDiagnosis'), min: 10 }) }
            ]}
          >
            <Input 
              placeholder={t('treatment.mainDiagnosisPlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="chanDoanPhu"
            label={t('treatment.secondaryDiagnosis')}
          >
            <Input 
              placeholder={t('treatment.secondaryDiagnosisPlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="bacSiDieuTri"
            label={t('treatment.doctor')}
            rules={[
              { required: true, message: t('validation.required', { field: t('treatment.doctor') }) }
            ]}
          >
            <Input 
              placeholder={t('treatment.doctorPlaceholder')}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="trieuChung"
            label={t('treatment.symptoms')}
          >
            <TextArea
              placeholder={t('treatment.symptomsPlaceholder')}
              rows={3}
              showCount
              maxLength={200}
            />
          </Form.Item>

          <Form.Item
            name="ngayBatDau"
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
              mockMedicines={availableMedicines}
              validateMedicine={validateMedicine}
              isLoadingMedicines={isLoadingMedicines}
              medicinesData={medicinesData}
            />
          ))}

          <AddMedicineButton
            type="dashed"
            onClick={handleAddMedicine}
          >
            {t('treatment.addMedicine')}
          </AddMedicineButton>

          {medicines.length > 0 && (
            <PrescriptionSummary>
              <SummaryTitle>{t('treatment.summary')}:</SummaryTitle>
              {medicines.map((medicine, index) => {
                const dosageText = medicine.soLuong && medicine.lieuDung && medicine.tanSuat && medicine.thoiGianDung
                  ? `${medicine.soLuong} ${medicine.lieuDung} ${medicine.tanSuat} ${t('common.of')} ${medicine.thoiGianDung}`
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
      </StyledForm>
    </Modal>
  )
} 