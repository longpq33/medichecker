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
  FileTextOutlined,
  ContactsOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { useUIStore } from '@/store'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/hooks/useLanguage'
import { LanguageSwitcher, ThemeSwitcher } from '@/components'
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
  const {  handleLogout } = useAuth()
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
      label: t('navigation.patientManagement'),
      onClick: () => navigate('/patients'),
    },
    {
      key: '/medicines',
      icon: <MedicineBoxOutlined />,
      label: t('navigation.medicineManagement'),
      onClick: () => navigate('/medicines'),
    },
    {
      key: '/prescriptions',
      icon: <FileTextOutlined />,
      label: t('navigation.prescriptionManagement'),
      onClick: () => navigate('/prescriptions'),
    },
    {
      key: '/contact',
      icon: <ContactsOutlined />,
      label: t('navigation.contact'),
      onClick: () => navigate('/contact'),
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: t('navigation.about'),
      onClick: () => navigate('/about'),
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
    if (pathname.startsWith('/prescriptions')) return ['/prescriptions']
    if (pathname === '/contact') return ['/contact']
    if (pathname === '/about') return ['/about']
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
              <img src="/medichecker-favicon.svg" alt="MediChecker" style={{ width: '24px', height: '24px' }} />
              <span>MediChecker</span>
            </div>
          )}
          {sidebarCollapsed && (
            <img src="/medichecker-favicon.svg" alt="MediChecker" style={{ width: '24px', height: '24px' }} />
          )}
        </Logo>
        <Menu
          mode="inline"
          selectedKeys={getSelectedKey()}
          items={menuItems}
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
            <ThemeSwitcher />
            <LanguageSwitcher />
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