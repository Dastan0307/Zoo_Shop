import { Layout, Space, Typography } from 'antd'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTypedDispatch, useTypedSelector } from 'src/hooks'

import { AuthApi } from '@api/Auth/AuthApi'
import { RegisterTypes } from '@typess/types'
import { errorHandler } from '@utils/errorHandler'
import {
  EmailValidate,
  RecoveryFinishValidate,
  RegisterValidate,
} from '@utils/validate'

import '../auth.scss'
import './recovery.scss'

export const RecoveryFinish = () => {
  const navigate = useNavigate()

  const submitForm = async (data: RegisterTypes) => {
    const res = await AuthApi.recoveryComplete(data)
    if (res?.status == 200) {
      navigate('/login')
    } else {
      errorHandler(res?.data)
    }
    // dispatch(registerUser(data))
  }

  const initValuies: RegisterTypes = {
    code: '',
    password: '',
    email: '',
    password_confirm: '',
  }
  return (
    <div className="auth">
      <div className="auth-content">
        <div className="auth-content_wrapper">
          <Typography.Title level={3}>Zoo.Net</Typography.Title>
          <Typography.Title level={2}>Изменения пароля</Typography.Title>
          <Formik
            initialValues={initValuies}
            onSubmit={submitForm}
            validationSchema={RecoveryFinishValidate}
          >
            <Form className="auth-content_wrapper_form">
              <Form.Item
                className="auth_item"
                name="code"
                hasFeedback={true}
                showValidateSuccess={true}
              >
                <Input
                  name="code"
                  bordered={false}
                  className="auth_item_input"
                  placeholder="Код"
                />
              </Form.Item>
              <Form.Item
                className="auth_item"
                name="email"
                hasFeedback={true}
                showValidateSuccess={true}
              >
                <Input
                  name="email"
                  bordered={false}
                  className="auth_item_input"
                  placeholder="Введите почту"
                />
              </Form.Item>
              <Form.Item
                className="auth_item"
                name="password"
                hasFeedback={true}
                showValidateSuccess={true}
              >
                <Input
                  name="password"
                  type="password"
                  bordered={false}
                  className="auth_item_input"
                  placeholder="Введите почту"
                />
              </Form.Item>
              <Form.Item
                className="auth_item"
                name="password_confirm"
                hasFeedback={true}
                showValidateSuccess={true}
              >
                <Input
                  name="password_confirm"
                  type="password"
                  bordered={false}
                  className="auth_item_input"
                  placeholder="Введите почту"
                />
              </Form.Item>
              <SubmitButton
                type="primary"
                style={{
                  height: '48px',
                  marginTop: '30px',
                  marginBottom: '16px',
                }}
              >
                Войти
              </SubmitButton>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="auth_background_reset"></div>
    </div>
  )
}
