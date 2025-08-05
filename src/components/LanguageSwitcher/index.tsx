import React from 'react'
import { Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useLanguage } from '@/hooks/useLanguage'

export const LanguageSwitcher: React.FC = () => {
  const { changeLanguage, currentLanguage } = useLanguage()

  const languageItems = [
    {
      key: 'vi',
      label: 'Tiếng Việt',
      onClick: () => changeLanguage('vi'),
    },
    {
      key: 'en',
      label: 'English',
      onClick: () => changeLanguage('en'),
    },
  ]

  return (
    <Dropdown
      menu={{ items: languageItems }}
      placement="bottomRight"
      arrow
    >
      <Button
        type="text"
        icon={<GlobalOutlined />}
        style={{ color: '#1890ff' }}
      >
        {currentLanguage === 'vi' ? 'VI' : 'EN'}
      </Button>
    </Dropdown>
  )
} 