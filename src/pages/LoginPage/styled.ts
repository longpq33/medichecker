import styled from 'styled-components'
import { Form, Button, Divider } from 'antd'
import { Link } from 'react-router-dom'
import { 
  SPACING, 
  FONT_SIZE, 
  COLORS, 
  BUTTON_STYLES 
} from '@/constants'

export const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: ${SPACING.MARGIN_MD};
  }
  
  .ant-btn {
    height: ${BUTTON_STYLES.HEIGHT};
    font-size: ${FONT_SIZE.MD};
  }
`

export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: ${SPACING.MARGIN_SM};
`

export const StyledDivider = styled(Divider)`
  margin: ${SPACING.MARGIN_LG} 0;
`

export const StyledLink = styled(Link)`
  color: ${COLORS.PRIMARY};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
` 