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

const { Title: AntTitle } = Typography

export const StyledTitle = styled(AntTitle)`
  margin-bottom: ${SPACING.MARGIN_XL};
  text-align: center;
  
  @media (max-width: 768px) {
    margin-bottom: ${SPACING.MARGIN_LG};
    font-size: ${FONT_SIZE.XL};
  }
`

export const StyledCard = styled(Card)`
  border-radius: ${BORDER_RADIUS.LG};
  box-shadow: none;
  padding: ${SPACING.PADDING_XL};
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
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
`

export const FormSection = styled.div`
  margin-bottom: ${SPACING.MARGIN_XXL};

  .section-title {
    font-size: ${FONT_SIZE.LG};
    font-weight: ${FONT_WEIGHT.SEMIBOLD};
    color: ${COLORS.PRIMARY};
    margin-bottom: ${SPACING.MARGIN_LG};
    padding-bottom: ${SPACING.PADDING_MD};
    border-bottom: 2px solid ${COLORS.BORDER_SECONDARY};
  }
  
  @media (max-width: 768px) {
    margin-bottom: ${SPACING.MARGIN_LG};
    
    .section-title {
      font-size: ${FONT_SIZE.MD};
      margin-bottom: ${SPACING.MARGIN_MD};
    }
  }
`

export const MedicineItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${SPACING.GAP_SM};
  align-items: end;
  padding: ${SPACING.PADDING_LG};
  background: ${COLORS.BG_PRIMARY};
  border-radius: ${BORDER_RADIUS.MD};
  border: 1px solid ${COLORS.BORDER_SECONDARY};
  margin-bottom: ${SPACING.MARGIN_MD};
  position: relative;
  transition: ${TRANSITIONS.NORMAL};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  &:hover {
    background: ${COLORS.BG_TERTIARY};
    border-color: ${COLORS.PRIMARY};
  }

  .medicine-select {
    grid-column: 1 / -1;
  }

  .quantity-input {
    grid-column: 1;
  }

  .unit-select {
    grid-column: 2;
  }

  .frequency-select {
    grid-column: 1;
  }

  .duration-select {
    grid-column: 2;
  }

  .remove-button {
    position: absolute;
    top: ${SPACING.MARGIN_MD};
    right: ${SPACING.MARGIN_MD};
    color: ${COLORS.ERROR};

    &:hover {
      color: ${COLORS.ERROR_HOVER};
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${SPACING.GAP_MD};
    padding: ${SPACING.PADDING_MD};

    .medicine-select,
    .quantity-input,
    .unit-select,
    .frequency-select,
    .duration-select {
      grid-column: 1;
    }
  }
  
  @media (max-width: 480px) {
    padding: ${SPACING.PADDING_SM};
    gap: ${SPACING.GAP_SM};
  }
`

export const AddMedicineButton = styled(Button)`
  width: 100%;
  height: 48px;
  border: 2px dashed ${COLORS.BORDER_PRIMARY};
  border-radius: ${BORDER_RADIUS.SM};
  color: ${COLORS.TEXT_SECONDARY};
  font-weight: ${FONT_WEIGHT.MEDIUM};

  &:hover {
    border-color: ${COLORS.PRIMARY};
    color: ${COLORS.PRIMARY};
  }
`

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${SPACING.GAP_MD};
  margin-top: ${SPACING.MARGIN_XXL};
  padding-top: ${SPACING.PADDING_XL};
  border-top: 1px solid ${COLORS.BORDER_SECONDARY};
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

export const SecondaryButton = styled(Button)`
  height: ${BUTTON_STYLES.HEIGHT};
  padding: ${BUTTON_STYLES.PADDING};
  font-weight: ${BUTTON_STYLES.FONT_WEIGHT};
  border-radius: ${BUTTON_STYLES.BORDER_RADIUS};
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  color: ${COLORS.TEXT_PRIMARY};
  background: ${COLORS.BG_PRIMARY};
  
  &:hover {
    border-color: ${COLORS.PRIMARY};
    color: ${COLORS.PRIMARY};
  }
`

export const BackButton = styled(Button)`
  margin-bottom: ${SPACING.MARGIN_MD};
  height: ${BUTTON_STYLES.HEIGHT};
  padding: ${BUTTON_STYLES.PADDING};
  font-weight: ${BUTTON_STYLES.FONT_WEIGHT};
  border-radius: ${BUTTON_STYLES.BORDER_RADIUS};
  border: 1px solid ${COLORS.BORDER_PRIMARY};
  color: ${COLORS.TEXT_PRIMARY};
  background: ${COLORS.BG_PRIMARY};
  box-shadow: none;
  
  &:hover {
    border-color: #1890ff;
    color: #1890ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

export const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: ${SPACING.MARGIN_SM};
  }

  .ant-form-item-label > label {
    font-weight: ${FONT_WEIGHT.MEDIUM};
    color: ${COLORS.TEXT_PRIMARY};
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

export const PrescriptionSummary = styled.div`
  margin-top: ${SPACING.MARGIN_MD};
  padding: ${SPACING.PADDING_MD};
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: ${BORDER_RADIUS.SM};
  font-size: ${FONT_SIZE.SM};
`

export const SummaryTitle = styled.div`
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
  margin-bottom: ${SPACING.MARGIN_SM};
  color: ${COLORS.SUCCESS};
`

export const SummaryItem = styled.div`
  margin-bottom: ${SPACING.MARGIN_XS};
`

export const SummaryMedicineName = styled.span`
  font-weight: ${FONT_WEIGHT.MEDIUM};
`

export const SummaryDosageText = styled.span`
  margin-left: ${SPACING.MARGIN_SM};
  color: ${COLORS.TEXT_SECONDARY};
` 