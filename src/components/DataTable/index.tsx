import React from 'react'
import { Table, Button, Space, Tag } from 'antd'
import type { TableProps } from 'antd'
import type { ColumnType } from 'antd/es/table'
import { useLanguage } from '@/hooks/useLanguage'

interface ActionButton<T = unknown> {
  key: string
  icon: React.ReactNode
  color: string
  onClick: (record: T) => void
}

interface DataTableProps<T = unknown> extends Omit<TableProps<T>, 'columns'> {
  dataSource: T[]
  loading?: boolean
  columns?: ColumnType<T>[]
  actions?: ActionButton<T>[]
  getStatusText?: (status?: string) => string
  getStatusColor?: (status?: string) => string
  statusField?: string
  statusRender?: (status?: string) => React.ReactNode
}

export const DataTable = <T,>({
  dataSource,
  loading = false,
  columns = [],
  actions = [],
  getStatusText,
  getStatusColor,
  statusField,
  statusRender,
  ...tableProps
}: DataTableProps<T>) => {
  const { t } = useLanguage()

  // Thêm cột status nếu có
  const statusColumn = statusField && (getStatusText || getStatusColor) ? {
    title: t('common.status'),
    dataIndex: statusField,
    key: statusField,
    width: 120,
    render: (status?: string) => {
      if (statusRender) {
        return statusRender(status)
      }
      if (getStatusText && getStatusColor) {
        return (
          <Tag color={getStatusColor(status)}>
            {getStatusText(status)}
          </Tag>
        )
      }
      return status
    },
  } : null

  // Thêm cột actions nếu có
  const actionsColumn = actions.length > 0 ? {
    title: t('common.actions'),
    key: 'actions',
    width: 140,
    fixed: 'right' as const,
    render: (_: unknown, record: T) => (
      <Space size="small">
        {actions.map((action) => (
          <Button
            key={action.key}
            type="text"
            icon={action.icon}
            size="small"
            onClick={() => action.onClick(record)}
            style={{ color: action.color }}
          />
        ))}
      </Space>
    ),
  } : null

  const finalColumns = [
    ...columns,
    ...(statusColumn ? [statusColumn] : []),
    ...(actionsColumn ? [actionsColumn] : []),
  ]

  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <Table
        {...tableProps}
        columns={finalColumns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        size="middle"
      />
    </div>
  )
} 