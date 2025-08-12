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
  border-radius: ${BORDER_RADIUS.SM};
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: ${SPACING.PADDING_MD};
  }
  
  @media (max-width: 480px) {
    padding: ${SPACING.PADDING_SM};
  }
`;

export const StyledCard = styled(Card)`
  margin-bottom: ${SPACING.MARGIN_XL};
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    margin-bottom: ${SPACING.MARGIN_MD};
  }
`

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: ${COLORS.BG_PRIMARY};
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    color: ${COLORS.TEXT_PRIMARY};
    border-bottom: 1px solid ${COLORS.BORDER_PRIMARY};
    padding: ${SPACING.PADDING_MD} ${SPACING.PADDING_XL};
    font-size: ${FONT_SIZE.SM};
    white-space: nowrap;
  }
  
  .ant-table-tbody > tr > td {
    padding: ${SPACING.PADDING_MD} ${SPACING.PADDING_XL};
    border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
    background: ${COLORS.BG_PRIMARY};
    word-break: break-word;
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
    -webkit-overflow-scrolling: touch;
  }
  
  .ant-table {
    border-radius: ${BORDER_RADIUS.LG};
    background: ${COLORS.BG_PRIMARY};
    min-width: 0;
  }
  
  @media (max-width: 768px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding: ${SPACING.PADDING_SM} ${SPACING.PADDING_MD};
    }
  }
  
  @media (max-width: 480px) {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding: 8px 4px;
      font-size: 12px;
    }
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: ${SPACING.GAP_MD};
  align-items: center;
  
  @media (max-width: 480px) {
    gap: ${SPACING.GAP_SM};
  }
` 