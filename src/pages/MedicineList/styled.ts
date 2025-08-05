import styled from 'styled-components'
import { Card, Table } from 'antd'

export const StyledCard = styled(Card)`
  margin-bottom: 24px;
  width: 100%;
  overflow-x: hidden;
`

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: #fafafa;
    font-weight: 600;
  }
  
  .ant-table-tbody > tr:hover > td {
    background: #f5f5f5;
  }
  
  .ant-table-wrapper {
    overflow-x: auto;
    max-width: 100%;
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
` 