import { Layout, Space, Typography } from 'antd'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTypedDispatch, useTypedSelector } from 'src/hooks'

import { userLogin } from '@store/features/auth/authActions'
import { RegisterTypes } from '@typess/types'
import { LoginValidate } from '@utils/validate'

import '../auth.scss'

export const Login = () => {
  const { loading, userInfo, error, success } = useTypedSelector(
    (state) => state.auth,
  )
  const dispatch = useTypedDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    // redirect authenticated user to profile screen
    // if (userInfo) navigate('/user-profile')
    // redirect user to login page if registration was successful
    if (userInfo) navigate('/')
  }, [navigate, userInfo])

  const submitForm = (data: RegisterTypes) => {
    dispatch(userLogin(data))
  }

  const initValuies: RegisterTypes = {
    email: '',
    password: '',
  }
  return (
    <div className="auth">
      <div className="auth-content">
        <div className="auth-content_wrapper">
          <Typography.Title level={3}>Zoo.Net</Typography.Title>
          <Typography.Title level={2}>Вход</Typography.Title>
          <Formik
            initialValues={initValuies}
            onSubmit={(values, { setSubmitting }) => {
              submitForm(values)
              setSubmitting(false)
            }}
            validationSchema={LoginValidate}
          >
            <Form className="auth-content_wrapper_form">
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
                  placeholder="Почта"
                />
              </Form.Item>
              <Form.Item
                name="password"
                hasFeedback={true}
                className="auth_item"
                showValidateSuccess={true}
              >
                <Input
                  type="password"
                  name="password"
                  bordered={false}
                  className="auth_item_input"
                  placeholder="Пароль"
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
              <Link
                to="/register"
                style={{ color: '#828282', textAlign: 'center' }}
              >
                Нет аккаунта?{' '}
                <span style={{ color: '#80DBA6' }}>Зарегистрируйтесь</span>
              </Link>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="auth_background"></div>
    </div>
  )
}
