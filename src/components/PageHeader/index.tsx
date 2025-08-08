import React from 'react'
import { Card, Row, Col, Button, Input, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Search } = Input

interface PageHeaderProps {
  title: string
  onAdd?: () => void
  onSearch?: (value: string) => void
  addButtonText?: string
  searchPlaceholder?: string
  extra?: React.ReactNode
}

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #f0f0f0;
`

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onAdd,
  onSearch,
  addButtonText = 'Thêm mới',
  searchPlaceholder = 'Tìm kiếm...',
  extra
}) => {
  return (
    <StyledCard>
      <Row justify="space-between" align="middle">
        <Col>
          <h2 style={{ margin: 0 }}>{title}</h2>
        </Col>
        <Col>
          <Space>
            {onSearch && (
              <Search
                placeholder={searchPlaceholder}
                onSearch={onSearch}
                style={{ width: 300 }}
                allowClear
              />
            )}
            {onAdd && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={onAdd}
              >
                {addButtonText}
              </Button>
            )}
            {extra}
          </Space>
        </Col>
      </Row>
    </StyledCard>
  )
} 