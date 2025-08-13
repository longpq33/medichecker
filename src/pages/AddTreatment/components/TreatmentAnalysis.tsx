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
  ClockCircleOutlined,
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
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    border-color: #cbd5e1;
  }

  .ant-card-head {
    /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
    border-bottom: 1px solid#f3f4f6;
    padding: 20px 24px;
    margin: 0;

    .ant-card-head-title {
      color: #1f2937;
      font-weight: 600;
      font-size: 16px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .anticon {
      color: white;
      font-size: 20px;
      margin-right: 12px;
    }
  }

  .ant-card-body {
    padding: 32px 24px;
  }

  .analysis-status {
    text-align: center;
    margin: 24px 0;
    padding: 32px 24px;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    border-radius: 12px;
    border: 1px solid #e2e8f0;

    .status-icon {
      font-size: 64px;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .status-text {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .status-subtitle {
      color: #64748b;
      font-size: 14px;
    }
  }

  .quick-stats {
    margin-bottom: 24px;

    .ant-statistic {
      .ant-statistic-title {
        color: #64748b;
        font-size: 14px;
        font-weight: 500;
      }

      .ant-statistic-content {
        color: #1e293b;
        font-weight: 600;
      }
    }
  }

  .recommendations {
    .recommendation-item {
      margin-bottom: 12px;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid;
      transition: all 0.2s ease;

      &:hover {
        transform: translateX(4px);
      }

      &.compatible {
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        border-left-color: #22c55e;
        border: 1px solid #bbf7d0;
      }

      &.necessary {
        background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        border-left-color: #3b82f6;
        border: 1px solid #bfdbfe;
      }

      &.unnecessary {
        background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        border-left-color: #ef4444;
        border: 1px solid #fecaca;
      }
    }
  }

  .placeholder-content {
    text-align: center;
    padding: 48px 24px;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-radius: 12px;
    border: 2px dashed #cbd5e1;
    margin: 16px 0;

    .placeholder-icon {
      font-size: 72px;
      margin-bottom: 24px;
      background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      opacity: 0.7;
    }

    .placeholder-title {
      font-size: 20px;
      font-weight: 600;
      color: #475569;
      margin-bottom: 16px;
      line-height: 1.4;
    }

    .placeholder-description {
      color: #64748b;
      font-size: 14px;
      line-height: 1.6;
      max-width: 400px;
      margin: 0 auto 24px;
    }

    .placeholder-features {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 450px;
      margin: 0 auto;

      .feature-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: white;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
        transition: all 0.2s ease;

        &:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          transform: translateX(4px);
        }

        .feature-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
        }

        .feature-text {
          color: #475569;
          font-size: 13px;
          font-weight: 500;
        }
      }
    }
  }

  .monitoring-status {
    text-align: center;
    padding: 24px;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 12px;
    border: 1px solid #bae6fd;
    margin: 16px 0;

    .monitoring-icon {
      font-size: 48px;
      color: #0ea5e9;
      margin-bottom: 16px;
    }

    .monitoring-text {
      color: #0c4a6e;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
    }

    .monitoring-details {
      color: #0369a1;
      font-size: 14px;
      line-height: 1.5;
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
          </Space>
        }
      >
        <div className="placeholder-content">
          <div className="placeholder-icon">
            <InfoCircleOutlined />
          </div>
          <div className="placeholder-title">
            {t('treatment.placeholderTitle')}
          </div>
          <div className="placeholder-description">
            {t('treatment.placeholderDescription')}
          </div>
          <div className="placeholder-features">
            <div className="feature-item">
              <div className="feature-text">
                {t('treatment.placeholderFeature1')}
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-text">
                {t('treatment.placeholderFeature2')}
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-text">
                {t('treatment.placeholderFeature3')}
              </div>
            </div>
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
        <div className="monitoring-status">
          <div className="monitoring-icon">
            <ClockCircleOutlined />
          </div>
          <div className="monitoring-text">
            Đang theo dõi tự động:{" "}
            {medicines.filter((m) => m.thuocId > 0).length} thuốc
            {patientMedicalHistory && patientMedicalHistory.length > 0 && (
              <>, medical_history: {patientMedicalHistory.length} bệnh lý</>
            )}
            {patientAllergies && patientAllergies.length > 0 && (
              <>, allergies: {patientAllergies.length} dị ứng</>
            )}
          </div>
          <div className="monitoring-details">
            Phân tích tự động sẽ được thực hiện khi chọn thuốc từ form đơn thuốc
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
