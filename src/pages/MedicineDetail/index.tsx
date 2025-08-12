import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Tag,
  Button,
  Row,
  Col,
  Statistic,
  Space,
  Alert,
  Spin,
} from "antd";
import {
  MedicineBoxOutlined,
  DollarOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useLanguage } from "@/hooks/useLanguage";
import { useMedicine } from "@/hooks/useMedicines";
import { Breadcrumb } from "@/components";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  SPACING,
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
} from "@/constants";

// Styled components giống với PatientDetail
const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .ant-card-body {
    padding: 24px;
  }
`;

const InfoCard = styled(Card)`
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  background: ${COLORS.BG_PRIMARY};
  margin-bottom: ${SPACING.MARGIN_LG};

  .ant-card-head {
    border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
    padding: ${SPACING.PADDING_LG};

    .ant-card-head-title {
      font-weight: ${FONT_WEIGHT.SEMIBOLD};
      color: ${COLORS.TEXT_PRIMARY};
      font-size: ${FONT_SIZE.LG};
    }
  }

  .ant-card-body {
    padding: ${SPACING.PADDING_LG};
  }

  .info-grid {
    display: flex;
    flex-direction: column;
    gap: 0;

    .info-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${SPACING.PADDING_MD} 0;
      border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};

      &:last-child {
        border-bottom: none;
      }

      .info-label {
        display: flex;
        align-items: center;
        font-weight: ${FONT_WEIGHT.MEDIUM};
        color: ${COLORS.TEXT_SECONDARY};
        min-width: 140px;
        margin-right: ${SPACING.MARGIN_MD};
        font-size: ${FONT_SIZE.SM};
      }

      .info-value {
        color: ${COLORS.TEXT_PRIMARY};
        font-weight: ${FONT_WEIGHT.MEDIUM};
        flex: 1;
        text-align: right;
        font-size: ${FONT_SIZE.SM};

        .ant-alert-message,
        .ant-alert-description {
          text-align: left;
        }
      }
    }
  }
`;

const MedicineHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${SPACING.MARGIN_XXL};
  padding: ${SPACING.PADDING_XXL};
  background: linear-gradient(135deg, #2c92b8 0%, #1e7a9a 100%);
  border-radius: ${BORDER_RADIUS.LG};
  color: white;
  box-shadow: none;

  .medicine-icon {
    margin-right: ${SPACING.MARGIN_XL};
    font-size: 48px;
    color: white;
  }

  .medicine-info {
    flex: 1;

    .medicine-name {
      font-size: ${FONT_SIZE.XXXL};
      font-weight: ${FONT_WEIGHT.BOLD};
      margin: 0 0 ${SPACING.MARGIN_MD} 0;
      color: white;
    }

    .medicine-meta {
      display: flex;
      align-items: center;
      gap: ${SPACING.MARGIN_MD};
      margin-bottom: ${SPACING.MARGIN_MD};

      .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: ${FONT_SIZE.SM};
        opacity: 0.9;
      }
    }
  }

  .medicine-actions {
    display: flex;
    gap: ${SPACING.MARGIN_MD};

    .ant-btn {
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      background: rgba(255, 255, 255, 0.1);

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
      }
    }
  }
`;

export const MedicineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Sử dụng hook để lấy dữ liệu thuốc
  const { medicine, isLoadingMedicine, medicineError } = useMedicine(
    parseInt(id || "0")
  );

  const getDrugGroupText = (group?: string) => {
    switch (group) {
      case "KHANG_SINH":
        return t("medicine.groups.antibiotic");
      case "GIAM_DAU":
        return t("medicine.groups.painkiller");
      case "CHONG_VIEM":
        return t("medicine.groups.antiInflammatory");
      case "TIM_MACH":
        return t("medicine.groups.cardiovascular");
      case "TIEU_HOA":
        return t("medicine.groups.digestive");
      case "HOI_SUC":
        return t("medicine.groups.respiratory");
      case "KHAC":
        return t("medicine.groups.other");
      default:
        return t("medicine.noData");
    }
  };

  const getDrugGroupColor = (group?: string) => {
    switch (group) {
      case "KHANG_SINH":
        return "red";
      case "GIAM_DAU":
        return "orange";
      case "CHONG_VIEM":
        return "blue";
      case "TIM_MACH":
        return "purple";
      case "TIEU_HOA":
        return "green";
      case "HOI_SUC":
        return "cyan";
      case "KHAC":
        return "default";
      default:
        return "default";
    }
  };

  if (isLoadingMedicine) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (medicineError || !medicine) {
    return (
      <div style={{ padding: "24px" }}>
        <Alert
          message={t("medicine.error")}
          description={t("medicine.noData")}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => navigate("/medicines")}>
              {t("medicine.backToMedicines")}
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: t("medicine.title"),
            path: "/medicines",
            icon: <MedicineBoxOutlined />
          },
          {
            title: medicine.tenThuoc,
            icon: <MedicineBoxOutlined />
          }
        ]}
      />

      {/* Header với thông tin cơ bản */}
      <MedicineHeader>
        <div className="medicine-icon">
          <MedicineBoxOutlined />
        </div>
        <div className="medicine-info">
          <h1 className="medicine-name">{medicine.tenThuoc}</h1>
          <div className="medicine-meta">
            <div className="meta-item">
              <InfoCircleOutlined />
              {medicine.maThuoc}
            </div>
            <div className="meta-item">
              <DollarOutlined />
              {medicine.giaBan
                ? `${medicine.giaBan.toLocaleString()} VNĐ`
                : "---"}
            </div>
            <div className="meta-item">
              <CalendarOutlined />
              {medicine.ngayTao
                ? dayjs(medicine.ngayTao).format("DD/MM/YYYY")
                : "---"}
            </div>
          </div>
        </div>
      </MedicineHeader>

      {/* Thống kê tổng quan */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title={t("medicine.drugCode")}
              value={medicine.maThuoc}
              prefix={<InfoCircleOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title={t("medicine.priceValue")}
              value={
                medicine.giaBan
                  ? `${medicine.giaBan.toLocaleString()} VNĐ`
                  : "---"
              }
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Statistic
              title={t("medicine.createdAt")}
              value={
                medicine.ngayTao
                  ? dayjs(medicine.ngayTao).format("DD/MM/YYYY")
                  : "---"
              }
              prefix={<CalendarOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </StyledCard>
        </Col>
      </Row>

      {/* Thông tin chi tiết */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <InfoCard
            title={
              <Space>
                <InfoCircleOutlined />
                {t("medicine.basicInfo")}
              </Space>
            }
          >
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">
                  <InfoCircleOutlined style={{ marginRight: "8px" }} />
                  {t("medicine.drugCode")}:
                </span>
                <span className="info-value">{medicine.maThuoc || "---"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  <MedicineBoxOutlined style={{ marginRight: "8px" }} />
                  {t("medicine.drugName")}:
                </span>
                <span className="info-value">{medicine.tenThuoc || "---"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  <InfoCircleOutlined style={{ marginRight: "8px" }} />
                  {t("medicine.activeIngredientName")}:
                </span>
                <span className="info-value">
                  {medicine.tenHoatChat || "---"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  <InfoCircleOutlined style={{ marginRight: "8px" }} />
                  {t("medicine.concentrationValue")}:
                </span>
                <span className="info-value">{medicine.nongDo || "---"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  <InfoCircleOutlined style={{ marginRight: "8px" }} />
                  {t("medicine.dosageFormType")}:
                </span>
                <span className="info-value">
                  {medicine.dangBaoChe || "---"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  <InfoCircleOutlined style={{ marginRight: "8px" }} />
                  {t("medicine.manufacturerName")}:
                </span>
                <span className="info-value">
                  {medicine.hangSanXuat || "---"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  <InfoCircleOutlined style={{ marginRight: "8px" }} />
                  {t("medicine.countryOfOrigin")}:
                </span>
                <span className="info-value">
                  {medicine.nuocSanXuat || "---"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  <InfoCircleOutlined style={{ marginRight: "8px" }} />
                  {t("medicine.unitOfMeasurement")}:
                </span>
                <span className="info-value">
                  {medicine.donViTinh || "---"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  <InfoCircleOutlined style={{ marginRight: "8px" }} />
                  {t("medicine.drugGroupType")}:
                </span>
                <span className="info-value">
                  {medicine.nhomThuoc ? (
                    <Tag color={getDrugGroupColor(medicine.nhomThuoc)}>
                      {getDrugGroupText(medicine.nhomThuoc)}
                    </Tag>
                  ) : (
                    "---"
                  )}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  <InfoCircleOutlined style={{ marginRight: "8px" }} />
                  {t("medicine.isActive")}:
                </span>
                <span className="info-value">
                  <Tag color={medicine.kichHoat ? "green" : "red"}>
                    {medicine.kichHoat
                      ? t("medicine.available")
                      : t("medicine.outOfStock")}
                  </Tag>
                </span>
              </div>
            </div>
          </InfoCard>
        </Col>

        <Col xs={24} lg={12}>
          <InfoCard
            title={
              <Space>
                <SafetyOutlined />
                {t("medicine.medicalInfo")}
              </Space>
            }
          >
            <div className="info-grid">
              <div className="info-item">
                <span className="info-value">
                  {medicine.chiDinh ? (
                    <Alert
                      message={t("medicine.indicationsText")}
                      description={medicine.chiDinh}
                      type="info"
                      showIcon
                      icon={<InfoCircleOutlined />}
                      style={{ marginBottom: 0 }}
                    />
                  ) : (
                    "---"
                  )}
                </span>
              </div>
              <div className="info-item">
                <span className="info-value">
                  {medicine.chongChiDinh ? (
                    <Alert
                      message={t("medicine.contraindicationsText")}
                      description={medicine.chongChiDinh}
                      type="warning"
                      showIcon
                      icon={<SafetyOutlined />}
                      style={{ marginBottom: 0 }}
                    />
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
  );
};
