import styled from 'styled-components'
import { Layout } from 'antd'
import { 
  SPACING, 
  FONT_SIZE, 
  FONT_WEIGHT, 
  BORDER_RADIUS, 
  TRANSITIONS 
} from '@/constants'
import type { ThemeColors } from '@/types'

const { Sider, Header, Content } = Layout

export const StyledLayout = styled(Layout)<{ theme?: ThemeColors }>`
  min-height: 100vh;
  background: ${({ theme }) => theme?.bgPrimary || '#ffffff'};
  width: 100%;
  overflow-x: hidden;
  header {
      button {
        margin-left: 250px;
      }
    }

  .ant-layout-sider-collapsed {
    header {
      button {
        margin-left: 50px;
      }
    }
  }

  @media (max-width: 768px) {
    .ant-layout-sider {
      position: fixed !important;
      z-index: 1000;
    }
  }
`

export const StyledSider = styled(Sider)<{ theme?: ThemeColors }>`
  background: ${({ theme }) => theme?.sidebarBg || 'linear-gradient(135deg, #2C92B8 0%, #1e7a9a 100%)'};
  box-shadow: none;
  border-radius: 0 ${BORDER_RADIUS.LG} ${BORDER_RADIUS.LG} 0;
  overflow: hidden;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
  
  .ant-menu {
    background: transparent;
    border-right: none;
    width: 100%;
    
    .ant-menu-item {
      margin: ${SPACING.MARGIN_XS} ${SPACING.MARGIN_MD};
      border-radius: ${BORDER_RADIUS.MD};
      transition: ${TRANSITIONS.NORMAL};
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 400;
      width: calc(100% - ${SPACING.MARGIN_MD} * 2);
      
      &:hover {
        background: ${({ theme }) => theme?.sidebarHover || 'rgba(255, 255, 255, 0.1)'} !important;
        transform: translateX(4px);
      }
      
      &.ant-menu-item-selected {
        background: ${({ theme }) => theme?.sidebarActive || 'rgba(255, 255, 255, 0.2)'} !important;
        box-shadow: none;
        font-weight: 500;
        
        &::before {
          display: none;
        }
      }
    }
    
    .ant-menu-item .anticon {
      color: ${({ theme }) => theme?.sidebarText || 'rgba(255, 255, 255, 0.8)'};
    }
    
    .ant-menu-item-selected .anticon {
      color: white;
    }
  }

  @media (max-width: 768px) {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    
    &.ant-layout-sider-collapsed {
      transform: translateX(0);
    }
  }
`

export const StyledHeader = styled(Header)<{ theme?: ThemeColors }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme?.headerBg || '#ffffff'};
  padding: 0 ${SPACING.PADDING_XL};
  box-shadow: none;
  width: 100%;
  min-width: 0;
  height: 72px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  border-bottom: 1px solid ${({ theme }) => theme?.headerBorder || '#f0f0f0'};
  
  @media (max-width: 768px) {
    padding: 0 ${SPACING.PADDING_MD};
  }
`

export const MainContentLayout = styled.div`
  margin-left: 280px;
  transition: margin-left 0.25s ease;
  width: calc(100% - 280px);
  min-width: 0;
  overflow-x: hidden;
  
  &.ant-layout-sider-collapsed {
    margin-left: 80px;
    width: calc(100% - 80px);
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    
    &.ant-layout-sider-collapsed {
      margin-left: 0;
      width: 100%;
    }
  }
`

export const StyledContent = styled(Content)<{ theme?: ThemeColors }>`
  margin-top: 72px;
  padding: ${SPACING.PADDING_XL};
  background: ${({ theme }) => theme?.bgPrimary || '#ffffff'};
  min-height: calc(100vh - 72px);
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: ${SPACING.PADDING_MD};
  }
`

export const Logo = styled.div`
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${FONT_SIZE.LG};
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 ${SPACING.PADDING_MD};
  
  @media (max-width: 768px) {
    padding: 0 ${SPACING.PADDING_SM};
  }
`

export const UserInfo = styled.div<{ theme?: ThemeColors }>`
  display: flex;
  align-items: center;
  gap: ${SPACING.MARGIN_MD};
  color: ${({ theme }) => theme?.headerText || '#262626'};
  
  @media (max-width: 768px) {
    gap: ${SPACING.MARGIN_SM};
    
    span {
      display: none;
    }
  }
`