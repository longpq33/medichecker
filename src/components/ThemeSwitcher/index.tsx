import React from 'react'
import { Button } from 'antd'
import { 
  SunOutlined, 
  MoonOutlined 
} from '@ant-design/icons'
import { useTheme } from '@/hooks/useTheme'
import { THEME } from '@/constants'

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  const getThemeIcon = () => {
    switch (theme) {
      case THEME.DARK:
        return <MoonOutlined />
      case THEME.LIGHT:
      default:
        return <SunOutlined />
    }
  }

  return (
    <Button
      type="text"
      icon={getThemeIcon()}
      onClick={toggleTheme}
      style={{ 
        color: theme === THEME.DARK ? '#ffffff' : '#1890ff',
        marginRight: 8
      }}
    />
  )
} 