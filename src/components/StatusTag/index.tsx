import React from 'react'
import { Tag } from 'antd'

interface StatusTagProps {
  status?: string
  statusMap?: Record<string, { text: string; color: string }>
  getStatusText?: (status?: string) => string
  getStatusColor?: (status?: string) => string
  defaultColor?: string
}

export const StatusTag: React.FC<StatusTagProps> = ({
  status,
  statusMap,
  getStatusText,
  getStatusColor,
  defaultColor = 'default'
}) => {
  let text = status || ''
  let color = defaultColor

  if (statusMap && status) {
    const statusConfig = statusMap[status]
    if (statusConfig) {
      text = statusConfig.text
      color = statusConfig.color
    }
  } else if (getStatusText && getStatusColor) {
    text = getStatusText(status)
    color = getStatusColor(status)
  }

  return (
    <Tag color={color}>
      {text}
    </Tag>
  )
} 