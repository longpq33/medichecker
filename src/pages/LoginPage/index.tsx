import React from 'react'
import { Form, Input, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '@/hooks/useAuth'
import { StyledForm, StyledButton, StyledDivider, StyledLink } from './styled'

interface FormValues {
  email: string
  password: string
  remember: boolean
}

export const LoginPage: React.FC = () => {
  const { handleLogin, loginMutation } = useAuth()

  const onFinish = (values: unknown) => {
    const formValues = values as FormValues
    handleLogin({
      email: formValues.email,
      password: formValues.password,
    })
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
        Đăng nhập
      </h2>
      
      <StyledForm
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Mật khẩu"
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          <StyledLink to="/forgot-password" style={{ float: 'right' }}>
            Quên mật khẩu?
          </StyledLink>
        </Form.Item>

        <Form.Item>
          <StyledButton
            type="primary"
            htmlType="submit"
            loading={loginMutation.isLoading}
          >
            Đăng nhập
          </StyledButton>
        </Form.Item>
      </StyledForm>

      <StyledDivider>Hoặc</StyledDivider>

      <div style={{ textAlign: 'center' }}>
        <span>Chưa có tài khoản? </span>
        <StyledLink to="/register">Đăng ký ngay</StyledLink>
      </div>
    </div>
  )
} 