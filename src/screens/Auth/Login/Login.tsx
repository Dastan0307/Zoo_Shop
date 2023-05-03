import { Layout, Space, Typography } from 'antd'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTypedDispatch, useTypedSelector } from 'src/hooks'

import { AuthApi } from '@api/AuthApi'
import { userLogin } from '@store/features/auth/authActions'
import { setCredentials } from '@store/features/auth/authSlice'
import { RegisterTypes } from '@typess/types'
import { LoginValidate } from '@utils/validate'

import '../auth.scss'

export const Login = () => {
  const { loading, userInfo, error, success } = useTypedSelector((state) => state.auth)
  const dispatch = useTypedDispatch()

  const navigate = useNavigate()

  const submitForm = async (data: RegisterTypes) => {
    const res = await AuthApi.login(data)
    if (res?.status == 200) {
      toast.success('вы вошли как: ' + res.data?.first_name)
      dispatch(setCredentials(res.data))
      navigate('/')
    }
  }

  const initValuies: RegisterTypes = {
    email: '',
    password: '',
  }

  return (
    <motion.div
      className="auth"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
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
                  type="email"
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
              <Link to="/recovery">Забыли пароль?</Link>

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
              <Link to="/register" style={{ color: '#828282', textAlign: 'center' }}>
                Нет аккаунта? <span style={{ color: '#FFD02b' }}>Зарегистрируйтесь</span>
              </Link>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="auth_background"></div>
    </motion.div>
  )
}
