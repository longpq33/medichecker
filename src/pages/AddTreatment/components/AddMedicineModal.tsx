import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Space, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useLanguage } from '@/hooks/useLanguage';
import { useMedicines } from '@/hooks/useMedicines';

const { Option } = Select;

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

interface AddMedicineModalProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: (medicine: Medicine) => void;
  medicinesData?: { content: Array<{ id: number; tenThuoc: string; giaBan?: number }> };
}

export const AddMedicineModal: React.FC<AddMedicineModalProps> = ({
  visible,
  onCancel,
  onAdd,
  medicinesData
}) => {
  const { t } = useLanguage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  // Fetch medicines data
  const { medicinesData: fetchedMedicines, isLoadingMedicines } = useMedicines({ page: 0, size: 1000 });
  const availableMedicines = medicinesData?.content || fetchedMedicines?.content || [];

  const duongDungOptions = [
    { value: 'uống', label: t('treatment.routes.oral') },
    { value: 'tiêm', label: t('treatment.routes.injection') },
    { value: 'bôi', label: t('treatment.routes.topical') },
    { value: 'nhỏ mắt', label: t('treatment.routes.eyeDrops') },
    { value: 'nhỏ mũi', label: t('treatment.routes.nasalDrops') },
    { value: 'xịt', label: t('treatment.routes.spray') },
  ];

  const tanSuatOptions = [
    { value: '1 lần/ngày', label: t('treatment.frequencies.onceDaily') },
    { value: '2 lần/ngày', label: t('treatment.frequencies.twiceDaily') },
    { value: '3 lần/ngày', label: t('treatment.frequencies.thriceDaily') },
    { value: '4 lần/ngày', label: t('treatment.frequencies.fourTimesDaily') },
    { value: '1 lần/tuần', label: t('treatment.frequencies.onceWeekly') },
    { value: '2 lần/tuần', label: t('treatment.frequencies.twiceWeekly') },
    { value: '1 lần/tháng', label: t('treatment.frequencies.onceMonthly') },
  ];

  const thoiGianDungOptions = [
    { value: '3 ngày', label: t('treatment.durations.threeDays') },
    { value: '5 ngày', label: t('treatment.durations.fiveDays') },
    { value: '7 ngày', label: t('treatment.durations.sevenDays') },
    { value: '10 ngày', label: t('treatment.durations.tenDays') },
    { value: '14 ngày', label: t('treatment.durations.fourteenDays') },
    { value: '21 ngày', label: t('treatment.durations.twentyOneDays') },
    { value: '30 ngày', label: t('treatment.durations.thirtyDays') },
    { value: '1 tháng', label: t('treatment.durations.oneMonth') },
    { value: '2 tháng', label: t('treatment.durations.twoMonths') },
    { value: '3 tháng', label: t('treatment.durations.threeMonths') },
    { value: '6 tháng', label: t('treatment.durations.sixMonths') },
    { value: '1 năm', label: t('treatment.durations.oneYear') },
  ];

  const handleMedicineSelect = (value: string) => {
    const medicine = availableMedicines.find(med => med.tenThuoc === value);
    if (medicine) {
      form.setFieldsValue({
        thuocId: medicine.id,
        giaDonVi: medicine.giaBan || 0
      });
      // Tính thanh tiền
      const soLuong = form.getFieldValue('soLuong') || 0;
      const thanhTien = (medicine.giaBan || 0) * soLuong;
      form.setFieldsValue({ thanhTien });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const giaDonVi = form.getFieldValue('giaDonVi') || 0;
    const thanhTien = giaDonVi * value;
    form.setFieldsValue({ thanhTien });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const newMedicine: Medicine = {
        id: `medicine-${Date.now()}`,
        thuocId: values.thuocId,
        name: values.medicineName,
        soLuong: values.soLuong,
        lieuDung: values.lieuDung,
        duongDung: values.duongDung,
        tanSuat: values.tanSuat,
        thoiGianDung: values.thoiGianDung,
        huongDanSuDung: values.huongDanSuDung || '',
        giaDonVi: values.giaDonVi || 0,
        thanhTien: values.thanhTien || 0,
      };

      onAdd(newMedicine);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible, form]);

  return (
    <Modal
      title={
        <Space>
          <PlusOutlined style={{ color: '#1890ff' }} />
          {t('treatment.addMedicine')}
        </Space>
      }
      open={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      width={800}
      okText={t('common.add')}
      cancelText={t('common.cancel')}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        style={{ marginTop: 16 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Cột trái */}
          <div>
            <Form.Item
              name="medicineName"
              label={t('treatment.medicine')}
              rules={[{ required: true, message: t('treatment.validation.selectMedicine') }]}
            >
              <Select
                placeholder={t('treatment.medicinePlaceholder')}
                size="large"
                onChange={handleMedicineSelect}
                showSearch
                loading={isLoadingMedicines}
                filterOption={(input, option) =>
                  (option?.children?.toString() || '').toLowerCase().includes(input.toLowerCase())
                }
              >
                {availableMedicines.map((medicine) => (
                  <Option key={medicine.id} value={medicine.tenThuoc}>
                    {medicine.tenThuoc}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="soLuong"
              label={t('treatment.quantity')}
              rules={[{ required: true, message: t('treatment.validation.enterQuantity') }]}
            >
              <Input
                placeholder={t('treatment.quantityPlaceholder')}
                size="large"
                type="number"
                min="1"
                onChange={handleQuantityChange}
              />
            </Form.Item>

            <Form.Item
              name="lieuDung"
              label={t('treatment.dosage')}
              rules={[{ required: true, message: t('treatment.validation.enterDosage') }]}
            >
              <Input
                placeholder={t('treatment.dosagePlaceholder')}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="duongDung"
              label={t('treatment.route')}
              rules={[{ required: true, message: t('treatment.validation.selectRoute') }]}
            >
              <Select
                placeholder={t('treatment.routePlaceholder')}
                size="large"
              >
                {duongDungOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Cột phải */}
          <div>
            <Form.Item
              name="tanSuat"
              label={t('treatment.frequency')}
              rules={[{ required: true, message: t('treatment.validation.selectFrequency') }]}
            >
              <Select
                placeholder={t('treatment.frequencyPlaceholder')}
                size="large"
              >
                {tanSuatOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="thoiGianDung"
              label={t('treatment.duration')}
              rules={[{ required: true, message: t('treatment.validation.selectDuration') }]}
            >
              <Select
                placeholder={t('treatment.durationPlaceholder')}
                size="large"
              >
                {thoiGianDungOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="huongDanSuDung"
              label={t('treatment.instructions')}
            >
              <Input
                placeholder={t('treatment.instructionsPlaceholder')}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="giaDonVi"
              label={t('treatment.unitPrice')}
            >
              <Input
                placeholder={t('treatment.unitPrice')}
                size="large"
                disabled
                prefix="₫"
              />
            </Form.Item>
          </div>
        </div>

        <Divider />

        {/* Thành tiền */}
        <Form.Item
          name="thanhTien"
          label={t('treatment.totalPrice')}
        >
          <Input
            placeholder="0"
            size="large"
            disabled
            prefix="₫"
          />
        </Form.Item>

        {/* Hidden fields */}
        <Form.Item name="thuocId" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
