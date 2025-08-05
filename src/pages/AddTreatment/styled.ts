import styled from 'styled-components'
import { Card, Form, Button, DatePicker, Typography } from 'antd'

const { Title: AntTitle } = Typography

export const StyledTitle = styled(AntTitle)`
  margin-bottom: 24px;
  text-align: center;
`

export const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
`

export const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`

export const FormSection = styled.div`
  margin-bottom: 32px;

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #1890ff;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #f0f0f0;
  }
`

export const MedicineItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: end;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  margin-bottom: 12px;
  position: relative;

  &:hover {
    background: #f0f8ff;
    border-color: #1890ff;
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
    top: 8px;
    right: 8px;
    color: #ff4d4f;

    &:hover {
      color: #ff7875;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;

    .medicine-select,
    .quantity-input,
    .unit-select,
    .frequency-select,
    .duration-select {
      grid-column: 1;
    }

    .remove-button {
      position: absolute;
      top: 8px;
      right: 8px;
    }
  }
`

export const AddMedicineButton = styled(Button)`
  width: 100%;
  height: 48px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  color: #666;
  font-weight: 500;

  &:hover {
    border-color: #1890ff;
    color: #1890ff;
  }
`

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`

export const PrimaryButton = styled(Button)`
  height: 40px;
  padding: 0 24px;
  font-weight: 500;
  border-radius: 6px;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border: none;
  color: white;

  &:hover {
    background: linear-gradient(135deg, #40a9ff 0%, #1890ff 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
  }
`

export const SecondaryButton = styled(Button)`
  height: 40px;
  padding: 0 24px;
  font-weight: 500;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  color: #666;
  background: white;

  &:hover {
    border-color: #1890ff;
    color: #1890ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

export const BackButton = styled(Button)`
  margin-bottom: 16px;
  height: 40px;
  padding: 0 16px;
  font-weight: 500;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  color: #666;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: #1890ff;
    color: #1890ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

export const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 24px;
  }

  .ant-form-item-label > label {
    font-weight: 500;
    color: #333;
  }

  .ant-input,
  .ant-select-selector,
  .ant-picker {
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    transition: all 0.3s;

    &:hover {
      border-color: #40a9ff;
    }

    &:focus,
    &.ant-input-focused,
    &.ant-select-focused .ant-select-selector {
      border-color: #1890ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }

  .ant-input-lg,
  .ant-select-lg .ant-select-selector,
  .ant-picker {
    height: 40px;
    font-size: 14px;
  }
`

// New styled components for inline styles
export const DatePickerStyled = styled(DatePicker)`
  width: 100%;
`

export const PrescriptionSummary = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 8px;
  font-size: 14px;
`

export const SummaryTitle = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  color: #52c41a;
`

export const SummaryItem = styled.div`
  margin-bottom: 4px;
`

export const SummaryMedicineName = styled.span`
  font-weight: 500;
`

export const SummaryDosageText = styled.span`
  margin-left: 8px;
  color: #666;
` 