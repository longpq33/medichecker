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
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`

const StyledSpace = styled(Space)`
  justify-content: flex-end;
  width: 100%;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
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
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{title}</h2>
        </Col>
        <Col xs={24} sm={12} md={16}>
          <StyledSpace wrap size="small">
            {onSearch && (
              <Search
                placeholder={searchPlaceholder}
                onSearch={onSearch}
                style={{ width: '100%', maxWidth: 300 }}
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
          </StyledSpace>
        </Col>
      </Row>
    </StyledCard>
  )
} 