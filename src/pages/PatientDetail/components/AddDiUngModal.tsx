import React from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { useLanguage } from '@/hooks/useLanguage';
import { useMedicines } from '@/hooks/useMedicines';

interface AddDiUngModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (data: any) => Promise<boolean>;
}

export const AddDiUngModal: React.FC<AddDiUngModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const { t } = useLanguage();
  const [form] = Form.useForm();
  const { medicinesData } = useMedicines({ page: 0, size: 1000 });

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        thuocId: values.thuocId,
        trieuChung: values.trieuChung,
        mucDoNghiemTrong: values.mucDoNghiemTrong,
        ngayXuatHien: values.ngayXuatHien?.toISOString(),
        ghiChu: values.ghiChu,
      };

      const success = await onOk(data);
      if (success) {
        form.resetFields();
      }
    } catch (error) {
      console.error("Error saving di ung:", error);
    }
  };

  const handleModalCancel = () => {
    onCancel();
    form.resetFields();
  };

  // Set form values when modal opens
  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        mucDoNghiemTrong: "NHE",
      });
    }
  }, [visible, form]);

  return (
    <Modal
      title={t("diUng.addDiUng")}
      open={visible}
      onCancel={handleModalCancel}
      onOk={handleModalOk}
      width={600}
              okText={t("common.add")}
      cancelText={t("common.cancel")}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          mucDoNghiemTrong: "NHE",
        }}
      >
        {/* Dropdown chọn thuốc */}
        <Form.Item
          name="thuocId"
          label={t("diUng.thuoc")}
          rules={[{ required: true, message: t("validation.required", { field: t("diUng.thuoc") }) }]}
        >
          <Select
            placeholder={t("diUng.selectThuoc")}
            showSearch
            filterOption={(input, option) =>
              option?.label?.toString().toLowerCase().includes(input.toLowerCase()) || false
            }
            notFoundContent={t("diUng.noMedicineFound")}
          >
            {medicinesData?.content?.map((medicine) => (
              <Select.Option key={medicine.id} value={medicine.id} label={medicine.tenThuoc}>
                {medicine.tenThuoc} ({medicine.maThuoc})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Input triệu chứng */}
        <Form.Item
          name="trieuChung"
          label={t("diUng.trieuChung")}
          rules={[{ required: true, message: t("validation.required", { field: t("diUng.trieuChung") }) }]}
        >
          <Input.TextArea 
            rows={3} 
            placeholder={t("diUng.trieuChungPlaceholder")}
            maxLength={500}
            showCount
          />
        </Form.Item>

        {/* Dropdown mức độ nghiêm trọng */}
        <Form.Item
          name="mucDoNghiemTrong"
          label={t("diUng.mucDoNghiemTrong")}
          rules={[{ required: true, message: t("validation.required", { field: t("diUng.mucDoNghiemTrong") }) }]}
        >
          <Select placeholder={t("diUng.selectMucDo")}>
            <Select.Option value="NHE">{t("diUng.mucDoNghiemTrongOptions.NHE")}</Select.Option>
            <Select.Option value="VUA">{t("diUng.mucDoNghiemTrongOptions.VUA")}</Select.Option>
            <Select.Option value="NANG">{t("diUng.mucDoNghiemTrongOptions.NANG")}</Select.Option>
            <Select.Option value="RAT_NANG">{t("diUng.mucDoNghiemTrongOptions.RAT_NANG")}</Select.Option>
          </Select>
        </Form.Item>

        {/* Ngày xuất hiện */}
        <Form.Item
          name="ngayXuatHien"
          label={t("diUng.ngayXuatHien")}
        >
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            placeholder={t("diUng.ngayXuatHien")}
          />
        </Form.Item>

        {/* Ghi chú */}
        <Form.Item
          name="ghiChu"
          label={t("diUng.ghiChu")}
        >
          <Input.TextArea 
            rows={3} 
            placeholder={t("diUng.ghiChuPlaceholder")}
            maxLength={200}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
