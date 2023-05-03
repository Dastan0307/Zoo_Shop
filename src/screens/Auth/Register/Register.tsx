import { Typography } from 'antd'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AuthApi } from '@api/AuthApi'
import { RegisterTypes } from '@typess/types'
import { RegisterValidate } from '@utils/validate'

import '../auth.scss'

export const Register = () => {
  const navigate = useNavigate()
  const submitForm = async (data: RegisterTypes) => {
    const res = await AuthApi.register(data)
    if (res?.status) {
      toast.success('Регистрация успешно завершено', { delay: 0.3 })
      return navigate('/login')
    }
    return
  }

  const initValuies: RegisterTypes = {
    first_name: '',
    email: '',
    password: '',
    password_confirm: '',
  }
  return (
    <motion.div
      className="auth"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="auth-content">
        <div className="auth-content_wrapper">
          <Typography.Title level={3}>Zoo.Net</Typography.Title>
          <Typography.Title level={2}>Регистрация</Typography.Title>
          <Formik
            initialValues={initValuies}
            onSubmit={submitForm}
            validationSchema={RegisterValidate}
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
                name="first_name"
                hasFeedback={true}
                className="auth_item"
                showValidateSuccess={true}
                showInitialErrorAfterTouched={false}
              >
                <Input
                  name="first_name"
                  className="auth_item_input"
                  bordered={false}
                  placeholder="Имя"
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
              <Form.Item
                className="auth_item"
                name="password_confirm"
                hasFeedback={true}
                showValidateSuccess={true}
              >
                <Input
                  bordered={false}
                  className="auth_item_input"
                  type="password"
                  id="pwd"
                  name="password_confirm"
                  placeholder="Подтверждение пароля"
                />
              </Form.Item>
              <SubmitButton
                className="auth_submit"
                type="primary"
                style={{
                  height: '48px',
                  marginTop: '30px',
                  marginBottom: '16px',
                }}
              >
                Зарегистрироваться
              </SubmitButton>
              <Link to="/login" style={{ color: '#828282', textAlign: 'center' }}>
                Есть аккаунт? <span style={{ color: '#FFD02b' }}>Войдите</span>
              </Link>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="auth_background"></div>
    </motion.div>
  )
}
