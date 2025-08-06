import styled from 'styled-components'
import { Layout } from 'antd'
import { 
  SPACING, 
  FONT_SIZE, 
  FONT_WEIGHT, 
  BORDER_RADIUS, 
  SHADOWS, 
  COLORS, 
  GRADIENTS,
  TRANSITIONS 
} from '@/constants'

const { Sider, Header, Content } = Layout

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  width: 100% !important;
  overflow-x: hidden;
`

export const StyledSider = styled(Sider)`
  background: ${GRADIENTS.WELLNEST} !important;
  position: fixed !important;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0;
  box-shadow: ${SHADOWS.LG};
  
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .ant-menu {
    background: transparent !important;
    border-right: none !important;
    flex: 1;
    width: 100% !important;
    padding: ${SPACING.PADDING_MD} 0;
  }
  
  .ant-menu-item {
    margin: ${SPACING.MARGIN_XS} ${SPACING.MARGIN_MD} !important;
    border-radius: ${BORDER_RADIUS.MD} !important;
    height: 48px !important;
    line-height: 48px !important;
    width: calc(100% - ${SPACING.MARGIN_XL}) !important;
    max-width: calc(100% - ${SPACING.MARGIN_XL}) !important;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ${TRANSITIONS.NORMAL};
    
    &:hover {
      background: rgba(255, 255, 255, 0.15) !important;
      color: ${COLORS.BG_PRIMARY} !important;
      transform: translateX(4px);
    }
    
    &.ant-menu-item-selected {
      background: rgba(255, 255, 255, 0.25) !important;
      color: ${COLORS.BG_PRIMARY} !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      
      &::after {
        display: none !important;
      }
    }
  }
  
  .ant-menu-item .anticon {
    color: rgba(255, 255, 255, 0.9) !important;
    font-size: ${FONT_SIZE.MD} !important;
    margin-right: ${SPACING.MARGIN_SM} !important;
  }
  
  .ant-menu-item-selected .anticon {
    color: ${COLORS.BG_PRIMARY} !important;
  }
  
  .ant-menu-title-content {
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: ${FONT_WEIGHT.MEDIUM} !important;
    font-size: ${FONT_SIZE.SM} !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }
  
  .ant-menu-item-selected .ant-menu-title-content {
    color: ${COLORS.BG_PRIMARY} !important;
    font-weight: ${FONT_WEIGHT.SEMIBOLD} !important;
  }
  
  /* Collapsed state fixes */
  &.ant-layout-sider-collapsed {
    .ant-menu-item .anticon {
      margin-right: 0 !important;
      font-size: ${FONT_SIZE.LG} !important;
    }
    
    .ant-menu-title-content {
      display: none !important;
    }
  }
`

export const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${COLORS.BG_PRIMARY};
  padding: 0 ${SPACING.PADDING_LG};
  box-shadow: ${SHADOWS.SM};
  width: 100% !important;
  min-width: 0;
  height: 72px;
  position: sticky;
  top: 0;
  z-index: 999;
  border-bottom: 1px solid ${COLORS.BORDER_PRIMARY};
`

export const StyledContent = styled(Content)`
  padding: ${SPACING.PADDING_LG};
  background: transparent;
  min-height: calc(100vh - 64px);
  width: 100% !important;
  min-width: 0;
  overflow-x: hidden;
  max-width: 100%;
  box-sizing: border-box;
`

export const Logo = styled.div`
  font-size: ${FONT_SIZE.LG};
  font-weight: ${FONT_WEIGHT.BOLD};
  color: ${COLORS.BG_PRIMARY};
  padding: ${SPACING.PADDING_LG} ${SPACING.PADDING_MD};
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  margin: ${SPACING.MARGIN_SM};
  border-radius: ${BORDER_RADIUS.MD};
  flex-shrink: 0;
  backdrop-filter: blur(10px);
  
  img {
    display: block;
    height: 32px;
    width: auto;
  }
  
  span {
    color: ${COLORS.BG_PRIMARY} !important;
    font-weight: ${FONT_WEIGHT.BOLD} !important;
    font-size: ${FONT_SIZE.MD} !important;
    letter-spacing: 0.5px;
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.GAP_SM};
`

export const MainContentLayout = styled(Layout)`
  width: 100% !important;
  min-width: 0;
  overflow-x: hidden;
  margin-left: 280px;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
` ;