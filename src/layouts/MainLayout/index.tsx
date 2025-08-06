import React from 'react'
import { Menu, Button, Avatar, Dropdown } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons'
import { useUIStore } from '@/store'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import { LanguageSwitcher } from '@/components'
import {
  StyledLayout,
  StyledSider,
  StyledHeader,
  StyledContent,
  Logo,
  UserInfo,
  MainContentLayout,
} from './styled'

export const MainLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, handleLogout } = useAuth()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const { t } = useLanguage()

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: t('navigation.dashboard'),
      onClick: () => navigate('/'),
    },
    {
      key: '/patients',
      icon: <TeamOutlined />,
      label: t('navigation.patientList'),
      onClick: () => navigate('/patients'),
    },
    {
      key: '/medicines',
      icon: <MedicineBoxOutlined />,
      label: t('navigation.medicineManagement'),
      onClick: () => navigate('/medicines'),
    },
  ]

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('common.profile'),
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('common.logout'),
      onClick: handleLogout,
    },
  ]

  // Get current selected key based on location
  const getSelectedKey = () => {
    const pathname = location.pathname
    if (pathname === '/') return ['/']
    if (pathname.startsWith('/patients')) return ['/patients']
    if (pathname.startsWith('/medicines')) return ['/medicines']
    return ['/']
  }

  return (
    <StyledLayout className={sidebarCollapsed ? 'ant-layout-sider-collapsed' : ''}>
      <StyledSider 
        trigger={null} 
        collapsible 
        collapsed={sidebarCollapsed}
        width={280}
        collapsedWidth={80}
      >
        <Logo>
          {!sidebarCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/logo.svg" alt="MediChecker" style={{ width: '24px', height: '24px' }} />
              <span>MediChecker</span>
            </div>
          )}
          {sidebarCollapsed && (
            <img src="/logo.svg" alt="MediChecker" style={{ width: '24px', height: '24px' }} />
          )}
        </Logo>
        <Menu
          mode="inline"
          selectedKeys={getSelectedKey()}
          items={menuItems}
          style={{ flex: 1, background: 'transparent' }}
        />
      </StyledSider>
      
      <MainContentLayout className={sidebarCollapsed ? 'ant-layout-sider-collapsed' : ''}>
        <StyledHeader>
          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          
          <UserInfo>
            <LanguageSwitcher />
            <span>{user?.name || 'User'}</span>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </UserInfo>
        </StyledHeader>
        
        <StyledContent>
          <Outlet />
        </StyledContent>
      </MainContentLayout>
    </StyledLayout>
  )
} 