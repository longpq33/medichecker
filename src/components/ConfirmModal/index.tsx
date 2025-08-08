import React from 'react'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

interface ConfirmModalProps {
  visible: boolean
  title?: string
  content: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title = 'Xác nhận',
  content,
  onConfirm,
  onCancel,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  loading = false
}) => {
  return (
    <Modal
      title={
        <div>
          <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
          {title}
        </div>
      }
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={confirmText}
      cancelText={cancelText}
      confirmLoading={loading}
      okButtonProps={{ danger: true }}
    >
      <p>{content}</p>
    </Modal>
  )
} 