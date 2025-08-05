import styled from 'styled-components'
import { Card } from 'antd'

export const StyledCard = styled(Card)`
  margin-bottom: 24px;
`

export const StatCard = styled(Card)`
  text-align: center;
  
  .ant-statistic-title {
    color: #666;
    font-size: 14px;
  }
  
  .ant-statistic-content {
    font-size: 24px;
    font-weight: bold;
  }
` 