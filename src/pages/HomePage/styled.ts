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
  border-radius: ${BORDER_RADIUS.SM};
  box-shadow: ${SHADOWS.SM};
  
  .ant-card-head {
    border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
  }
  
  .ant-card-head-title {
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    color: ${COLORS.TEXT_PRIMARY};
  }
`

export const StatCard = styled(Card)`
  text-align: center;
  border-radius: ${BORDER_RADIUS.SM};
  box-shadow: ${SHADOWS.SM};
  transition: ${TRANSITIONS.NORMAL};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${SHADOWS.MD};
  }
  
  .ant-statistic-title {
    color: ${COLORS.TEXT_SECONDARY};
    font-size: ${FONT_SIZE.SM};
    margin-bottom: ${SPACING.MARGIN_SM};
  }
  
  .ant-statistic-content {
    font-size: ${FONT_SIZE.XXL};
    font-weight: ${FONT_WEIGHT.BOLD};
  }
  
  .ant-statistic-content-prefix {
    margin-right: ${SPACING.MARGIN_SM};
  }
` 