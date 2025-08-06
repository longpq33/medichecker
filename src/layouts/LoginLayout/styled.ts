import styled from 'styled-components'
import { Layout } from 'antd'
import { 
  SPACING, 
  FONT_SIZE, 
  FONT_WEIGHT, 
  BORDER_RADIUS, 
  SHADOWS, 
  COLORS, 
  GRADIENTS 
} from '@/constants'

const { Content } = Layout

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: ${GRADIENTS.PRIMARY};
`

export const StyledContent = styled(Content)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${SPACING.PADDING_LG};
`

export const AuthContainer = styled.div`
  background: ${COLORS.BG_PRIMARY};
  border-radius: ${BORDER_RADIUS.MD};
  box-shadow: ${SHADOWS.LG};
  padding: ${SPACING.PADDING_XXL};
  width: 100%;
  max-width: 400px;
`

export const Logo = styled.div`
  text-align: center;
  margin-bottom: ${SPACING.MARGIN_XL};
  
  h1 {
    color: ${COLORS.PRIMARY};
    font-size: ${FONT_SIZE.XXXL};
    font-weight: ${FONT_WEIGHT.BOLD};
    margin: 0;
  }
  
  p {
    color: ${COLORS.TEXT_SECONDARY};
    margin: ${SPACING.MARGIN_SM} 0 0 0;
  }
` 