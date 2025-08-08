import React from 'react'
import { Card, Statistic } from 'antd'
import styled from 'styled-components'
import { SPACING, BORDER_RADIUS, COLORS } from '@/constants'

const StyledCard = styled(Card)`
  margin-bottom: ${SPACING.MARGIN_MD};
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  .ant-card-body {
    padding: ${SPACING.PADDING_LG};
  }
  
  .ant-statistic-title {
    font-size: 14px;
    color: ${COLORS.TEXT_SECONDARY};
    margin-bottom: ${SPACING.MARGIN_SM};
  }
  
  .ant-statistic-content {
    font-size: 24px;
    font-weight: 600;
    color: ${COLORS.TEXT_PRIMARY};
  }
`

interface StatCardProps {
  title: string
  value: number | string
  prefix?: React.ReactNode
  suffix?: string
  valueStyle?: React.CSSProperties
  loading?: boolean
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  valueStyle,
  loading = false
}) => {
  return (
    <StyledCard>
      <Statistic
        title={title}
        value={value}
        prefix={prefix}
        suffix={suffix}
        valueStyle={valueStyle}
        loading={loading}
      />
    </StyledCard>
  )
} 