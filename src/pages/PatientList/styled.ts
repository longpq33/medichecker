import styled from 'styled-components'
import { Card, Table } from 'antd'
import { 
  SPACING, 
  FONT_WEIGHT, 
  COLORS,
  FONT_SIZE,
  BORDER_RADIUS,
  SHADOWS
} from '@/constants'

export const StyledCard = styled(Card)`
  margin-bottom: ${SPACING.MARGIN_LG};
  width: 100%;
  overflow-x: hidden;
`

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: ${COLORS.BG_SECONDARY};
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    color: ${COLORS.TEXT_PRIMARY};
    border-bottom: 1px solid ${COLORS.BORDER_PRIMARY};
    padding: ${SPACING.PADDING_MD} ${SPACING.PADDING_LG};
    font-size: ${FONT_SIZE.SM};
  }
  
  .ant-table-tbody > tr > td {
    padding: ${SPACING.PADDING_MD} ${SPACING.PADDING_LG};
    border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
  }
  
  .ant-table-tbody > tr:hover > td {
    background: ${COLORS.BG_TERTIARY};
  }
  
  .ant-table-wrapper {
    overflow-x: auto;
    max-width: 100%;
    border-radius: ${BORDER_RADIUS.LG};
    box-shadow: ${SHADOWS.SM};
    border: 1px solid ${COLORS.BORDER_PRIMARY};
  }
  
  .ant-table {
    border-radius: ${BORDER_RADIUS.LG};
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: ${SPACING.GAP_SM};
  align-items: center;
` 