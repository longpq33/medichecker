import styled from 'styled-components'
import { Card } from 'antd'
import { 
  SPACING, 
  FONT_SIZE, 
  FONT_WEIGHT, 
  BORDER_RADIUS, 
  SHADOWS, 
  COLORS, 
  TRANSITIONS 
} from '@/constants'

export const StyledCard = styled(Card)`
  margin-bottom: ${SPACING.MARGIN_LG};
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: ${SHADOWS.SM};
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  
  .ant-card-head {
    border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
    padding: ${SPACING.PADDING_LG};
  }
  
  .ant-card-head-title {
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    color: ${COLORS.TEXT_PRIMARY};
    font-size: ${FONT_SIZE.LG};
  }
  
  .ant-card-body {
    padding: ${SPACING.PADDING_LG};
  }
`

export const StatCard = styled(Card)`
  text-align: center;
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: ${SHADOWS.SM};
  transition: ${TRANSITIONS.NORMAL};
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  background: ${COLORS.BG_PRIMARY};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${SHADOWS.LG};
    border-color: ${COLORS.PRIMARY};
  }
  
  .ant-statistic-title {
    color: ${COLORS.TEXT_SECONDARY};
    font-size: ${FONT_SIZE.SM};
    margin-bottom: ${SPACING.MARGIN_SM};
    font-weight: ${FONT_WEIGHT.MEDIUM};
  }
  
  .ant-statistic-content {
    font-size: ${FONT_SIZE.XXL};
    font-weight: ${FONT_WEIGHT.BOLD};
    color: ${COLORS.TEXT_PRIMARY};
  }
  
  .ant-statistic-content-prefix {
    margin-right: ${SPACING.MARGIN_SM};
    color: ${COLORS.PRIMARY};
  }
` 