import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  StyledLayout,
  StyledContent,
  AuthContainer,
  Logo,
} from './styled'

export const LoginLayout: React.FC = () => {
  return (
    <StyledLayout>
      <StyledContent>
        <AuthContainer>
          <Logo>
            <h1>MediChecker</h1>
            <p>Hệ thống quản lý y tế</p>
          </Logo>
          <Outlet />
        </AuthContainer>
      </StyledContent>
    </StyledLayout>
  )
} 