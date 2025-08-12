import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Space,
  Typography,
  Alert,
  Row,
  Col,
  Statistic,
  Tag,
  Spin,
} from "antd";
import {
  SafetyOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useLanguage } from "@/hooks/useLanguage";
import { useAnalysis } from "@/hooks/useAnalysis";
import type { PrescriptionAnalysisResponse } from "@/types";
import {
  getOverallRisk,
  getRiskLevel,
  getRecommendations,
} from "@/utils/analysisHelpers";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import styled from "styled-components";

const { Text } = Typography;

const AnalysisCard = styled(Card)`
  margin-bottom: 16px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  .ant-card-head {
    color: #1f2937;

    .ant-card-head-title {
      color: #1f2937;
      font-weight: 600;
    }
  }

  .analysis-status {
    text-align: center;
    margin: 16px 0;

    .status-icon {
      font-size: 48px;
      margin-bottom: 8px;
    }

    .status-text {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .quick-stats {
    margin-bottom: 16px;
  }

  .recommendations {
    .recommendation-item {
      margin-bottom: 8px;
      padding: 8px;
      border-radius: 6px;

      &.compatible {
        background-color: #f6ffed;
        border: 1px solid #b7eb8f;
      }

      &.necessary {
        background-color: #e6f7ff;
        border: 1px solid #91d5ff;
      }

      &.unnecessary {
        background-color: #fff2e8;
        border: 1px solid #ffbb96;
      }
    }
  }


`;

interface Medicine {
  id: string;
  thuocId: number;
  name: string;
  soLuong: number;
  lieuDung: string;
  duongDung: string;
  tanSuat: string;
  thoiGianDung: string;
  giaDonVi: number;
  thanhTien: number;
}

interface TreatmentAnalysisProps {
  medicines: Medicine[];
  patientAllergies?: string[];
  patientMedicalHistory?: string[];
}

export const TreatmentAnalysis: React.FC<TreatmentAnalysisProps> = ({
  medicines,
  patientAllergies,
  patientMedicalHistory,
}) => {
  const { t } = useLanguage();
  const { loading, error, phanTichDonThuoc, clearError } = useAnalysis();

  const [analysisResult, setAnalysisResult] =
    useState<PrescriptionAnalysisResponse | null>(null);
  const [hasValidData, setHasValidData] = useState(false);
  const [analysisDate] = useState(new Date());
  const handleAnalysis = useCallback(async () => {
    try {
      clearError();
      const result = await phanTichDonThuoc({
        prescription_list: medicines
          .filter((m) => m.thuocId > 0)
          .map((m) => ({
            drug_name: m.name || `Thuốc ${m.thuocId}`,
            dosage: m.lieuDung || "Không xác định",
            frequency: m.tanSuat || "Không xác định",
          })),
        // Sử dụng thông tin từ PatientInfo
        allergies: patientAllergies || [],
        medical_history: patientMedicalHistory || [],
        // Không cần chẩn đoán, tuổi, cân nặng, giới tính
      });
      setAnalysisResult(result);
    } catch (err) {
      console.error("Analysis error:", err);
    }
  }, [
    clearError,
    phanTichDonThuoc,
    medicines,
    patientAllergies,
    patientMedicalHistory,
  ]);

  // Reset kết quả phân tích khi thuốc thay đổi
  useEffect(() => {
    setAnalysisResult(null);
  }, [medicines]);

  // Kiểm tra xem có đủ dữ liệu để phân tích không
  useEffect(() => {
    const hasMedicines =
      medicines.length > 0 && medicines.some((m) => m.thuocId > 0);
    setHasValidData(hasMedicines);

    // Chỉ gọi API khi có thuốc và không đang loading
    if (!loading) {
      // Delay nhỏ để tránh gọi API quá nhiều lần
      const timer = setTimeout(() => {
        handleAnalysis();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [medicines]);

  const getSafetyLevelColor = (level: string) => {
    switch (level) {
      case "AN_TOAN":
        return "success";
      case "CAN_THAN_TRONG":
        return "warning";
      case "NGUY_HIEM":
        return "error";
      default:
        return "default";
    }
  };


  const getSafetyLevelText = (level: string) => {
    switch (level) {
      case "AN_TOAN":
        return "An toàn";
      case "CAN_THAN_TRONG":
        return "Cần thận trọng";
      case "NGUY_HIEM":
        return "Nguy hiểm";
      default:
        return "Không xác định";
    }
  };

  if (!hasValidData) {
    return (
      <AnalysisCard
        title={
          <Space>
            <SafetyOutlined />
            {t("analysis.prescriptionAnalysis")}
            {hasValidData && (
              <Tag color="success" style={{ marginLeft: 8 }}>
                ✓ Đang theo dõi thay đổi
              </Tag>
            )}
          </Space>
        }
      >
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <InfoCircleOutlined
            style={{ fontSize: 48, color: "#d9d9d9", marginBottom: 16 }}
          />
          <Text type="secondary">
            Vui lòng chọn thuốc từ form đơn thuốc để bắt đầu phân tích tự động
          </Text>
          <div style={{ marginTop: 8 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              • Chọn thuốc từ danh sách để kích hoạt phân tích tự động
              <br />
              • Thông tin allergies và medical_history từ PatientInfo
              <br />• Phân tích tương tác thuốc và chống chỉ định sẽ được thực
              hiện tự động
            </Text>
          </div>
        </div>
      </AnalysisCard>
    );
  }

  return (
    <AnalysisCard
      title={
        <Space>
          <SafetyOutlined />
          {t("analysis.prescriptionAnalysis")}
        </Space>
      }
    >
      {!analysisResult && (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Đang theo dõi tự động:{" "}
                {medicines.filter((m) => m.thuocId > 0).length} thuốc
                {patientMedicalHistory && patientMedicalHistory.length > 0 && (
                  <>, medical_history: {patientMedicalHistory.length} bệnh lý</>
                )}
                {patientAllergies && patientAllergies.length > 0 && (
                  <>, allergies: {patientAllergies.length} dị ứng</>
                )}
              </Text>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <Text type="secondary">
              Phân tích tự động sẽ được thực hiện khi chọn thuốc từ form đơn
              thuốc
            </Text>
          </div>
        </div>
      )}

      {error && (
        <Alert
          message="Lỗi phân tích"
          description={error}
          type="error"
          showIcon
          closable
          onClose={clearError}
          style={{ marginBottom: 16 }}
        />
      )}

      {loading && (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>
            <Text>{t("analysis.analysisInProgress")}</Text>
          </div>
        </div>
      )}

      {analysisResult && (
        <div>
          <div className="analysis-status">
            <div className="status-text">
              <Tag
                color={getSafetyLevelColor(getRiskLevel(analysisResult))}
                style={{ fontSize: 16, padding: "8px 16px" }}
              >
                {getSafetyLevelText(getRiskLevel(analysisResult))}
              </Tag>
            </div>
            <div style={{ marginTop: 16 }}>
              <Row gutter={16} justify="center">
                <Col>
                  <Statistic
                    title="Mức độ rủi ro"
                    value={getOverallRisk(analysisResult)}
                    valueStyle={{
                      fontSize: 24,
                      color:
                        getSafetyLevelColor(getRiskLevel(analysisResult)) ===
                        "success"
                          ? "#3f8600"
                          : getSafetyLevelColor(
                              getRiskLevel(analysisResult)
                            ) === "warning"
                          ? "#faad14"
                          : "#cf1322",
                    }}
                  />
                </Col>
              </Row>
            </div>
          </div>

          <div className="recommendations">
            {getRecommendations(analysisResult, "tongHop").length > 0 && (
              <div className="recommendation-item compatible">
                <Text strong>✅ Thuốc tương thích:</Text>
                <ul style={{ margin: "8px 0 0 20px" }}>
                  {getRecommendations(analysisResult, "tongHop").map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            {getRecommendations(analysisResult, "canThiet").length > 0 && (
              <div className="recommendation-item necessary">
                <Text strong>💡 Cần thiết:</Text>
                <ul style={{ margin: "8px 0 0 20px" }}>
                  {getRecommendations(analysisResult, "canThiet").map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            {getRecommendations(analysisResult, "khongCanThiet").length > 0 && (
              <div className="recommendation-item unnecessary">
                <Text strong>⚠️ Không cần thiết:</Text>
                <ul style={{ margin: "8px 0 0 20px" }}>
                  {getRecommendations(analysisResult, "khongCanThiet").map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Hiển thị thông tin tổng hợp */}
            <div
              style={{
                marginTop: 16,
                padding: 16,
                backgroundColor: "#f5f5f5",
                borderRadius: 6,
              }}
            >
              <Text strong>📋 Tóm tắt phân tích:</Text>
              <ul style={{ margin: "8px 0 0 20px" }}>
                <li>
                  Đã phân tích{" "}
                  <Text strong>
                    {medicines.filter((m) => m.thuocId > 0).length}
                  </Text>{" "}
                  loại thuốc
                </li>
                <li>
                  Phát hiện{" "}
                  <Text strong style={{ color: "#cf1322" }}>
                    {patientAllergies?.length || 0}
                  </Text>{" "}
                  dị ứng thuốc
                </li>
                <li>
                  Phát hiện{" "}
                  <Text strong style={{ color: "#faad14" }}>
                    {patientMedicalHistory?.length || 0}
                  </Text>{" "}
                  bệnh lý nền
                </li>
                <li>
                  Mức độ rủi ro tổng thể:{" "}
                  <Text strong>{getOverallRisk(analysisResult)}</Text>
                </li>
                <li>
                  Thời gian phân tích:{" "}
                  <Text strong>
                    {format(analysisDate, "dd/MM/yyyy HH:mm", { locale: vi })}
                  </Text>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </AnalysisCard>
  );
};
