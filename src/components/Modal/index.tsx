import React from 'react'
import { Modal as AntModal } from 'antd'
import type { ModalProps } from 'antd'

interface CommonModalProps extends Omit<ModalProps, 'open'> {
  visible: boolean
  title: string
  onCancel: () => void
  onOk: () => void
  children: React.ReactNode
  width?: number
  loading?: boolean
}

export const Modal: React.FC<CommonModalProps> = ({
  visible,
  title,
  onCancel,
  onOk,
  children,
  width = 600,
  loading = false,
  ...props
}) => {
  return (
    <AntModal
      title={title}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={width}
      style={{ top: 20 }}
      bodyStyle={{ 
        maxHeight: '70vh', 
        overflowY: 'auto',
        paddingRight: '8px'
      }}
      confirmLoading={loading}
      {...props}
    >
      {children}
    </AntModal>
  )
} 