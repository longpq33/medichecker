import React from 'react'
import { Card } from 'antd'
import styled from 'styled-components'
import { SPACING, BORDER_RADIUS, COLORS } from '@/constants'

const StyledCard = styled(Card)`
  margin-bottom: ${SPACING.MARGIN_MD};
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  
  .ant-card-head {
    border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
    padding: ${SPACING.PADDING_MD} ${SPACING.PADDING_LG};
  }
  
  .ant-card-head-title {
    font-size: 16px;
    font-weight: 600;
    color: ${COLORS.TEXT_PRIMARY};
  }
  
  .ant-card-body {
    padding: ${SPACING.PADDING_LG};
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: ${SPACING.MARGIN_MD};
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${SPACING.PADDING_SM} 0;
    border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .info-label {
    font-weight: 500;
    color: ${COLORS.TEXT_SECONDARY};
    display: flex;
    align-items: center;
  }
  
  .info-value {
    font-weight: 600;
    color: ${COLORS.TEXT_PRIMARY};
    text-align: right;
  }
`

interface InfoCardProps {
  title?: React.ReactNode
  children: React.ReactNode
  extra?: React.ReactNode
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
  extra
}) => {
  return (
    <StyledCard
      title={title}
      extra={extra}
    >
      {children}
    </StyledCard>
  )
} 