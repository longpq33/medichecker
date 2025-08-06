import styled from 'styled-components'
import { Card } from 'antd'

export const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
  }
  
  .ant-card-head-title {
    font-weight: 600;
    color: #262626;
  }
`

export const StatCard = styled(Card)`
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .ant-statistic-title {
    color: #666;
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .ant-statistic-content {
    font-size: 24px;
    font-weight: bold;
  }
  
  .ant-statistic-content-prefix {
    margin-right: 8px;
  }
` 