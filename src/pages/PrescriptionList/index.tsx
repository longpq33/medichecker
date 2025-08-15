import React, { useState, useEffect } from "react";
import { Modal, Form, message, Input, Select, Tag, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useLanguage } from "@/hooks/useLanguage";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { PageHeader, DataTable, ConfirmModal } from "@/components";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import type { DonThuocResponse } from "@/types";

const { Option } = Select;

// Mock data cho development
const mockPrescriptions: DonThuocResponse[] = [
  {
    id: 1,
    maDonThuoc: "DT001",
    benhNhan: {
      id: 1,
      maBenhNhan: "BN001",
      hoTen: "Nguyễn Văn An",
      ngaySinh: "1990-05-15",
      gioiTinh: "NAM",
      soDienThoai: "0123456789",
      email: "nguyenvanan@email.com",
      diaChi: "123 Đường ABC, Quận 1, TP.HCM",
      soBaoHiem: "BH001234567",
      ngayTao: "2024-01-15T10:00:00",
      ngayCapNhat: "2024-01-15T10:00:00",
    },
    bacSiKeDon: "BS. Trần Thị Bình",
    ghiChu: "Uống sau ăn, theo dõi huyết áp",
    trangThai: "DA_DUYET",
    ngayKeDon: "2024-01-20T10:30:00",
    danhSachThuoc: [
      {
        id: 1,
        thuoc: {
          id: 1,
          maThuoc: "TH001",
          tenThuoc: "Paracetamol 500mg",
          tenHoatChat: "Paracetamol",
          nongDo: "500mg",
          dangBaoChe: "Viên nén",
          hangSanXuat: "Công ty Dược phẩm A",
          nuocSanXuat: "Việt Nam",
          giaBan: 5000,
          donViTinh: "Viên",
          chiDinh: "Giảm đau, hạ sốt",
          chongChiDinh: "Dị ứng với Paracetamol",
          nhomThuoc: "GIAM_DAU",
          kichHoat: true,
          ngayTao: "2024-01-15T10:00:00",
        },
        soLuong: 30,
        lieuDung: "1 viên/lần",
        duongDung: "Uống",
        tanSuat: "3 lần/ngày",
        thoiGianDung: "7 ngày",
        huongDanSuDung: "Uống sau ăn",
        giaDonVi: 5000,
        thanhTien: 150000,
      },
    ],
  },
  {
    id: 2,
    maDonThuoc: "DT002",
    benhNhan: {
      id: 2,
      maBenhNhan: "BN002",
      hoTen: "Trần Thị Bình",
      ngaySinh: "1985-08-22",
      gioiTinh: "NU",
      soDienThoai: "0987654321",
      email: "tranthibinh@email.com",
      diaChi: "456 Đường XYZ, Quận 2, TP.HCM",
      soBaoHiem: "BH098765432",
      ngayTao: "2024-01-16T14:30:00",
      ngayCapNhat: "2024-01-16T14:30:00",
    },
    bacSiKeDon: "BS. Lê Văn Cường",
    ghiChu: "Uống trước ăn 30 phút",
    trangThai: "MOI_TAO",
    ngayKeDon: "2024-01-21T14:30:00",
    danhSachThuoc: [
      {
        id: 2,
        thuoc: {
          id: 2,
          maThuoc: "TH002",
          tenThuoc: "Amoxicillin 250mg",
          tenHoatChat: "Amoxicillin",
          nongDo: "250mg",
          dangBaoChe: "Viên nang",
          hangSanXuat: "Công ty Dược phẩm B",
          nuocSanXuat: "Việt Nam",
          giaBan: 15000,
          donViTinh: "Viên",
          chiDinh: "Điều trị nhiễm khuẩn",
          chongChiDinh: "Dị ứng với Penicillin",
          nhomThuoc: "KHANG_SINH",
          kichHoat: true,
          ngayTao: "2024-01-16T14:30:00",
        },
        soLuong: 20,
        lieuDung: "1 viên/lần",
        duongDung: "Uống",
        tanSuat: "2 lần/ngày",
        thoiGianDung: "10 ngày",
        huongDanSuDung: "Uống trước ăn",
        giaDonVi: 15000,
        thanhTien: 300000,
      },
    ],
  },
  {
    id: 3,
    maDonThuoc: "DT003",
    benhNhan: {
      id: 3,
      maBenhNhan: "BN003",
      hoTen: "Lê Văn Cường",
      ngaySinh: "1978-12-10",
      gioiTinh: "NAM",
      soDienThoai: "0555666777",
      email: "levancuong@email.com",
      diaChi: "789 Đường DEF, Quận 3, TP.HCM",
      soBaoHiem: "BH055566677",
      ngayTao: "2024-01-17T09:15:00",
      ngayCapNhat: "2024-01-17T09:15:00",
    },
    bacSiKeDon: "BS. Phạm Thị Dung",
    ghiChu: "Theo dõi huyết áp hàng ngày",
    trangThai: "DANG_THUC_HIEN",
    ngayKeDon: "2024-01-22T09:15:00",
    danhSachThuoc: [
      {
        id: 3,
        thuoc: {
          id: 5,
          maThuoc: "TH005",
          tenThuoc: "Amlodipine 5mg",
          tenHoatChat: "Amlodipine",
          nongDo: "5mg",
          dangBaoChe: "Viên nén",
          hangSanXuat: "Công ty Dược phẩm C",
          nuocSanXuat: "Việt Nam",
          giaBan: 25000,
          donViTinh: "Viên",
          chiDinh: "Điều trị tăng huyết áp",
          chongChiDinh: "Dị ứng với Amlodipine",
          nhomThuoc: "TIM_MACH",
          kichHoat: true,
          ngayTao: "2024-01-17T09:15:00",
        },
        soLuong: 30,
        lieuDung: "1 viên/lần",
        duongDung: "Uống",
        tanSuat: "1 lần/ngày",
        thoiGianDung: "30 ngày",
        huongDanSuDung: "Uống vào buổi sáng",
        giaDonVi: 25000,
        thanhTien: 750000,
      },
    ],
  },
];

export const PrescriptionList: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState<DonThuocResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPrescription, setEditingPrescription] =
    useState<DonThuocResponse | null>(null);
  const [form] = Form.useForm();

  // Delete modal state
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deletingPrescription, setDeletingPrescription] =
    useState<DonThuocResponse | null>(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async (page: number = 1, size: number = 10) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const filteredData = mockPrescriptions.filter(
        (prescription) =>
          prescription.maDonThuoc
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          prescription.benhNhan.hoTen
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          prescription.bacSiKeDon
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );

      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      setPrescriptions(paginatedData);
      setTotal(filteredData.length);
      setCurrentPage(page);
      setPageSize(size);
    } catch {
      message.error(t("common.errorLoading"));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "MOI_TAO":
        return "blue";
      case "DA_DUYET":
        return "green";
      case "DANG_THUC_HIEN":
        return "orange";
      case "HOAN_THANH":
        return "purple";
      case "HUY_BO":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "MOI_TAO":
        return "Mới tạo";
      case "DA_DUYET":
        return "Đã duyệt";
      case "DANG_THUC_HIEN":
        return "Đang thực hiện";
      case "HOAN_THANH":
        return "Hoàn thành";
      case "HUY_BO":
        return "Hủy bỏ";
      default:
        return status;
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    fetchPrescriptions(1, pageSize);
  };

  const handleAdd = () => {
    setEditingPrescription(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (prescription: DonThuocResponse) => {
    setEditingPrescription(prescription);
    form.setFieldsValue({
      benhNhanId: prescription.benhNhan.id,
      bacSiKeDon: prescription.bacSiKeDon,
      ghiChu: prescription.ghiChu,
    });
    setIsModalVisible(true);
  };

  const handleView = (prescription: DonThuocResponse) => {
    navigate(`/prescriptions/${prescription.id}`);
  };

  const handleDelete = (id: number) => {
    const prescriptionToDelete = prescriptions.find((p) => p.id === id);
    if (prescriptionToDelete) {
      setDeletingPrescription(prescriptionToDelete);
      setIsDeleteModalVisible(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPrescription) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPrescriptions((prev) =>
        prev.filter((p) => p.id !== deletingPrescription.id)
      );
      setTotal((prev) => prev - 1);
      message.success("Xóa đơn thuốc thành công");
      setIsDeleteModalVisible(false);
      setDeletingPrescription(null);
    } catch {
      message.error(t("common.errorDeleting"));
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setDeletingPrescription(null);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingPrescription) {
        // Update existing prescription
        const updatedPrescription = {
          ...editingPrescription,
          benhNhan:
            mockPrescriptions.find((p) => p.benhNhan.id === values.benhNhanId)
              ?.benhNhan || editingPrescription.benhNhan,
          bacSiKeDon: values.bacSiKeDon,
          ghiChu: values.ghiChu,
        };

        setPrescriptions((prev) =>
          prev.map((p) =>
            p.id === editingPrescription.id ? updatedPrescription : p
          )
        );
        message.success("Cập nhật đơn thuốc thành công");
      } else {
        // Add new prescription
        const newPrescription: DonThuocResponse = {
          id: Date.now(),
          maDonThuoc: `DT${Date.now()}`,
          benhNhan:
            mockPrescriptions.find((p) => p.benhNhan.id === values.benhNhanId)
              ?.benhNhan || mockPrescriptions[0].benhNhan,
          bacSiKeDon: values.bacSiKeDon,
          ghiChu: values.ghiChu,
          trangThai: "MOI_TAO",
          ngayKeDon: new Date().toISOString(),
          danhSachThuoc: [],
        };

        setPrescriptions((prev) => [newPrescription, ...prev]);
        setTotal((prev) => prev + 1);
        message.success("Thêm đơn thuốc thành công");
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch {
      message.error(t("common.errorSaving"));
    }
  };

  const handlePageChange = (page: number, size?: number) => {
    fetchPrescriptions(page, size || pageSize);
  };

  const columns = [
    {
      title: t("prescription.prescriptionCode"),
      dataIndex: "maDonThuoc",
      key: "maDonThuoc",
      width: 120,
    },
    {
      title: t("prescription.patientName"),
      dataIndex: ["benhNhan", "hoTen"],
      key: "benhNhan",
      width: 150,
    },
    {
      title: t("prescription.doctorName"),
      dataIndex: "bacSiKeDon",
      key: "bacSiKeDon",
      width: 150,
    },
    {
      title: t("common.status"),
      dataIndex: "trangThai",
      key: "trangThai",
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: t("prescription.prescriptionDate"),
      dataIndex: "ngayKeDon",
      key: "ngayKeDon",
      width: 120,
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: t("prescription.medicineCount"),
      dataIndex: "danhSachThuoc",
      key: "soThuoc",
      width: 100,
      render: (danhSachThuoc: DonThuocResponse["danhSachThuoc"]) =>
        danhSachThuoc?.length || 0,
    },
  ];

  const actions = [
    {
      key: "view",
      icon: <EyeOutlined />,
      color: "#1890ff",
      onClick: (record: DonThuocResponse) => handleView(record),
    },
    {
      key: "edit",
      icon: <EditOutlined />,
      color: "#52c41a",
      onClick: (record: DonThuocResponse) => handleEdit(record),
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      color: "#ff4d4f",
      onClick: (record: DonThuocResponse) => handleDelete(record.id),
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: t("prescription.prescriptionManagement"),
            path: "/prescriptions",
          },
        ]}
      />
      <PageHeader
        title={t("prescription.prescriptionManagement")}
        onAdd={handleAdd}
        onSearch={handleSearch}
        addButtonText={t("prescription.addPrescription")}
        searchPlaceholder={t("prescription.searchPrescription")}
      />

      <DataTable<DonThuocResponse>
        dataSource={prescriptions}
        loading={loading}
        columns={columns}
        actions={actions}
        scroll={{ x: 1200 }}
      />

      <div style={{ textAlign: "right", marginTop: 16 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showSizeChanger
          showQuickJumper
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} ${t("common.of")} ${total} ${t(
              "prescription.prescriptions"
            )}`
          }
        />
      </div>

      {/* Modal thêm/sửa đơn thuốc */}
      <Modal
        title={
          editingPrescription
            ? t("prescription.editPrescription")
            : t("prescription.addPrescription")
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
        okText={t("common.save")}
        cancelText={t("common.cancel")}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="benhNhanId"
            label={t("prescription.patientName")}
            rules={[
              {
                required: true,
                message:
                  t("prescription.patientName") + " " + t("common.required"),
              },
            ]}
          >
            <Select placeholder={t("prescription.selectPatient")}>
              {mockPrescriptions.map((prescription) => (
                <Option
                  key={prescription.benhNhan.id}
                  value={prescription.benhNhan.id}
                >
                  {prescription.benhNhan.hoTen} -{" "}
                  {prescription.benhNhan.maBenhNhan}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="bacSiKeDon"
            label={t("prescription.doctorName")}
            rules={[
              {
                required: true,
                message:
                  t("prescription.doctorName") + " " + t("common.required"),
              },
            ]}
          >
            <Input placeholder={t("prescription.enterDoctorName")} />
          </Form.Item>

          <Form.Item name="ghiChu" label={t("prescription.prescriptionNotes")}>
            <Input.TextArea
              rows={3}
              placeholder={t("prescription.enterNotes")}
            />
          </Form.Item>
        </Form>
      </Modal>

      <ConfirmModal
        visible={isDeleteModalVisible}
        title={t("prescription.confirmDelete")}
        content={`${t("prescription.deleteConfirm")} "${
          deletingPrescription?.maDonThuoc
        }"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText={t("common.delete")}
        cancelText={t("common.cancel")}
      />
    </div>
  );
};
