import styled from 'styled-components'
import { Layout } from 'antd'

const { Sider, Header, Content } = Layout

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  width: 100% !important;
  overflow-x: hidden;
`

export const StyledSider = styled(Sider)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
  
  .ant-menu {
    background: transparent !important;
    border-right: none !important;
  }
  
  .ant-menu-item {
    margin: 4px 16px !important;
    border-radius: 8px !important;
    height: 48px !important;
    line-height: 48px !important;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      color: #ffffff !important;
    }
    
    &.ant-menu-item-selected {
      background: rgba(255, 255, 255, 0.2) !important;
      color: #ffffff !important;
      
      &::after {
        display: none !important;
      }
    }
  }
  
  .ant-menu-item .anticon {
    color: rgba(255, 255, 255, 0.8) !important;
    font-size: 16px !important;
  }
  
  .ant-menu-item-selected .anticon {
    color: #ffffff !important;
  }
  
  .ant-menu-title-content {
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: 500 !important;
  }
  
  .ant-menu-item-selected .ant-menu-title-content {
    color: #ffffff !important;
    font-weight: 600 !important;
  }
`

export const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100% !important;
  min-width: 0;
`

export const StyledContent = styled(Content)`
  margin: 24px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  min-height: calc(100vh - 112px);
  width: 100% !important;
  min-width: 0;
  overflow-x: auto;
  max-width: 100%;
`

export const Logo = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  padding: 24px 16px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  margin: 8px;
  border-radius: 8px;
  
  img {
    display: block;
  }
  
  span {
    color: #ffffff !important;
    font-weight: 700 !important;
    font-size: 16px !important;
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const MainContentLayout = styled(Layout)`
  width: 100% !important;
  min-width: 0;
  overflow-x: hidden;
` 