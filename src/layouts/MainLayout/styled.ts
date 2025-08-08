import { Layout } from 'antd'
import styled from 'styled-components'
import { 
  SPACING, 
  FONT_SIZE,
  FONT_WEIGHT,
  BORDER_RADIUS, 
  COLORS, 
  GRADIENTS, 
  TRANSITIONS 
} from '@/constants'

const { Sider, Header, Content } = Layout

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: ${COLORS.BG_PRIMARY};

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
`

export const StyledSider = styled(Sider)`
  background: ${GRADIENTS.WELLNEST};
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
    
    .ant-menu-item {
      margin: ${SPACING.MARGIN_XS} ${SPACING.MARGIN_MD};
      border-radius: ${BORDER_RADIUS.MD};
      transition: ${TRANSITIONS.NORMAL};
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 400;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        transform: translateX(4px);
      }
      
      &.ant-menu-item-selected {
        background: rgba(255, 255, 255, 0.2) !important;
        box-shadow: none;
        font-weight: 500;
        
        &::before {
          display: none;
        }
      }
    }
    
    .ant-menu-item .anticon {
      color: rgba(255, 255, 255, 0.8);
    }
    
    .ant-menu-item-selected .anticon {
      color: white;
    }
  }
`

export const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${COLORS.BG_PRIMARY};
  padding: 0 ${SPACING.PADDING_XL};
  box-shadow: none;
  width: 100% !important;
  min-width: 0;
  height: 72px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  border-bottom: 1px solid ${COLORS.BORDER_PRIMARY};
`

export const StyledContent = styled(Content)`
  padding: ${SPACING.PADDING_XL};
  padding-top: calc(72px + ${SPACING.PADDING_XL});
  background: ${COLORS.BG_PRIMARY};
  min-height: calc(100vh - 72px);
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
  transition: margin-left 0.25s ease;
  
  &.ant-layout-sider-collapsed {
    margin-left: 80px;
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
` ;