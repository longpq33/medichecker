import React from 'react'
import { Button as AntButton } from 'antd'
import type { ButtonProps } from 'antd'
import styled from 'styled-components'
import { COLORS, GRADIENTS } from '@/constants'

const StyledButton = styled(AntButton)`
  border-radius: 8px;
  font-weight: 500;
  height: 40px;
  padding: 0 20px;
  
  &.ant-btn-primary {
    background: ${GRADIENTS.PRIMARY};
    border: 1px solid ${COLORS.PRIMARY};
    color: white;
    
    &:hover {
      background: ${GRADIENTS.PRIMARY_HOVER};
      transform: translateY(-1px);
      box-shadow: none;
      color: #fff;
    }
  }
  
  &:not(.ant-btn-primary) {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.4);
      color: #ffffff;
    }
  }
`

export const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />
} 