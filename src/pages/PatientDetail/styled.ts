import { Card, Tag, Tabs, Button } from 'antd'
import styled from 'styled-components'
import { 
  SPACING, 
  BORDER_RADIUS, 
  COLORS, 
  FONT_SIZE, 
  FONT_WEIGHT, 
  GRADIENTS,
  TRANSITIONS,
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
  margin-bottom: ${SPACING.MARGIN_XXL};
  padding: ${SPACING.PADDING_XXL};
  background: ${GRADIENTS.WELLNEST};
  border-radius: ${BORDER_RADIUS.LG};
  color: white;
  box-shadow: none;
  
  .patient-avatar {
    position: relative;
    margin-right: ${SPACING.MARGIN_XL};
    
    .ant-avatar {
      border: 4px solid rgba(255, 255, 255, 0.3);
      box-shadow: none;
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
      margin: 0 0 ${SPACING.MARGIN_MD} 0;
      color: white;
    }
    
    .patient-meta {
      display: flex;
      align-items: center;
      gap: ${SPACING.MARGIN_MD};
      margin-bottom: ${SPACING.MARGIN_MD};
      
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
      margin-bottom: ${SPACING.MARGIN_LG};
    }
    
    .patient-actions {
      margin-top: ${SPACING.MARGIN_LG};
    }
  }
`

export const PatientStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${SPACING.GAP_LG};
  margin-bottom: ${SPACING.MARGIN_XL};
  
  .ant-card {
    border-radius: ${BORDER_RADIUS.LG};
    box-shadow: none;
    border: 1px solid ${COLORS.BORDER_PRIMARY};
    background: ${COLORS.BG_PRIMARY};
    transition: ${TRANSITIONS.NORMAL};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: none;
    }
    
    .ant-statistic-title {
      color: ${COLORS.TEXT_SECONDARY};
      font-size: ${FONT_SIZE.SM};
      margin-bottom: ${SPACING.MARGIN_SM};
    }
    
    .ant-statistic-content {
      color: ${COLORS.TEXT_PRIMARY};
      font-size: ${FONT_SIZE.XL};
      font-weight: ${FONT_WEIGHT.BOLD};
    }
  }
`

export const InfoCard = styled(Card)`
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  background: ${COLORS.BG_PRIMARY};
  margin-bottom: ${SPACING.MARGIN_LG};
  
  .ant-card-head {
    border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
    padding: ${SPACING.PADDING_LG};
    
    .ant-card-head-title {
      font-weight: ${FONT_WEIGHT.SEMIBOLD};
      color: ${COLORS.TEXT_PRIMARY};
      font-size: ${FONT_SIZE.LG};
    }
  }
  
  .ant-card-body {
    padding: ${SPACING.PADDING_LG};
  }
  
  .info-grid {
    display: flex;
    flex-direction: column;
    gap: 0;
    
    .info-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${SPACING.PADDING_MD} 0;
      border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
      
      &:last-child {
        border-bottom: none;
      }
      
      .info-label {
        display: flex;
        align-items: center;
        font-weight: ${FONT_WEIGHT.MEDIUM};
        color: ${COLORS.TEXT_SECONDARY};
        min-width: 140px;
        margin-right: ${SPACING.MARGIN_MD};
        font-size: ${FONT_SIZE.SM};
      }
      
      .info-value {
        color: ${COLORS.TEXT_PRIMARY};
        font-weight: ${FONT_WEIGHT.MEDIUM};
        flex: 1;
        text-align: right;
        font-size: ${FONT_SIZE.SM};
      }
    }
  }
  
  .allergy-tags {
    display: flex;
    flex-wrap: wrap;
    gap: ${SPACING.GAP_SM};
    margin-top: ${SPACING.MARGIN_MD};
  }
`

export const TreatmentCard = styled(Card)`
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  background: ${COLORS.BG_PRIMARY};
  margin-bottom: ${SPACING.MARGIN_LG};
  
  .ant-card-head {
    border-bottom: 1px solid ${COLORS.BORDER_SECONDARY};
    padding: ${SPACING.PADDING_LG};
    
    .ant-card-head-title {
      font-weight: ${FONT_WEIGHT.SEMIBOLD};
      color: ${COLORS.TEXT_PRIMARY};
      font-size: ${FONT_SIZE.LG};
    }
  }
  
  .ant-card-body {
    padding: ${SPACING.PADDING_LG};
  }
  
  .treatment-section {
    margin-bottom: ${SPACING.MARGIN_LG};
    
    .section-label {
      font-weight: ${FONT_WEIGHT.MEDIUM};
      color: ${COLORS.TEXT_SECONDARY};
      margin-bottom: ${SPACING.MARGIN_SM};
      font-size: ${FONT_SIZE.SM};
    }
    
    .medicine-list {
      display: flex;
      flex-wrap: wrap;
      gap: ${SPACING.GAP_SM};
      
      .medicine-tag {
        background: ${COLORS.BG_TERTIARY};
        border: 1px solid ${COLORS.BORDER_SECONDARY};
        border-radius: ${BORDER_RADIUS.SM};
        padding: ${SPACING.PADDING_XS} ${SPACING.PADDING_SM};
        font-size: ${FONT_SIZE.SM};
        color: ${COLORS.TEXT_PRIMARY};
      }
    }
  }
`

export const AllergyTag = styled(Tag)`
  background: ${COLORS.BG_PRIMARY};
  border: 1px solid ${COLORS.ERROR};
  color: ${COLORS.ERROR};
  border-radius: ${BORDER_RADIUS.SM};
  font-size: ${FONT_SIZE.SM};
  font-weight: ${FONT_WEIGHT.MEDIUM};
  padding: ${SPACING.PADDING_XS} ${SPACING.PADDING_SM};
  transition: ${TRANSITIONS.NORMAL};
  
  &:hover {
    background: ${COLORS.ERROR};
    color: ${COLORS.BG_PRIMARY};
    border-color: ${COLORS.ERROR};
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
    background: ${GRADIENTS.PRIMARY};
    border: 1px solid ${COLORS.PRIMARY};
    color: white;
    
    &:hover {
      background: ${GRADIENTS.PRIMARY_HOVER};
      transform: translateY(-1px);
      box-shadow: none;
      color: #fff;
      border-color: ${COLORS.PRIMARY_HOVER};
    }
  }
  
  &:not(.ant-btn-primary) {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.4);
      color: #ffffff;
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
    color: #1890ff;
  }
`

export const AddTreatmentButton = styled(Button)`
  border-radius: 8px;
  font-weight: 500;
  height: 40px;
  padding: 0 20px;
  background: ${GRADIENTS.PRIMARY};
  border: 1px solid ${COLORS.PRIMARY};
  color: white;
  
  &:hover {
    background: ${GRADIENTS.PRIMARY_HOVER};
    transform: translateY(-1px);
    box-shadow: none;
    color: #fff;
    border-color: ${COLORS.PRIMARY_HOVER};
  }
` 