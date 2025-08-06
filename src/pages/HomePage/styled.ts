import { Card } from 'antd'
import styled from 'styled-components'
import { 
  SPACING, 
  BORDER_RADIUS, 
  COLORS, 
  FONT_SIZE, 
  FONT_WEIGHT, 
  TRANSITIONS 
} from '@/constants'

export const StyledCard = styled(Card)`
  margin-bottom: ${SPACING.MARGIN_XL};
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  
  .ant-card-head {
    border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
    padding: ${SPACING.PADDING_XL};
  }
  
  .ant-card-head-title {
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    color: ${COLORS.TEXT_PRIMARY};
    font-size: ${FONT_SIZE.LG};
  }
  
  .ant-card-body {
    padding: ${SPACING.PADDING_XL};
  }
`

export const StatCard = styled(Card)`
  text-align: center;
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  transition: ${TRANSITIONS.NORMAL};
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  background: ${COLORS.BG_PRIMARY};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: none;
    border-color: ${COLORS.PRIMARY};
  }
  
  .ant-statistic-title {
    color: ${COLORS.TEXT_SECONDARY};
    font-size: ${FONT_SIZE.SM};
    margin-bottom: ${SPACING.MARGIN_MD};
    font-weight: ${FONT_WEIGHT.MEDIUM};
  }
  
  .ant-statistic-content {
    font-size: ${FONT_SIZE.XXL};
    font-weight: ${FONT_WEIGHT.BOLD};
    color: ${COLORS.TEXT_PRIMARY};
  }
  
  .ant-statistic-content-prefix {
    margin-right: ${SPACING.MARGIN_MD};
    color: ${COLORS.PRIMARY};
  }
` 