import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, message, Row, Col } from "antd";
import {
  PlusOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLanguage } from "@/hooks/useLanguage";
import { useMedicines } from "@/hooks/useMedicines";
import { usePatient } from "@/hooks/usePatients";
import { treatmentService } from "@/services/treatmentService";
import { PatientInfo, Breadcrumb } from "@/components";
import { TreatmentAnalysis, AddMedicineModal, MedicineList } from "./components";
import {
  StyledCard,
  FormSection,
  AddMedicineButton,
  ActionButtons,
  PrimaryButton,
  StyledForm,
  DatePickerStyled,
  StyledTitle,
  TreatmentAnalysisContainer,
} from "./styled";

const { TextArea } = Input;

interface Medicine {
  id: string;
  thuocId: number;
  name: string;
  soLuong: number;
  lieuDung: string;
  duongDung: string;
  tanSuat: string;
  thoiGianDung: string;
  huongDanSuDung?: string;
  giaDonVi: number;
  thanhTien: number;
}

// Interface này không còn sử dụng sau khi chuyển sang modal
// interface TouchedFields { ... }

export const AddTreatment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [form] = Form.useForm();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  // const [touchedFields, setTouchedFields] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalysisFixed, setIsAnalysisFixed] = useState(false);
  const [isAddMedicineModalVisible, setIsAddMedicineModalVisible] = useState(false);

  // Sử dụng hooks
  const { medicinesData } = useMedicines({ page: 0, size: 1000 });
  const { patient, isLoadingPatient } = usePatient(parseInt(id || "0"));
  const analysisRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollContainerRef.current?.scrollTop ?? 0;
      const offsetTop = analysisRef.current?.offsetTop || 0;

      const shouldBeFixed = scrollTop > offsetTop - 100;

      if (shouldBeFixed !== isAnalysisFixed) {
        setIsAnalysisFixed(shouldBeFixed);
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [isAnalysisFixed]);

  // Chuyển đổi dữ liệu từ API thành format cần thiết (không còn sử dụng)
  // const availableMedicines = ...

  const handleAddMedicine = () => {
    setIsAddMedicineModalVisible(true);
  };

  const handleAddMedicineFromModal = (newMedicine: Medicine) => {
    setMedicines((prev) => [...prev, newMedicine]);
    setIsAddMedicineModalVisible(false);
  };

  const handleRemoveMedicine = (medicineId: string) => {
    setMedicines((prev) =>
      prev.filter((medicine) => medicine.id !== medicineId)
    );
  };

  // Các hàm này không còn sử dụng sau khi chuyển sang modal
  // const handleMedicineChange = ...
  // const handleFieldTouch = ...

  // Hàm validate này không còn cần thiết vì validation đã được xử lý trong modal
  // const validateMedicine = ...

  const handleSubmit = async (values: unknown) => {
    try {
      setIsSubmitting(true);

      const formValues = values as {
        maChanDoan: string;
        chanDoanChinh: string;
        chanDoanPhu?: string;
        trieuChung?: string;
        bacSiDieuTri: string;
        ngayBatDau: { format: (format: string) => string };
        notes?: string;
      };

      // Validate medicines - kiểm tra có thuốc nào được thêm không
      if (medicines.length === 0 || medicines.every(medicine => medicine.thuocId === 0)) {
        message.error(t("treatment.validation.noMedicines"));
        return;
      }

      // Kiểm tra thông tin thuốc có đầy đủ không
      const medicineErrors: string[] = [];
      medicines.forEach((medicine, index) => {
        if (medicine.thuocId === 0) {
          medicineErrors.push(`${index + 1}: ${t("treatment.validation.selectMedicine")}`);
        }
        if (!medicine.soLuong || medicine.soLuong <= 0) {
          medicineErrors.push(`${index + 1}: ${t("treatment.validation.enterQuantity")}`);
        }
        if (!medicine.lieuDung) {
          medicineErrors.push(`${index + 1}: ${t("treatment.validation.enterDosage")}`);
        }
        if (!medicine.duongDung) {
          medicineErrors.push(`${index + 1}: ${t("treatment.validation.selectRoute")}`);
        }
        if (!medicine.tanSuat) {
          medicineErrors.push(`${index + 1}: ${t("treatment.validation.selectFrequency")}`);
        }
        if (!medicine.thoiGianDung) {
          medicineErrors.push(`${index + 1}: ${t("treatment.validation.selectDuration")}`);
        }
      });

      if (medicineErrors.length > 0) {
        message.error(medicineErrors.join("\n"));
        return;
      }

      // Prepare treatment data
      const treatmentData = {
        benhNhanId: parseInt(id || "0"),
        maChanDoan: formValues.maChanDoan,
        chanDoanChinh: formValues.chanDoanChinh,
        chanDoanPhu: formValues.chanDoanPhu || "",
        trieuChung: formValues.trieuChung || "",
        bacSiDieuTri: formValues.bacSiDieuTri,
        trangThai: "DANG_DIEU_TRI" as const,
        ngayBatDau: formValues.ngayBatDau.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        ghiChu: formValues.notes || "",
        donThuocDieuTri: {
          benhNhanId: parseInt(id || "0"),
          dieuTriId: 0,
          maDonThuoc: `DT${Date.now()}`,
          bacSiKeDon: formValues.bacSiDieuTri,
          ghiChu: formValues.notes || "",
          trangThai: "MOI_TAO" as const,
          danhSachThuoc: medicines.map((medicine) => ({
            thuocId: medicine.thuocId,
            soLuong: medicine.soLuong,
            lieuDung: medicine.lieuDung,
            duongDung: medicine.duongDung,
            tanSuat: medicine.tanSuat,
            thoiGianDung: medicine.thoiGianDung,
            huongDanSuDung: medicine.huongDanSuDung || "",
            giaDonVi: medicine.giaDonVi,
            thanhTien: medicine.thanhTien,
          })),
        },
      };

      await treatmentService.taoMoiLichSuDieuTri(treatmentData);
      message.success(t("treatment.createSuccess"));
      navigate(`/patients/${id}`);
    } catch {
      message.error(t("treatment.createError"));
    } finally {
      setIsSubmitting(false);
    }
  };



  // Chuyển đổi dữ liệu patient cho PatientInfo component
  const patientInfo = patient
    ? {
        hoTen: patient.hoTen,
        ngaySinh: patient.ngaySinh,
        gioiTinh: patient.gioiTinh,
        soDienThoai: patient.soDienThoai,
        email: patient.email,
        diaChi: patient.diaChi,
        danhSachDiUng:
          patient.danhSachDiUng?.map((diUng) => diUng.thuoc.tenThuoc) || [],
        danhSachBenhLyNen:
          patient.danhSachBenhLyNen?.map((benhLy) => benhLy.tenBenh) || [],
      }
    : {};

  return (
    <div
      ref={scrollContainerRef}
      style={{ 
        height: "100vh", 
        overflowY: "auto",
        overflowX: "hidden",
        maxWidth: "100vw",
        boxSizing: "border-box"
      }}
    >
      <Breadcrumb
        items={[
          {
            title: t("patient.title"),
            path: "/patients",
            icon: <UserOutlined />
          },
          {
            title: patient?.hoTen || t("patient.loading"),
            path: `/patients/${id}`,
            icon: <UserOutlined />
          },
          {
            title: t("treatment.addTreatment"),
            icon: <PlusOutlined />
          }
        ]}
      />
      


      <StyledTitle level={2}>{t("treatment.addTreatment")}</StyledTitle>

      <Row gutter={[24, 24]}>
        {/* Cột bên trái - Form */}
        <Col xs={24} lg={16}>
          <StyledCard>
            <StyledForm form={form} layout="vertical" onFinish={handleSubmit}>
              <FormSection>
                <div className="section-title">
                  {t("treatment.diagnosisInfo")}
                </div>

                <Form.Item
                  name="maChanDoan"
                  label={t("treatment.diagnosisCode")}
                  rules={[
                    {
                      required: true,
                      message:
                        t("treatment.diagnosisCode") +
                        " " +
                        t("common.required"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("treatment.diagnosisCodePlaceholder")}
                  />
                </Form.Item>

                <Form.Item
                  name="chanDoanChinh"
                  label={t("treatment.mainDiagnosis")}
                  rules={[
                    {
                      required: true,
                      message:
                        t("treatment.mainDiagnosis") +
                        " " +
                        t("common.required"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("treatment.mainDiagnosisPlaceholder")}
                  />
                </Form.Item>

                <Form.Item
                  name="chanDoanPhu"
                  label={t("treatment.secondaryDiagnosis")}
                >
                  <Input
                    placeholder={t("treatment.secondaryDiagnosisPlaceholder")}
                  />
                </Form.Item>

                <Form.Item name="trieuChung" label={t("treatment.symptoms")}>
                  <TextArea
                    placeholder={t("treatment.symptomsPlaceholder")}
                    rows={3}
                    showCount
                    maxLength={500}
                  />
                </Form.Item>

                <Form.Item
                  name="bacSiDieuTri"
                  label={t("treatment.treatingDoctor")}
                  rules={[
                    {
                      required: true,
                      message:
                        t("treatment.treatingDoctor") +
                        " " +
                        t("common.required"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("treatment.treatingDoctorPlaceholder")}
                  />
                </Form.Item>

                <Form.Item
                  name="ngayBatDau"
                  label={t("treatment.startDate")}
                  rules={[
                    {
                      required: true,
                      message:
                        t("treatment.startDate") + " " + t("common.required"),
                    },
                  ]}
                >
                  <DatePickerStyled
                    placeholder={t("treatment.startDatePlaceholder")}
                    format="DD/MM/YYYY"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </FormSection>

              <FormSection>
                <div className="section-title">
                  {t("treatment.prescription")}
                </div>

                <AddMedicineButton
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={handleAddMedicine}
                  block
                >
                  {t("treatment.addMedicine")}
                </AddMedicineButton>

                <MedicineList
                  medicines={medicines}
                  onRemove={handleRemoveMedicine}
                />

              </FormSection>

              <FormSection>
                <div className="section-title">{t("treatment.notes")}</div>

                <Form.Item name="notes" label={t("treatment.notes")}>
                  <TextArea
                    placeholder={t("treatment.notesPlaceholder")}
                    rows={6}
                    showCount
                    maxLength={500}
                  />
                </Form.Item>
              </FormSection>

              <ActionButtons>
                <PrimaryButton
                  type="primary"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  loading={isSubmitting}
                >
                  {t("treatment.saveTreatment")}
                </PrimaryButton>
              </ActionButtons>
            </StyledForm>
          </StyledCard>
        </Col>

        {/* Cột bên phải - Thông tin bệnh nhân */}
        <Col xs={24} lg={8}>
          <PatientInfo patient={patientInfo} loading={isLoadingPatient} />

          <TreatmentAnalysisContainer
            ref={analysisRef}
            $isFixed={isAnalysisFixed}
          >
            <TreatmentAnalysis
              medicines={medicines}
              patientAllergies={
                patient?.danhSachDiUng?.map((diUng) => diUng.thuoc.tenThuoc) ||
                []
              }
              patientMedicalHistory={
                patient?.danhSachBenhLyNen?.map((benhLy) => benhLy.tenBenh) ||
                []
              }
            />
          </TreatmentAnalysisContainer>
        </Col>
      </Row>

      {/* Add Medicine Modal */}
      <AddMedicineModal
        visible={isAddMedicineModalVisible}
        onCancel={() => setIsAddMedicineModalVisible(false)}
        onAdd={handleAddMedicineFromModal}
        medicinesData={medicinesData}
      />
    </div>
  );
};
