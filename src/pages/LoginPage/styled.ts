import styled from 'styled-components'
import { Form, Button, Divider } from 'antd'
import { Link } from 'react-router-dom'

export const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 16px;
  }
  
  .ant-btn {
    height: 40px;
    font-size: 16px;
  }
`

export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 8px;
`

export const StyledDivider = styled(Divider)`
  margin: 24px 0;
`

export const StyledLink = styled(Link)`
  color: #1890ff;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
` 