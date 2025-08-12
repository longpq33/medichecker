/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Card, Tag, Alert } from 'antd';
import { PlusOutlined, DeleteOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { useLanguage } from '@/hooks/useLanguage';
import { AddDiUngModal } from './AddDiUngModal';
import dayjs from 'dayjs';

interface DiUngTabProps {
  patient: {
    id: number;
  };
  diUngList: any[];
  isLoadingDiUng: boolean;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  showModal: () => void;
  createDiUng: (data: any) => Promise<any>;
  getDiUngByBenhNhan: (id: number) => void;
  refetchPatient: () => void;
  showDeleteModal: (diUng: any) => void;
}

export const DiUngTab: React.FC<DiUngTabProps> = ({
  patient,
  diUngList,
  isLoadingDiUng,
  modalVisible,
  setModalVisible,
  showModal,
  createDiUng,
  getDiUngByBenhNhan,
  refetchPatient,
  showDeleteModal,
}) => {
  const { t } = useLanguage();

  const handleModalOk = async (data: any) => {
    try {
      const fullData = {
        benhNhanId: patient.id,
        ...data,
      };

      const success = await createDiUng(fullData);

      if (success) {
        getDiUngByBenhNhan(patient.id);
        refetchPatient();
        setModalVisible(false);
      }
      return success;
    } catch (error) {
      console.error("Error saving di ung:", error);
      return false;
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const getMucDoColor = (mucDo?: string) => {
    switch (mucDo) {
      case "NHE":
        return "green";
      case "VUA":
        return "orange";
      case "NANG":
        return "red";
      case "RAT_NANG":
        return "volcano";
      default:
        return "default";
    }
  };

  const getMucDoText = (mucDo?: string) => {
    switch (mucDo) {
      case "NHE":
        return "Nhẹ";
      case "VUA":
        return "Vừa";
      case "NANG":
        return "Nặng";
      case "RAT_NANG":
        return "Rất nặng";
      default:
        return mucDo || "---";
    }
  };

  return (
    <>
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
            showModal();
          }}
        >
          {t("diUng.addDiUng")}
        </Button>
      </div>

      {isLoadingDiUng ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          {t("diUng.loading")}
        </div>
      ) : diUngList && diUngList.length > 0 ? (
        <div>
          {diUngList.map((diUng) => (
            <Card
              key={diUng.id}
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
                  {/* Tên thuốc và mã thuốc */}
                  <div style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        marginBottom: "8px",
                        color: "#374151",
                      }}
                    >
                      <MedicineBoxOutlined style={{ marginRight: "8px" }} />
                      {diUng.thuoc.tenThuoc} ({diUng.thuoc.maThuoc})
                    </div>
                    <div style={{ color: "#6b7280", fontSize: "14px" }}>
                      {diUng.thuoc.hangSanXuat} - {diUng.thuoc.nuocSanXuat}
                    </div>
                  </div>

                  {/* Triệu chứng */}
                  {diUng.trieuChung && (
                    <div style={{ marginBottom: "16px" }}>
                      <div
                        style={{
                          fontWeight: "bold",
                          marginBottom: "8px",
                          color: "#374151",
                        }}
                      >
                        {t("diUng.trieuChung")}:
                      </div>
                      <div style={{ color: "#6b7280" }}>
                        {diUng.trieuChung}
                      </div>
                    </div>
                  )}

                  {/* Mức độ nghiêm trọng */}
                  <div style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "8px",
                        color: "#374151",
                      }}
                    >
                      {t("diUng.mucDoNghiemTrong")}:
                    </div>
                    <Tag color={getMucDoColor(diUng.mucDoNghiemTrong)}>
                      {getMucDoText(diUng.mucDoNghiemTrong)}
                    </Tag>
                  </div>

                  {/* Ngày xuất hiện */}
                  {diUng.ngayXuatHien && (
                    <div style={{ marginBottom: "16px" }}>
                      <div
                        style={{
                          fontWeight: "bold",
                          marginBottom: "8px",
                          color: "#374151",
                        }}
                      >
                        {t("diUng.ngayXuatHien")}:
                      </div>
                      <div style={{ color: "#6b7280" }}>
                        {dayjs(diUng.ngayXuatHien).format("DD/MM/YYYY")}
                      </div>
                    </div>
                  )}

                  {/* Ghi chú */}
                  {diUng.ghiChu && (
                    <div style={{ marginBottom: "16px" }}>
                      <div
                        style={{
                          fontWeight: "bold",
                          marginBottom: "8px",
                          color: "#374151",
                        }}
                      >
                        {t("diUng.ghiChu")}:
                      </div>
                      <div style={{ color: "#6b7280" }}>
                        {diUng.ghiChu}
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
                    onClick={() => showDeleteModal(diUng)}
                    title={t("common.delete")}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Alert
          message={t("diUng.noData")}
          description={t("diUng.noData")}
          type="info"
          showIcon
        />
      )}

            {/* Modal dị ứng thuốc */}
      <AddDiUngModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
      />
    </>
  );
};
