import styled from 'styled-components'
import { Card, Tabs, Button } from 'antd'

export const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .ant-card-body {
    padding: 24px;
  }
`

export const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    font-weight: 500;
    padding: 12px 24px;
    
    &:hover {
      color: #1890ff;
    }
  }
  
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #1890ff;
      font-weight: 600;
    }
  }
  
  .ant-tabs-content-holder {
    padding: 24px 0;
  }
  
  .ant-tabs-ink-bar {
    background: #1890ff;
    height: 3px;
  }
`

export const PatientHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  
  .patient-avatar {
    margin-right: 20px;
    
    .ant-avatar {
      border: 3px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
  
  .patient-info {
    flex: 1;
    
    .patient-name {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: white;
    }
    
    .patient-id {
      font-size: 14px;
      opacity: 0.8;
      margin-bottom: 12px;
    }
    
    .patient-status {
      .ant-tag {
        border: none;
        font-weight: 600;
        padding: 4px 12px;
        border-radius: 20px;
      }
    }
  }
`

export const InfoSection = styled.div`
  margin-bottom: 32px;
  
  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #262626;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 2px solid #f0f0f0;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 40px;
      height: 2px;
      background: #1890ff;
    }
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .info-item {
    background: #fafafa;
    padding: 16px;
    border-radius: 8px;
    border-left: 1px solid #1890ff;
    transition: all 0.3s ease;
    
    &:hover {
      background: #f0f8ff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
    }
    
    .info-label {
      font-weight: 600;
      color: #666;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    
    .info-value {
      color: #262626;
      font-size: 15px;
      font-weight: 500;
    }
    
    .info-icon {
      color: #1890ff;
      margin-right: 8px;
    }
  }
  
  .allergies-container {
    .allergy-tag {
      margin: 4px;
      border-radius: 20px;
      font-weight: 500;
      padding: 4px 12px;
      border: none;
      background: linear-gradient(135deg, #ff6b6b, #ee5a52);
      color: white;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
`

export const TreatmentHistory = styled.div`
  .treatment-item {
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
    
    .treatment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #f0f0f0;
      
      .treatment-date {
        font-weight: 600;
        color: #1890ff;
        font-size: 16px;
        display: flex;
        align-items: center;
        
        .date-icon {
          margin-right: 8px;
          color: #1890ff;
        }
      }
      
      .treatment-status {
        .ant-badge-status-dot {
          width: 10px;
          height: 10px;
        }
        
        .ant-badge-status-text {
          font-weight: 600;
          font-size: 13px;
        }
      }
    }
    
    .treatment-content {
      .treatment-section {
        margin-bottom: 12px;
        
        .section-label {
          font-weight: 600;
          color: #666;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        
        .section-value {
          color: #262626;
          font-size: 14px;
          line-height: 1.5;
        }
      }
      
      .treatment-diagnosis {
        margin-bottom: 12px;
        
        .section-label {
          color: #d63384;
        }
      }
      
      .treatment-prescription {
        margin-bottom: 12px;
        
        .section-label {
          color: #198754;
        }
      }
      
      .treatment-doctor {
        margin-bottom: 8px;
        
        .section-label {
          color: #6f42c1;
        }
      }
      
      .treatment-notes {
        background: #f8f9fa;
        padding: 12px;
        border-radius: 6px;
        border-left: 3px solid #ffc107;
        
        .section-label {
          color: #fd7e14;
        }
      }
    }
  }
`

export const ActionButton = styled(Button)`
  border-radius: 8px;
  font-weight: 500;
  height: 40px;
  padding: 0 20px;
  
  &.ant-btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    
    &:hover {
      background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
  }
`

export const BackButton = styled(Button)`
  border-radius: 8px;
  font-weight: 500;
  height: 40px;
  padding: 0 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
` 