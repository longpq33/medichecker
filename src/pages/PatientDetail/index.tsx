import React, { useState, useEffect } from "react";
import {
  Typography,
  Tag,
  Avatar,
  Badge,
  Card,
  Row,
  Col,
  Statistic,
  Space,
  Alert,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import {
  UserOutlined,
  MedicineBoxOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  FileTextOutlined,
  TeamOutlined,
  AlertOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  PatientHeader,
  PatientStats,
  InfoCard,
  StyledTabs,
  AddTreatmentButton,
} from "./styled";
import { usePatient } from "@/hooks/usePatients";
import { useBenhLyNen } from "@/hooks/useBenhLyNen";
import { useLanguage } from "@/hooks/useLanguage";
import { EditTreatmentModal } from "./components/EditTreatmentModal";
import { Breadcrumb } from "@/components";
import { useDiUng } from "@/hooks/useDiUng";
import { DiUngTab, DeleteDiUngModal } from "./components";
import type { LichSuDieuTriResponse } from "@/types";


const { Text } = Typography;

export const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // State cho edit modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTreatment, setSelectedTreatment] =
    useState<LichSuDieuTriResponse | null>(null);

  // State cho modal bệnh nền
  const [benhLyNenModalVisible, setBenhLyNenModalVisible] = useState(false);
  const [benhLyNenForm] = Form.useForm();

  // Sử dụng hook
  const { patient, isLoadingPatient, refetchPatient } = usePatient(
    parseInt(id || "0")
  );

  // Hook cho bệnh nền
  const { 
    benhLyNenList, 
    isLoading: isLoadingBenhLyNen, 
    getBenhLyNenByBenhNhan,
    createBenhLyNen,
    deleteModalVisible,
    deletingBenhLyNen,
    showDeleteModal,
    hideDeleteModal,
    confirmDelete
  } = useBenhLyNen();

  // Hook cho dị ứng thuốc
  const {
    diUngList,
    isLoading: isLoadingDiUng,
    modalVisible: diUngModalVisible,
    deleteModalVisible: diUngDeleteModalVisible,
    deletingDiUng,
    getDiUngByBenhNhan: getDiUngByBenhNhanHook,
    createDiUng,
    showModal: showDiUngModal,
    hideModal: hideDiUngModal,
    showDeleteModal: showDiUngDeleteModal,
    hideDeleteModal: hideDiUngDeleteModal,
    confirmDelete: confirmDiUngDelete
  } = useDiUng();

  // Load danh sách bệnh nền khi component mount
  useEffect(() => {
    if (patient?.id) {
      getBenhLyNenByBenhNhan(patient.id);
      getDiUngByBenhNhanHook(patient.id);
    }
  }, [patient?.id, getBenhLyNenByBenhNhan, getDiUngByBenhNhanHook]);

  const getGenderText = (gender?: string) => {
    switch (gender) {
      case "NAM":
        return t("common.male");
      case "NU":
        return t("common.female");
      case "KHAC":
        return t("common.other");
      default:
        return t("patient.noData");
    }
  };

  const getGenderColor = (gender?: string) => {
    switch (gender) {
      case "NAM":
        return "blue";
      case "NU":
        return "pink";
      case "KHAC":
        return "orange";
      default:
        return "default";
    }
  };

  const handleAddTreatment = () => {
    navigate(`/patients/${id}/add-treatment`);
  };

  const handleEditSuccess = () => {
    setEditModalVisible(false);
    setSelectedTreatment(null);
    refetchPatient();
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setSelectedTreatment(null);
  };

  if (isLoadingPatient) {
    return <div>{t("common.loading")}</div>;
  }

  if (!patient) {
    return <div>{t("patient.notFound")}</div>;
  }

  const tabItems = [
    {
      key: "overview",
      label: (
        <Space>
          <UserOutlined />
          {t("patient.overview")}
        </Space>
      ),
      children: (
        <div>
          {/* Bottom Section - Main Information Cards */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <InfoCard
                title={
                  <Space>
                    <UserOutlined />
                    {t("patient.personalInfo")}
                  </Space>
                }
              >
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">
                      <UserOutlined style={{ marginRight: "8px" }} />
                      {t("patient.fullName")}:
                    </span>
                    <span className="info-value">{patient.hoTen || "---"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <CalendarOutlined style={{ marginRight: "8px" }} />
                      {t("common.age")}:
                    </span>
                    <span className="info-value">
                      {patient.ngaySinh
                        ? `${dayjs().diff(dayjs(patient.ngaySinh), "year")} ${t(
                            "common.age"
                          )}`
                        : "---"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <UserOutlined style={{ marginRight: "8px" }} />
                      {t("common.gender")}:
                    </span>
                    <span className="info-value">
                      <Tag color={getGenderColor(patient.gioiTinh)}>
                        {getGenderText(patient.gioiTinh)}
                      </Tag>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <PhoneOutlined style={{ marginRight: "8px" }} />
                      {t("common.phone")}:
                    </span>
                    <span className="info-value">
                      {patient.soDienThoai || "---"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <MailOutlined style={{ marginRight: "8px" }} />
                      {t("common.email")}:
                    </span>
                    <span className="info-value">{patient.email || "---"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <HomeOutlined style={{ marginRight: "8px" }} />
                      {t("common.address")}:
                    </span>
                    <span className="info-value">
                      {patient.diaChi || "---"}
                    </span>
                  </div>
                </div>
              </InfoCard>
            </Col>

            <Col xs={24} lg={12}>
              <InfoCard
                title={
                  <Space>
                    <MedicineBoxOutlined />
                    {t("patient.medicalInfo")}
                  </Space>
                }
              >
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">
                      <MedicineBoxOutlined style={{ marginRight: "8px" }} />
                      {t("patient.bloodType")}:
                    </span>
                    <span className="info-value">
                      {patient.nhomMau ? (
                        <Tag
                          color="red"
                          style={{
                            backgroundColor: "#fef2f2",
                            color: "#dc2626",
                            border: "1px solid #fecaca",
                          }}
                        >
                          {patient.nhomMau}
                        </Tag>
                      ) : (
                        "---"
                      )}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <PhoneOutlined style={{ marginRight: "8px" }} />
                      {t("patient.emergencyContact")}:
                    </span>
                    <span className="info-value">
                      {patient.lienHeKhanCap || "---"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <FileTextOutlined style={{ marginRight: "8px" }} />
                      {t("patient.medicalHistory")}:
                    </span>
                    <span className="info-value">
                      {patient.danhSachBenhLyNen &&
                      patient.danhSachBenhLyNen.length > 0 ? (
                        <Space wrap>
                          {patient.danhSachBenhLyNen.map((benhLy) => (
                            <Tag
                              key={benhLy.id}
                              color="blue"
                              style={{
                                backgroundColor: "#eff6ff",
                                color: "#1d4ed8",
                                border: "1px solid #dbeafe",
                              }}
                            >
                              {benhLy.tenBenh}
                            </Tag>
                          ))}
                        </Space>
                      ) : (
                        "---"
                      )}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <AlertOutlined style={{ marginRight: "8px" }} />
                      {t("patient.allergies")}:
                    </span>
                    <span className="info-value">
                      {patient.danhSachDiUng &&
                      patient.danhSachDiUng.length > 0 ? (
                        <Space wrap>
                          {patient.danhSachDiUng.map((diUng) => (
                            <Tag
                              key={diUng.id}
                              color="red"
                              style={{
                                backgroundColor: "#fef2f2",
                                color: "#dc2626",
                                border: "1px solid #fecaca",
                              }}
                            >
                              {diUng.thuoc.tenThuoc}
                              {diUng.trieuChung && ` (${diUng.trieuChung})`}
                            </Tag>
                          ))}
                        </Space>
                      ) : (
                        "---"
                      )}
                    </span>
                  </div>
                </div>
              </InfoCard>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "treatment-history",
      label: (
        <Space>
          <MedicineBoxOutlined />
          {t("patient.treatmentHistory")}
        </Space>
      ),
      children: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
          </div>

          {patient.danhSachDieuTri && patient.danhSachDieuTri.length > 0 ? (
            <div>
              {patient.danhSachDieuTri.map((treatment) => (
                <Card
                  key={treatment.id}
                  style={{
                    marginBottom: "16px",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      {/* Date and Status */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "16px",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            marginRight: "12px",
                          }}
                        >
                          {treatment.donThuocDieuTri
                            ? dayjs(treatment.donThuocDieuTri.ngayKeDon).format(
                                "DD/MM/YYYY"
                              )
                            : t("patient.noData")}
                        </div>
                      </div>

                      {/* Diagnosis */}
                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            fontWeight: "bold",
                            marginBottom: "8px",
                            color: "#374151",
                          }}
                        >
                          {t("patient.diagnosis")}
                        </div>
                        <div style={{ color: "#6b7280" }}>
                          {treatment.chanDoanChinh}
                          {treatment.chanDoanPhu &&
                            ` - ${treatment.chanDoanPhu}`}
                        </div>
                      </div>

                      {/* Symptoms */}
                      {treatment.trieuChung && (
                        <div style={{ marginBottom: "16px" }}>
                          <div
                            style={{
                              fontWeight: "bold",
                              marginBottom: "8px",
                              color: "#374151",
                            }}
                          >
                            {t("patient.symptoms")}
                          </div>
                          <div style={{ color: "#6b7280" }}>
                            {treatment.trieuChung}
                          </div>
                        </div>
                      )}

                      {/* Doctor and Prescription in a row */}
                      <div
                        style={{
                          display: "flex",
                          gap: "24px",
                          marginBottom: "16px",
                        }}
                      >
                        {/* Doctor */}
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "8px",
                            }}
                          >
                            <UserOutlined
                              style={{ marginRight: "8px", color: "#6b7280" }}
                            />
                            <span
                              style={{ fontWeight: "bold", color: "#374151" }}
                            >
                              {t("patient.doctor")}
                            </span>
                          </div>
                          <div style={{ color: "#6b7280" }}>
                            {treatment.bacSiDieuTri}
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {treatment.donThuocDieuTri?.ghiChu && (
                        <div style={{ marginBottom: "16px" }}>
                          <div
                            style={{
                              fontWeight: "bold",
                              marginBottom: "8px",
                              color: "#374151",
                            }}
                          >
                            {t("patient.notes")}
                          </div>
                          <div style={{ color: "#6b7280" }}>
                            {treatment.donThuocDieuTri.ghiChu}
                          </div>
                        </div>
                      )}

                      {/* Medicine List */}
                      {treatment.donThuocDieuTri?.danhSachThuoc &&
                        treatment.donThuocDieuTri.danhSachThuoc.length > 0 && (
                          <div>
                            <div
                              style={{
                                fontWeight: "bold",
                                marginBottom: "8px",
                                color: "#374151",
                              }}
                            >
                              {t("patient.medicineList")}
                            </div>
                            <div
                              style={{ color: "#6b7280", marginBottom: "8px" }}
                            >
                              {treatment.donThuocDieuTri.danhSachThuoc
                                .map(
                                  (med) =>
                                    `${med.thuoc.tenThuoc} x ${med.lieuDung}`
                                )
                                .join(", ")}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                              }}
                            >
                              {treatment.donThuocDieuTri.danhSachThuoc.map(
                                (med, index) => (
                                  <Tag
                                    key={index}
                                    style={{
                                      backgroundColor: "#eff6ff",
                                      color: "#1d4ed8",
                                      border: "1px solid #dbeafe",
                                      borderRadius: "16px",
                                      padding: "4px 12px",
                                    }}
                                  >
                                    {med.thuoc.tenThuoc}
                                  </Tag>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Alert
              message={t("patient.noTreatmentHistory")}
              description={t("patient.noTreatmentHistoryDesc")}
              type="info"
              showIcon
            />
          )}
        </div>
      ),
    },
    {
      key: "benh-ly-nen",
      label: (
        <Space>
          <FileTextOutlined />
          {t("benhLyNen.title")}
        </Space>
      ),
      children: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                benhLyNenForm.resetFields();
                setBenhLyNenModalVisible(true);
              }}
            >
              {t("benhLyNen.addBenhLyNen")}
            </Button>
          </div>

          {isLoadingBenhLyNen ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              {t("benhLyNen.loading")}
            </div>
          ) : benhLyNenList && benhLyNenList.length > 0 ? (
            <div>
              {benhLyNenList.map((benhLy) => (
                <Card
                  key={benhLy.id}
                  style={{
                    marginBottom: "16px",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      {/* Mã bệnh và tên bệnh */}
                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            marginBottom: "8px",
                            color: "#374151",
                          }}
                        >
                          {benhLy.maBenh} - {benhLy.tenBenh}
                        </div>
                        {benhLy.moTa && (
                          <div style={{ color: "#6b7280" }}>
                            {benhLy.moTa}
                          </div>
                        )}
                      </div>

                      {/* Mức độ nghiêm trọng */}
                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            fontWeight: "bold",
                            marginBottom: "8px",
                            color: "#374151",
                          }}
                        >
                          {t("benhLyNen.mucDoNghiemTrong")}:
                        </div>
                        <Tag
                          color={
                            benhLy.mucDoNghiemTrong === "NHE"
                              ? "green"
                              : benhLy.mucDoNghiemTrong === "VUA"
                              ? "orange"
                              : benhLy.mucDoNghiemTrong === "NANG"
                              ? "red"
                              : "volcano"
                          }
                        >
                          {t(`benhLyNen.mucDoNghiemTrongOptions.${benhLy.mucDoNghiemTrong}`)}
                        </Tag>
                      </div>

                      {/* Ngày chẩn đoán */}
                      {benhLy.ngayChanDoan && (
                        <div style={{ marginBottom: "16px" }}>
                          <div
                            style={{
                              fontWeight: "bold",
                              marginBottom: "8px",
                              color: "#374151",
                            }}
                          >
                            {t("benhLyNen.ngayChanDoan")}:
                          </div>
                          <div style={{ color: "#6b7280" }}>
                            {dayjs(benhLy.ngayChanDoan).format("DD/MM/YYYY")}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Button
                        size="small"
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => showDeleteModal(benhLy)}
                        title={t("common.delete")}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Alert
              message={t("benhLyNen.noData")}
              description={t("benhLyNen.noData")}
              type="info"
              showIcon
            />
          )}
        </div>
      ),
    },
    {
      key: "di-ung",
      label: (
        <Space>
          <AlertOutlined />
          {t("diUng.title")}
        </Space>
      ),
      children: (
        <DiUngTab
          patient={patient}
          diUngList={diUngList}
          isLoadingDiUng={isLoadingDiUng}
          modalVisible={diUngModalVisible}
          setModalVisible={hideDiUngModal}
          showModal={showDiUngModal}
          createDiUng={createDiUng}
          getDiUngByBenhNhan={getDiUngByBenhNhanHook}
          refetchPatient={refetchPatient}
          showDeleteModal={showDiUngDeleteModal}
        />
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: t("patient.title"),
            path: "/patients",
            icon: <UserOutlined />
          },
          {
            title: patient?.hoTen || t("patient.loading"),
            icon: <UserOutlined />
          }
        ]}
      />

      <PatientHeader>
        <div className="patient-avatar">
          <Avatar size={100} icon={<UserOutlined />} />
          <div className="status-indicator">
            <Badge status="success" />
          </div>
        </div>

        <div className="patient-info">
          <h1 className="patient-name">{patient.hoTen}</h1>
          <div className="patient-meta">
            <Tag className="status-tag">
              {t("patient.patientId")}: {patient.maBenhNhan}
            </Tag>
            <Tag color={getGenderColor(patient.gioiTinh)}>
              {getGenderText(patient.gioiTinh)}
            </Tag>
          </div>
          <div className="patient-contact">
            {patient.soDienThoai && (
              <Text>
                <PhoneOutlined /> {patient.soDienThoai}
              </Text>
            )}
            {patient.email && (
              <Text>
                <MailOutlined /> {patient.email}
              </Text>
            )}
            {patient.diaChi && (
              <Text>
                <HomeOutlined /> {patient.diaChi}
              </Text>
            )}
          </div>
        </div>
      </PatientHeader>

      <PatientStats>
        <Card>
          <Statistic
            title={t("patient.totalAppointments")}
            value={patient.danhSachDieuTri ? patient.danhSachDieuTri.length : 0}
            prefix={<TeamOutlined />}
            valueStyle={{ color: "#10b981" }}
          />
        </Card>
        <Card>
          <Statistic
            title={t("patient.lastAppointment")}
            value={
              patient.danhSachDieuTri && patient.danhSachDieuTri.length > 0
                ? dayjs(
                    patient.danhSachDieuTri[0]?.donThuocDieuTri?.ngayKeDon
                  ).format("DD/MM/YYYY")
                : t("patient.noData")
            }
            prefix={<CalendarOutlined />}
            valueStyle={{ color: "#1f2937" }}
          />
        </Card>
        <Card>
          <Statistic
            title={t("patient.nextAppointment")}
            value={t("patient.noData")}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: "#8b5cf6" }}
          />
        </Card>
      </PatientStats>

      <div
        style={{
          position: "relative",
          marginBottom: "24px",
        }}
      >
        <StyledTabs defaultActiveKey="overview" items={tabItems} size="large" />
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "0",
            zIndex: 1,
          }}
        >
          <AddTreatmentButton
            icon={<PlusOutlined />}
            onClick={handleAddTreatment}
          >
            {t("patient.addTreatment")}
          </AddTreatmentButton>
        </div>
      </div>

      <EditTreatmentModal
        visible={editModalVisible}
        treatment={selectedTreatment}
        patientId={parseInt(id || "0")}
        onSuccess={handleEditSuccess}
        onCancel={handleEditCancel}
      />

      {/* Modal bệnh nền */}
      <Modal
        title={t("benhLyNen.addBenhLyNen")}
        open={benhLyNenModalVisible}
        onCancel={() => {
          setBenhLyNenModalVisible(false);
          benhLyNenForm.resetFields();
        }}
        onOk={async () => {
          try {
            const values = await benhLyNenForm.validateFields();
            const data = {
              benhNhanId: patient.id,
              maBenh: values.maBenh,
              tenBenh: values.tenBenh,
              moTa: values.moTa,
              ngayChanDoan: values.ngayChanDoan?.toISOString(),
              mucDoNghiemTrong: values.mucDoNghiemTrong,
            };

            const success = await createBenhLyNen(data);
            if (success) {
              getBenhLyNenByBenhNhan(patient.id);
              refetchPatient(); // Refresh thông tin bệnh nhân
              setBenhLyNenModalVisible(false);
              benhLyNenForm.resetFields();
            }
          } catch (error) {
            console.error("Error saving benh ly nen:", error);
          }
        }}
        width={600}
      >
        <Form
          form={benhLyNenForm}
          layout="vertical"
          initialValues={{
            mucDoNghiemTrong: "NHE",
          }}
        >
          <Form.Item
            name="maBenh"
            label={t("benhLyNen.maBenh")}
            rules={[
              { required: true, message: t("validation.required", { field: t("benhLyNen.maBenh") }) },
              { max: 10, message: t("benhLyNen.maBenhMaxLength") },
              {
                validator: (_, value) => {
                  if (value && benhLyNenList) {
                    const existingMaBenh = benhLyNenList.map(item => item.maBenh);
                    if (existingMaBenh.includes(value)) {
                      return Promise.reject(new Error(t("benhLyNen.maBenhDuplicate")));
                    }
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input placeholder={t("benhLyNen.maBenh")} maxLength={10} />
          </Form.Item>

          <Form.Item
            name="tenBenh"
            label={t("benhLyNen.tenBenh")}
            rules={[{ required: true, message: t("validation.required", { field: t("benhLyNen.tenBenh") }) }]}
          >
            <Input placeholder={t("benhLyNen.tenBenh")} />
          </Form.Item>

          <Form.Item
            name="moTa"
            label={t("benhLyNen.moTa")}
          >
            <Input.TextArea rows={3} placeholder={t("benhLyNen.moTa")} />
          </Form.Item>

          <Form.Item
            name="ngayChanDoan"
            label={t("benhLyNen.ngayChanDoan")}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              placeholder={t("benhLyNen.ngayChanDoan")}
            />
          </Form.Item>

          <Form.Item
            name="mucDoNghiemTrong"
            label={t("benhLyNen.mucDoNghiemTrong")}
          >
            <Select placeholder={t("benhLyNen.mucDoNghiemTrong")}>
              <Select.Option value="NHE">{t("benhLyNen.mucDoNghiemTrongOptions.NHE")}</Select.Option>
              <Select.Option value="VUA">{t("benhLyNen.mucDoNghiemTrongOptions.VUA")}</Select.Option>
              <Select.Option value="NANG">{t("benhLyNen.mucDoNghiemTrongOptions.NANG")}</Select.Option>
              <Select.Option value="RAT_NANG">{t("benhLyNen.mucDoNghiemTrongOptions.RAT_NANG")}</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal xóa bệnh nền */}
      <Modal
        title={t("benhLyNen.confirmDelete")}
        open={deleteModalVisible}
        onCancel={hideDeleteModal}
        onOk={async () => {
          const success = await confirmDelete();
          if (success) {
            getBenhLyNenByBenhNhan(patient.id);
            refetchPatient(); // Refresh thông tin bệnh nhân
          }
        }}
        okText={t("common.delete")}
        cancelText={t("common.cancel")}
        okButtonProps={{ danger: true }}
      >
        <p>{t("benhLyNen.deleteConfirm")}</p>
        {deletingBenhLyNen && (
          <p>
            <strong>{deletingBenhLyNen.tenBenh}</strong> ({deletingBenhLyNen.maBenh})
          </p>
        )}
        <p>{t("benhLyNen.deleteWarning")}</p>
      </Modal>

      <DeleteDiUngModal
        visible={diUngDeleteModalVisible}
        deletingDiUng={deletingDiUng}
        onCancel={hideDiUngDeleteModal}
        onOk={async () => {
          const success = await confirmDiUngDelete();
          if (success) {
            refetchPatient();
          }
        }}
      />
    </div>
  );
};
