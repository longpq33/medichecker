import styled from 'styled-components'
import { Card, Tabs, Button, Tag } from 'antd'
import { 
  SPACING, 
  FONT_SIZE, 
  FONT_WEIGHT, 
  BORDER_RADIUS, 
  SHADOWS, 
  GRADIENTS,
  BUTTON_STYLES 
} from '@/constants'

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
  margin-bottom: ${SPACING.MARGIN_XL};
  padding: ${SPACING.PADDING_XL};
  background: ${GRADIENTS.WELLNEST};
  border-radius: ${BORDER_RADIUS.LG};
  color: white;
  box-shadow: ${SHADOWS.LG};
  
  .patient-avatar {
    position: relative;
    margin-right: ${SPACING.MARGIN_LG};
    
    .ant-avatar {
      border: 4px solid rgba(255, 255, 255, 0.3);
      box-shadow: ${SHADOWS.LG};
      width: 100px;
      height: 100px;
    }
    
    .status-indicator {
      position: absolute;
      bottom: 0;
      right: 0;
      
      .ant-badge-status-dot {
        width: 20px;
        height: 20px;
        border: 4px solid white;
      }
    }
  }
  
  .patient-info {
    flex: 1;
    
    .patient-name {
      font-size: ${FONT_SIZE.XXXL};
      font-weight: ${FONT_WEIGHT.BOLD};
      margin: 0 0 ${SPACING.MARGIN_SM} 0;
      color: white;
    }
    
    .patient-meta {
      display: flex;
      align-items: center;
      gap: ${SPACING.MARGIN_SM};
      margin-bottom: ${SPACING.MARGIN_SM};
      
      .status-tag {
        border: none;
        font-weight: ${FONT_WEIGHT.SEMIBOLD};
        padding: 4px 12px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
      }
    }
    
    .patient-contact {
      .ant-typography {
        color: rgba(255, 255, 255, 0.9);
        font-size: ${FONT_SIZE.SM};
        
        .anticon {
          margin-right: 6px;
        }
      }
    }
  }
  
  .patient-actions {
    .ant-btn {
      border-radius: ${BORDER_RADIUS.MD};
      font-weight: ${FONT_WEIGHT.MEDIUM};
      height: ${BUTTON_STYLES.HEIGHT};
      padding: ${BUTTON_STYLES.PADDING};
      
      &.ant-btn-primary {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        
        &:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.4);
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    
    .patient-avatar {
      margin-right: 0;
      margin-bottom: ${SPACING.MARGIN_MD};
    }
    
    .patient-actions {
      margin-top: ${SPACING.MARGIN_MD};
    }
  }
`

export const PatientStats = styled.div`
  margin-bottom: 32px;
  
  .ant-card {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
    
    .ant-statistic-title {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }
    
    .ant-statistic-content {
      font-size: 24px;
      font-weight: 600;
    }
  }
`

export const InfoCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  
  .ant-card-head {
    border-bottom: 2px solid #f0f0f0;
    padding: 0 24px;
    
    .ant-card-head-title {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      color: #262626;
      
      .anticon {
        margin-right: 8px;
        color: #1890ff;
      }
    }
  }
  
  .ant-card-body {
    padding: 24px;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    
    .info-item {
      background: #fafafa;
      padding: 16px;
      border-radius: 8px;
      border-left: 3px solid #1890ff;
      transition: all 0.3s ease;
      
      &:hover {
        background: #f0f8ff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
      }
      
      &.full-width {
        grid-column: 1 / -1;
      }
      
      .info-label {
        font-weight: 600;
        color: #666;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        
        .info-icon {
          color: #1890ff;
          margin-right: 8px;
        }
      }
      
      .info-value {
        color: #262626;
        font-size: 15px;
        font-weight: 500;
        line-height: 1.4;
      }
    }
  }
  
  .allergies-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`

export const TreatmentCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
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
  }
  
  .treatment-content {
    .treatment-section {
      margin-bottom: 16px;
      
      .section-label {
        font-weight: 600;
        color: #666;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        
        .anticon {
          margin-right: 6px;
          color: #1890ff;
        }
      }
      
      .section-value {
        color: #262626;
        font-size: 14px;
        line-height: 1.5;
      }
      
      .medicines-list {
        margin-top: 8px;
      }
    }
  }
`

export const AllergyTag = styled(Tag)`
  border-radius: 20px;
  font-weight: 500;
  padding: 4px 12px;
  border: none;
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  
  &:hover {
    transform: scale(1.05);
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
  .ant-timeline {
    .ant-timeline-item {
      .ant-timeline-item-content {
        margin-left: 16px;
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