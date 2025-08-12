import styled from 'styled-components'
import { Card, Form, Button, DatePicker, Typography } from 'antd'
import { 
  SPACING, 
  BORDER_RADIUS, 
  COLORS, 
  FONT_SIZE, 
  FONT_WEIGHT, 
  TRANSITIONS,
  BUTTON_STYLES,
  FORM_STYLES,
  GRADIENTS
} from '@/constants'

// Theme type definition
interface ThemeColors {
  bgPrimary?: string
  bgSecondary?: string
  bgTertiary?: string
  textPrimary?: string
  textSecondary?: string
  borderPrimary?: string
  borderSecondary?: string
  cardBg?: string
  cardBorder?: string
}

const { Title: AntTitle } = Typography

export const StyledTitle = styled(AntTitle)`
  margin-bottom: ${SPACING.MARGIN_XL};
  text-align: left;
  
  @media (max-width: 768px) {
    margin-bottom: ${SPACING.MARGIN_LG};
    font-size: ${FONT_SIZE.XL};
  }
`

export const StyledCard = styled(Card)<{ theme?: ThemeColors }>`
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  padding: ${SPACING.PADDING_XL};
  border: 1px solid ${props => props.theme?.borderPrimary || COLORS.BORDER_PRIMARY};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background: ${props => props.theme?.cardBg || 'transparent'};
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: ${SPACING.PADDING_MD};
  }
  
  @media (max-width: 480px) {
    padding: ${SPACING.PADDING_SM};
  }
`

export const FormContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
`

export const FormSection = styled.div<{ theme?: ThemeColors }>`
  margin-bottom: ${SPACING.MARGIN_XXL};
  width: 100%;
  max-width: 100%;
  /* overflow-x: hidden; */
  box-sizing: border-box;

  .section-title {
    font-size: ${FONT_SIZE.LG};
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    color: ${COLORS.PRIMARY};
    margin-bottom: ${SPACING.MARGIN_LG};
    padding-bottom: ${SPACING.PADDING_MD};
    border-bottom: 2px solid ${props => props.theme?.borderSecondary || COLORS.BORDER_SECONDARY};
  }
  
  @media (max-width: 768px) {
    margin-bottom: ${SPACING.MARGIN_LG};
    
    .section-title {
      font-size: ${FONT_SIZE.MD};
      margin-bottom: ${SPACING.MARGIN_MD};
    }
  }
`



export const MedicineItem = styled.div<{ theme?: ThemeColors }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${SPACING.GAP_SM};
  align-items: end;
  padding: ${SPACING.PADDING_LG};
  background: ${props => props.theme?.bgPrimary || COLORS.BG_PRIMARY};
  border-radius: ${BORDER_RADIUS.MD};
  border: 1px solid ${props => props.theme?.borderSecondary || COLORS.BORDER_SECONDARY};
  margin-bottom: ${SPACING.MARGIN_MD};
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${SPACING.GAP_XS};
    padding: ${SPACING.PADDING_MD};
  }

  .unit-price-input, .total-price-input {
    .ant-input-outlined {
      padding: 0 10px;
      
    }
   
  }

  .ant-input {
      height: 40px !important;
    }
`

export const AddMedicineButton = styled(Button)`
  width: 100%;
  height: 48px;
  border: 2px dashed ${COLORS.BORDER_PRIMARY};
  border-radius: ${BORDER_RADIUS.SM};
  color: ${COLORS.TEXT_SECONDARY};
  font-weight: ${FONT_WEIGHT.MEDIUM};
  margin-bottom: ${SPACING.MARGIN_MD};

  &:hover {
    border-color: ${COLORS.PRIMARY};
    color: ${COLORS.PRIMARY};
  }
`

export const ActionButtons = styled.div<{ theme?: ThemeColors }>`
  display: flex;
  justify-content: flex-end;
  gap: ${SPACING.GAP_MD};
  margin-top: ${SPACING.MARGIN_XXL};
  padding-top: ${SPACING.PADDING_XL};
  border-top: 1px solid ${props => props.theme?.borderSecondary || COLORS.BORDER_SECONDARY};
`

export const PrimaryButton = styled(Button)`
  height: ${BUTTON_STYLES.HEIGHT};
  padding: ${BUTTON_STYLES.PADDING};
  font-weight: ${BUTTON_STYLES.FONT_WEIGHT};
  border-radius: ${BUTTON_STYLES.BORDER_RADIUS};
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

export const SecondaryButton = styled(Button)<{ theme?: ThemeColors }>`
  height: ${BUTTON_STYLES.HEIGHT};
  padding: ${BUTTON_STYLES.PADDING};
  font-weight: ${BUTTON_STYLES.FONT_WEIGHT};
  border-radius: ${BUTTON_STYLES.BORDER_RADIUS};
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  color: ${props => props.theme?.textPrimary || COLORS.TEXT_PRIMARY};
  background: ${props => props.theme?.bgPrimary || COLORS.BG_PRIMARY};
  
  &:hover {
    border-color: ${COLORS.PRIMARY};
    color: ${COLORS.PRIMARY};
  }
`

export const BackButton = styled(Button)<{ theme?: ThemeColors }>`
  margin-bottom: ${SPACING.MARGIN_MD};
  height: ${BUTTON_STYLES.HEIGHT};
  padding: ${BUTTON_STYLES.PADDING};
  font-weight: ${BUTTON_STYLES.FONT_WEIGHT};
  border-radius: ${BUTTON_STYLES.BORDER_RADIUS};
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  color: ${props => props.theme?.textPrimary || COLORS.TEXT_PRIMARY};
  background: ${props => props.theme?.bgPrimary || COLORS.BG_PRIMARY};
  box-shadow: none;
  
  &:hover {
    border-color: #1890ff;
    color: #1890ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

export const StyledForm = styled(Form)<{ theme?: ThemeColors }>`
  .ant-form-item {
    margin-bottom: ${SPACING.MARGIN_SM};
  }

  .ant-form-item-label > label {
    font-weight: ${FONT_WEIGHT.MEDIUM};
    color: ${props => props.theme?.textPrimary || COLORS.TEXT_PRIMARY};
  }

  .ant-input,
  .ant-select-selector,
  .ant-picker {
    border-radius: ${BORDER_RADIUS.MD};
    border: 1px solid ${COLORS.BORDER_PRIMARY};
    transition: ${TRANSITIONS.NORMAL};
    height: ${FORM_STYLES.INPUT_HEIGHT};
    padding: ${FORM_STYLES.INPUT_PADDING};
    font-size: ${FORM_STYLES.INPUT_FONT_SIZE};

    &:hover {
      border-color: ${COLORS.PRIMARY_HOVER};
    }

    &:focus,
    &.ant-input-focused,
    &.ant-select-focused .ant-select-selector {
      border-color: ${COLORS.PRIMARY};
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    }
  }

  .ant-input-lg,
  .ant-select-lg .ant-select-selector,
  .ant-picker {
    height: ${FORM_STYLES.INPUT_HEIGHT};
    font-size: ${FORM_STYLES.INPUT_FONT_SIZE};
  }
`

// New styled components for inline styles
export const DatePickerStyled = styled(DatePicker)`
  width: 100%;
`

export const PrescriptionSummary = styled.div<{ theme?: ThemeColors }>`
  margin-top: ${SPACING.MARGIN_MD};
  padding: ${SPACING.PADDING_MD};
  background: ${props => props.theme?.bgPrimary || '#f6ffed'};
  border: 1px solid ${props => props.theme?.borderPrimary || '#b7eb8f'};
  border-radius: ${BORDER_RADIUS.SM};
  font-size: ${FONT_SIZE.SM};
`

export const SummaryTitle = styled.div<{ theme?: ThemeColors }>`
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
  margin-bottom: ${SPACING.MARGIN_SM};
  color: ${props => props.theme?.textPrimary || COLORS.SUCCESS};
`

export const SummaryItem = styled.div<{ theme?: ThemeColors }>`
  margin-bottom: ${SPACING.MARGIN_XS};
  color: ${props => props.theme?.textPrimary || 'inherit'};
`

export const SummaryMedicineName = styled.span<{ theme?: ThemeColors }>`
  font-weight: ${FONT_WEIGHT.MEDIUM};
  color: ${props => props.theme?.textPrimary || 'inherit'};
`

export const SummaryDosageText = styled.span<{ theme?: ThemeColors }>`
  margin-left: ${SPACING.MARGIN_SM};
  color: ${props => props.theme?.textSecondary || COLORS.TEXT_SECONDARY};
` ;

export const TreatmentAnalysisContainer = styled.div<{ $isFixed?: boolean }>`
  position: ${props => props.$isFixed ? 'sticky' : 'static'};
  top: ${props => props.$isFixed ? '80px' : 'auto'};
  right: ${props => props.$isFixed ? '20px' : 'auto'};
  width: ${props => props.$isFixed ? 'auto' : '100%'};
  z-index: ${props => props.$isFixed ? '1000' : 'auto'};
  max-height: ${props => props.$isFixed ? 'calc(100vh - 40px)' : 'none'};
  overflow-y: ${props => props.$isFixed ? 'auto' : 'visible'};
  transition: all 0.3s ease;
`