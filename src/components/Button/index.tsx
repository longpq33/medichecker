import React from 'react'
import { Button as AntButton } from 'antd'
import type { ButtonProps as AntButtonProps } from 'antd'
import styled from 'styled-components'

export interface ButtonProps extends Omit<AntButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'middle' | 'large'
}

const StyledButton = styled(AntButton)<ButtonProps>`
  &.ant-btn {
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s ease;
    
    ${({ variant }) => {
      switch (variant) {
        case 'secondary':
          return `
            background: #f0f0f0;
            border-color: #d9d9d9;
            color: #666;
            
            &:hover {
              background: #e6e6e6;
              border-color: #bfbfbf;
              color: #333;
            }
          `
        case 'outline':
          return `
            background: transparent;
            border-color: #1890ff;
            color: #1890ff;
            
            &:hover {
              background: #1890ff;
              border-color: #1890ff;
              color: white;
            }
          `
        default:
          return ''
      }
    }}
  }
`

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  ...props 
}) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  )
} 