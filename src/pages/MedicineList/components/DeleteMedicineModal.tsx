import React from 'react'
import { Modal, Typography, Space, Tag } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'
import type { ThuocResponse } from '@/types'

const { Text, Title } = Typography

interface DeleteMedicineModalProps {
  visible: boolean
  medicine: ThuocResponse | null
  onCancel: () => void
  onConfirm: () => void
  loading?: boolean
}

export const DeleteMedicineModal: React.FC<DeleteMedicineModalProps> = ({
  visible,
  medicine,
  onCancel,
  onConfirm,
  loading = false
}) => {
  const { t } = useLanguage()

  const getNhomThuocText = (nhomThuoc?: string) => {
    switch (nhomThuoc) {
      case 'KHANG_SINH':
        return t('medicine.groups.antibiotic')
      case 'GIAM_DAU':
        return t('medicine.groups.painkiller')
      case 'CHONG_VIEM':
        return t('medicine.groups.antiInflammatory')
      case 'TIM_MACH':
        return t('medicine.groups.cardiovascular')
      case 'TIEU_HOA':
        return t('medicine.groups.digestive')
      case 'HOI_SUC':
        return t('medicine.groups.respiratory')
      case 'KHAC':
        return t('medicine.groups.other')
      default:
        return t('medicine.noData')
    }
  }

  const getNhomThuocColor = (nhomThuoc?: string) => {
    switch (nhomThuoc) {
      case 'KHANG_SINH':
        return 'red'
      case 'GIAM_DAU':
        return 'orange'
      case 'CHONG_VIEM':
        return 'blue'
      case 'TIM_MACH':
        return 'purple'
      case 'TIEU_HOA':
        return 'green'
      case 'HOI_SUC':
        return 'cyan'
      case 'KHAC':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <Modal
      title={
        <Space>
          <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
          {t('medicine.confirmDelete')}
        </Space>
      }
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={t('common.delete')}
      cancelText={t('common.cancel')}
      okType="danger"
      confirmLoading={loading}
      width={500}
    >
      {medicine && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Text>{t('medicine.deleteConfirm')}</Text>
          </div>
          
          <div style={{ 
            marginTop: '16px', 
            padding: '16px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px',
            border: '1px solid #d9d9d9'
          }}>
            <Title level={5} style={{ marginBottom: '12px', color: '#262626' }}>
              {t('medicine.medicineInfo')}
            </Title>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>{t('medicine.drugCode')}:</Text>
                <Text>{medicine.maThuoc}</Text>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>{t('medicine.drugName')}:</Text>
                <Text>{medicine.tenThuoc}</Text>
              </div>
              
              {medicine.tenHoatChat && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>{t('medicine.activeIngredientName')}:</Text>
                  <Text>{medicine.tenHoatChat}</Text>
                </div>
              )}
              
              {medicine.nongDo && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>{t('medicine.concentrationValue')}:</Text>
                  <Text>{medicine.nongDo}</Text>
                </div>
              )}
              
              {medicine.dangBaoChe && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>{t('medicine.dosageFormType')}:</Text>
                  <Text>{medicine.dangBaoChe}</Text>
                </div>
              )}
              
              {medicine.hangSanXuat && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>{t('medicine.manufacturerName')}:</Text>
                  <Text>{medicine.hangSanXuat}</Text>
                </div>
              )}
              
              {medicine.giaBan && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>{t('medicine.priceValue')}:</Text>
                  <Text>{medicine.giaBan.toLocaleString()} VNĐ</Text>
                </div>
              )}
              
              {medicine.nhomThuoc && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text strong>{t('medicine.drugGroupType')}:</Text>
                  <Tag color={getNhomThuocColor(medicine.nhomThuoc)}>
                    {getNhomThuocText(medicine.nhomThuoc)}
                  </Tag>
                </div>
              )}
            </div>
          </div>
          
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            backgroundColor: '#fff2e8', 
            borderRadius: '6px',
            border: '1px solid #ffd591'
          }}>
            <Text style={{ color: '#d46b08', fontWeight: 'bold' }}>
              ⚠️ {t('medicine.deleteWarning')}
            </Text>
          </div>
        </div>
      )}
    </Modal>
  )
} 