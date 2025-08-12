import React from 'react';
import { Card, Table, Tag, Button, Space, Typography, Popconfirm } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useLanguage } from '@/hooks/useLanguage';
import styled from 'styled-components';

const { Text } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  border-radius: 12px;
  
  .ant-card-head {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-bottom: 1px solid #e2e8f0;
    
    .ant-card-head-title {
      color: #1e293b;
      font-weight: 600;
    }
  }
`;

const MedicineTag = styled(Tag)`
  margin: 2px;
  border-radius: 6px;
  font-size: 12px;
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
  huongDanSuDung?: string;
  giaDonVi: number;
  thanhTien: number;
}

interface MedicineListProps {
  medicines: Medicine[];
  onRemove: (medicineId: string) => void;
}

export const MedicineList: React.FC<MedicineListProps> = ({
  medicines,
  onRemove
}) => {
  const { t } = useLanguage();

  const getRouteColor = (route: string) => {
    const colorMap: { [key: string]: string } = {
      'uống': 'blue',
      'tiêm': 'red',
      'bôi': 'green',
      'nhỏ mắt': 'cyan',
      'nhỏ mũi': 'purple',
      'xịt': 'orange'
    };
    return colorMap[route] || 'default';
  };

  const getFrequencyColor = (frequency: string) => {
    if (frequency.includes('ngày')) return 'green';
    if (frequency.includes('tuần')) return 'blue';
    if (frequency.includes('tháng')) return 'orange';
    if (frequency.includes('năm')) return 'red';
    return 'default';
  };

  const columns = [
    {
      title: t('treatment.medicine'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Text strong style={{ fontSize: 14 }}>
          {text}
        </Text>
      ),
    },
    {
      title: t('treatment.quantity'),
      dataIndex: 'soLuong',
      key: 'soLuong',
      width: 80,
      render: (value: number) => (
        <Text>{value}</Text>
      ),
    },
    {
      title: t('treatment.dosage'),
      dataIndex: 'lieuDung',
      key: 'lieuDung',
      width: 100,
      render: (text: string) => (
        <Text style={{ fontSize: 12 }}>{text}</Text>
      ),
    },
    {
      title: t('treatment.route'),
      dataIndex: 'duongDung',
      key: 'duongDung',
      width: 80,
      render: (text: string) => (
        <MedicineTag color={getRouteColor(text)}>
          {text}
        </MedicineTag>
      ),
    },
    {
      title: t('treatment.frequency'),
      dataIndex: 'tanSuat',
      key: 'tanSuat',
      width: 100,
      render: (text: string) => (
        <MedicineTag color={getFrequencyColor(text)}>
          {text}
        </MedicineTag>
      ),
    },
    {
      title: t('treatment.duration'),
      dataIndex: 'thoiGianDung',
      key: 'thoiGianDung',
      width: 80,
      render: (text: string) => (
        <Text style={{ fontSize: 12 }}>{text}</Text>
      ),
    },
    {
      title: t('treatment.unitPrice'),
      dataIndex: 'giaDonVi',
      key: 'giaDonVi',
      width: 100,
      render: (value: number) => (
        <Text style={{ color: '#1890ff', fontWeight: 500 }}>
          {value.toLocaleString('vi-VN')} ₫
        </Text>
      ),
    },
    {
      title: t('treatment.totalAmount'),
      dataIndex: 'thanhTien',
      key: 'thanhTien',
      width: 120,
      render: (value: number) => (
        <Text strong style={{ color: '#52c41a' }}>
          {value.toLocaleString('vi-VN')} ₫
        </Text>
      ),
    },
    {
      title: t('common.actions'),
      key: 'actions',
      width: 120,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Medicine) => (
        <Space size="small">
          <Popconfirm
            title={t('treatment.confirmDeleteMedicine')}
            description={t('treatment.deleteMedicineWarning')}
            onConfirm={() => onRemove(record.id)}
            okText={t('common.yes')}
            cancelText={t('common.no')}
          >
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              title={t('common.delete')}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const totalAmount = medicines.reduce((sum, medicine) => sum + medicine.thanhTien, 0);
  const totalQuantity = medicines.reduce((sum, medicine) => sum + medicine.soLuong, 0);

  if (medicines.length === 0) {
    return (
      <StyledCard
        title={
          <Space>
            <EyeOutlined style={{ color: '#1890ff' }} />
            {t('treatment.medicineList')}
          </Space>
        }
      >
        <div style={{ textAlign: 'center', padding: '32px 16px', color: '#8c8c8c' }}>
          <Text type="secondary">
            {t('treatment.noMedicinesAdded')}
          </Text>
        </div>
      </StyledCard>
    );
  }

  return (
    <StyledCard
      title={
        <Space>
          <EyeOutlined style={{ color: '#1890ff' }} />
          {t('treatment.medicineList')}
          <Tag color="blue" style={{ marginLeft: 8 }}>
            {medicines.length} {t('treatment.medicines')}
          </Tag>
        </Space>
      }
    >
      {/* Summary Stats */}
      <div style={{ 
        display: 'flex', 
        gap: 24, 
        marginBottom: 16, 
        padding: '16px',
        background: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {t('treatment.totalQuantity')}
          </Text>
          <div>
            <Text strong style={{ fontSize: 18, color: '#1890ff' }}>
              {totalQuantity}
            </Text>
          </div>
        </div>
        <div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {t('treatment.totalAmount')}
          </Text>
          <div>
            <Text strong style={{ fontSize: 18, color: '#52c41a' }}>
              {totalAmount.toLocaleString('vi-VN')} ₫
            </Text>
          </div>
        </div>
      </div>

      {/* Medicine Table */}
      <Table
        columns={columns}
        dataSource={medicines}
        rowKey="id"
        pagination={false}
        size="small"
        scroll={{ x: 1000 }}
        style={{ marginTop: 16 }}
      />
    </StyledCard>
  );
};
