import styled from 'styled-components'
import { Card, Table } from 'antd'
import { 
  SPACING, 
  BORDER_RADIUS, 
  COLORS, 
  FONT_SIZE, 
  FONT_WEIGHT 
} from '@/constants'

export const PatientListContainer = styled.div`
  padding: ${SPACING.PADDING_XL};
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  border-radius: ${BORDER_RADIUS.SM};
`;

export const StyledCard = styled(Card)`
  margin-bottom: ${SPACING.MARGIN_XL};
  width: 100%;
  overflow-x: hidden;
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  border: 1px solid ${COLORS.BORDER_PRIMARY};
`

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: ${COLORS.BG_PRIMARY};
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    color: ${COLORS.TEXT_PRIMARY};
    border-bottom: 1px solid ${COLORS.BORDER_PRIMARY};
    padding: ${SPACING.PADDING_MD} ${SPACING.PADDING_XL};
    font-size: ${FONT_SIZE.SM};
  }
  
  .ant-table-tbody > tr > td {
    padding: ${SPACING.PADDING_MD} ${SPACING.PADDING_XL};
    border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
    background: ${COLORS.BG_PRIMARY};
  }
  
  .ant-table-tbody > tr:hover > td {
    background: ${COLORS.BG_TERTIARY};
  }
  
  .ant-table-wrapper {
    overflow-x: auto;
    max-width: 100%;
    border-radius: ${BORDER_RADIUS.LG};
    box-shadow: none;
    border: 1px solid ${COLORS.BORDER_PRIMARY};
    background: ${COLORS.BG_PRIMARY};
  }
  
  .ant-table {
    border-radius: ${BORDER_RADIUS.LG};
    background: ${COLORS.BG_PRIMARY};
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: ${SPACING.GAP_MD};
  align-items: center;
` 