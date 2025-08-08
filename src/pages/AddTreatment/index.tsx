import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Form, 
  Input, 
  message,
  Modal,
  Card,
  Row,
  Col,
  Tag,
  Space,
  Typography
} from 'antd'
import { 
  ArrowLeftOutlined,
  PlusOutlined,
  SaveOutlined,
  CloseOutlined,
  UserOutlined,
  AlertOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { useLanguage } from '@/hooks/useLanguage'
import { useMedicines } from '@/hooks/useMedicines'
import { usePatient } from '@/hooks/usePatients'
import { treatmentService } from '@/services/treatmentService'
import { MedicineItem } from './components'
import { 
  StyledCard,
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
const { Title, Text } = Typography

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

export const AddTreatment: React.FC = () => {
  const { id: patientId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
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
  ])
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()

  // Lấy thông tin bệnh nhân
  const { patient, isLoadingPatient } = usePatient(parseInt(patientId || '0'))

  // Lấy danh sách thuốc từ API
  const { medicinesData, isLoadingMedicines } = useMedicines(
    { page: 0, size: 1000 }, // Lấy tất cả thuốc
    undefined
  )

  // Chuyển đổi dữ liệu từ API thành format cần thiết
  const availableMedicines = medicinesData?.content?.map(medicine => ({
    id: medicine.id.toString(),
    name: medicine.tenThuoc,
    dosage: `${medicine.nongDo || ''} ${medicine.dangBaoChe || ''}`.trim()
  })) || []

  // Tính tuổi từ ngày sinh
  const calculateAge = (dateOfBirth?: string) => {
    if (!dateOfBirth) return null
    const birthDate = dayjs(dateOfBirth)
    if (!birthDate.isValid()) return null
    return dayjs().diff(birthDate, 'year')
  }

  const age = calculateAge(patient?.ngaySinh)

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
        const errors = validateMedicine(medicine, index, true) // Force validate on submit
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
        benhNhanId: parseInt(patientId || '0'),
        maChanDoan: values.maChanDoan,
        chanDoanChinh: values.chanDoanChinh,
        chanDoanPhu: values.chanDoanPhu || '',
        trieuChung: values.trieuChung || '',
        bacSiDieuTri: values.bacSiDieuTri,
        trangThai: 'DANG_DIEU_TRI' as const,
        ngayBatDau: values.ngayBatDau.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        donThuocDieuTri: {
          benhNhanId: parseInt(patientId || '0'),
          maDonThuoc: `DT${Date.now()}`,
          bacSiKeDon: values.bacSiDieuTri,
          ghiChu: values.notes || '',
          trangThai: 'MOI_TAO' as const,
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

      // Call API
      await treatmentService.taoMoiLichSuDieuTri(treatmentData)
      
      message.success(t('treatment.successMessage'))
      navigate(`/patients/${patientId}`)
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
    Modal.confirm({
      title: t('treatment.confirmCancel'),
      content: t('treatment.cancelMessage'),
      onOk: () => navigate(`/patients/${patientId}`)
    })
  }

  return (
    <div style={{ padding: '24px' }}>
      <BackButton onClick={() => navigate(`/patients/${patientId}`)}>
        <ArrowLeftOutlined /> {t('treatment.backToPatient')}
      </BackButton>

      <StyledTitle level={2}>
        {t('treatment.title')}
      </StyledTitle>

      <Row gutter={[24, 24]}>
        {/* Cột bên trái - Form thêm điều trị */}
        <Col xs={24} lg={16}>
          <StyledCard>
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
                  icon={<PlusOutlined />}
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
        </Col>

        {/* Cột bên phải - Thông tin bệnh nhân */}
        <Col xs={24} lg={8}>
          <Card 
            title={
              <Space>
                <UserOutlined />
                <span>{t('patient.patientInfo')}</span>
              </Space>
            }
            style={{ height: 'fit-content' }}
          >
            {isLoadingPatient ? (
              <div>{t('common.loading')}</div>
            ) : patient ? (
              <Space direction="vertical" style={{ width: '100%' }}>
                {/* Thông tin cơ bản */}
                <div>
                  <Title level={5} style={{ marginBottom: '8px' }}>
                    {t('patient.personalInfo')}
                  </Title>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>{t('patient.fullName')}:</Text>
                    <br />
                    <Text>{patient.hoTen || '---'}</Text>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>{t('patient.age')}:</Text>
                    <br />
                    <Text>{age ? `${age} ${t('common.years')}` : '---'}</Text>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>{t('patient.address')}:</Text>
                    <br />
                    <Text>{patient.diaChi || '---'}</Text>
                  </div>
                </div>

                {/* Danh sách dị ứng thuốc */}
                <div>
                  <Title level={5} style={{ marginBottom: '8px' }}>
                    <AlertOutlined style={{ marginRight: '8px', color: '#ff4d4f' }} />
                    {t('patient.allergies')}
                  </Title>
                  
                  {patient.danhSachDiUng && patient.danhSachDiUng.length > 0 ? (
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {patient.danhSachDiUng.map((diUng) => (
                        <Tag 
                          key={diUng.id} 
                          color="red" 
                          style={{ 
                            backgroundColor: '#fef2f2', 
                            color: '#dc2626', 
                            border: '1px solid #fecaca',
                            marginBottom: '4px'
                          }}
                        >
                          {diUng.thuoc.tenThuoc}
                          {diUng.trieuChung && ` (${diUng.trieuChung})`}
                        </Tag>
                      ))}
                    </Space>
                  ) : (
                    <Text type="secondary">{t('patient.noData')}</Text>
                  )}
                </div>

                {/* Danh sách bệnh lý nền */}
                <div>
                  <Title level={5} style={{ marginBottom: '8px' }}>
                    <FileTextOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                    {t('patient.medicalHistory')}
                  </Title>
                  
                  {patient.danhSachBenhLyNen && patient.danhSachBenhLyNen.length > 0 ? (
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {patient.danhSachBenhLyNen.map((benhLy) => (
                        <Tag 
                          key={benhLy.id} 
                          color="blue" 
                          style={{ 
                            backgroundColor: '#eff6ff', 
                            color: '#1d4ed8', 
                            border: '1px solid #dbeafe',
                            marginBottom: '4px'
                          }}
                        >
                          {benhLy.tenBenh}
                        </Tag>
                      ))}
                    </Space>
                  ) : (
                    <Text type="secondary">{t('patient.noData')}</Text>
                  )}
                </div>
              </Space>
            ) : (
              <div>{t('patient.notFound')}</div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
} 