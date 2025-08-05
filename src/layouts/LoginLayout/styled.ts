import styled from 'styled-components'
import { Layout } from 'antd'

const { Content } = Layout

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

export const StyledContent = styled(Content)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`

export const AuthContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 48px;
  width: 100%;
  max-width: 400px;
`

export const Logo = styled.div`
  text-align: center;
  margin-bottom: 32px;
  
  h1 {
    color: #1890ff;
    font-size: 28px;
    font-weight: bold;
    margin: 0;
  }
  
  p {
    color: #666;
    margin: 8px 0 0 0;
  }
` 