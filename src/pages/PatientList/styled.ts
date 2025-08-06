import styled from 'styled-components'
import { Card, Table } from 'antd'
import { 
  SPACING, 
  FONT_WEIGHT, 
  COLORS 
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
  }
  
  .ant-table-tbody > tr:hover > td {
    background: ${COLORS.BG_TERTIARY};
  }
  
  .ant-table-wrapper {
    overflow-x: auto;
    max-width: 100%;
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: ${SPACING.GAP_SM};
  align-items: center;
` 