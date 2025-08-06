import React from 'react'
import { Button as AntButton } from 'antd'
import type { ButtonProps } from 'antd'
import styled from 'styled-components'

const StyledButton = styled(AntButton)`
  border-radius: 8px;
  font-weight: 500;
  height: 40px;
  padding: 0 20px;
  
  &.ant-btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      color: #1890ff;
    }
  }
  
  &:not(.ant-btn-primary) {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.4);
      color: #1890ff;
    }
  }
`

export const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />
} 