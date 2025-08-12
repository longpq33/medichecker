import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { BreadcrumbContainer, BreadcrumbItem } from './styled';

export interface BreadcrumbItemType {
  title: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItemType[];
  showHome?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  showHome = true 
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  const breadcrumbItems = [
    ...(showHome ? [{
      title: t('common.home'),
      path: '/',
      icon: <HomeOutlined />
    }] : []),
    ...items
  ];

  return (
    <BreadcrumbContainer>
      <AntBreadcrumb
        separator={<RightOutlined />}
        items={breadcrumbItems.map((item, index) => ({
          title: (
            <BreadcrumbItem
              key={index}
              onClick={() => handleClick(item.path)}
              $clickable={!!item.path}
              $isLast={index === breadcrumbItems.length - 1}
            >
              {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
              <span className="breadcrumb-text">{item.title}</span>
            </BreadcrumbItem>
          )
        }))}
      />
    </BreadcrumbContainer>
  );
};
