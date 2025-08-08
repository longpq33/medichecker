import React from 'react'
import { Form, Input, Select, DatePicker, InputNumber } from 'antd'
import type { FormItemProps } from 'antd/es/form'
import type { InputProps } from 'antd/es/input'
import type { SelectProps } from 'antd/es/select'
import type { DatePickerProps } from 'antd/es/date-picker'
import type { InputNumberProps } from 'antd/es/input-number'

const { Option } = Select
const { TextArea } = Input

interface BaseFormFieldProps extends Omit<FormItemProps, 'children'> {
  type: 'input' | 'textarea' | 'select' | 'date' | 'number'
  placeholder?: string
  options?: Array<{ value: string | number; label: string }>
  inputProps?: InputProps
  selectProps?: SelectProps
  dateProps?: DatePickerProps
  numberProps?: InputNumberProps
  textareaProps?: React.ComponentProps<typeof TextArea>
}

export const FormField: React.FC<BaseFormFieldProps> = ({
  type,
  placeholder,
  options = [],
  inputProps,
  selectProps,
  dateProps,
  numberProps,
  textareaProps,
  ...formItemProps
}) => {
  const renderField = () => {
    switch (type) {
      case 'input':
        return <Input placeholder={placeholder} {...inputProps} />
      case 'textarea':
        return <TextArea placeholder={placeholder} rows={3} {...textareaProps} />
      case 'select':
        return (
          <Select placeholder={placeholder} {...selectProps}>
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )
      case 'date':
        return (
          <DatePicker
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            placeholder={placeholder}
            {...dateProps}
          />
        )
      case 'number':
        return (
          <InputNumber
            style={{ width: '100%' }}
            placeholder={placeholder}
            min={0}
            {...numberProps}
          />
        )
      default:
        return <Input placeholder={placeholder} {...inputProps} />
    }
  }

  return (
    <Form.Item {...formItemProps}>
      {renderField()}
    </Form.Item>
  )
} 