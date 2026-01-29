/**
 * LoginForm (Módulo 9 - generado desde sketch/mockup).
 * Elementos reconocidos: formulario email/password, botón submit, layout centrado con card.
 * Usa Ant Design para consistencia con el proyecto.
 */
import React, { useState } from 'react'
import { Form, Input, Button, Card } from 'antd'
import type { FormProps } from 'antd'
import { useAuth } from '../../context/AuthContext'

interface LoginFormValues {
  email: string
  password: string
}

export function LoginForm() {
  const [form] = Form.useForm<LoginFormValues>()
  const { login, loading } = useAuth()

  const onFinish: FormProps<LoginFormValues>['onFinish'] = async (values) => {
    await login(values.email, values.password)
  }

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <Card title="Iniciar Sesión" style={{ maxWidth: 400, width: '100%' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Correo Electrónico"
            rules={[
              { required: true, message: 'Introduce tu correo' },
              { type: 'email', message: 'Correo no válido' },
            ]}
          >
            <Input placeholder="tu@email.com" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: 'Introduce tu contraseña' }]}
          >
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default LoginForm
