import { Typography } from 'antd'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { AuthApi } from '@api/AuthApi'
import { RegisterTypes } from '@typess/types'
import { errorHandler } from '@utils/errorHandler'
import { EmailValidate } from '@utils/validate'

import '../auth.scss'
import './recovery.scss'

export const Recovery = () => {
  const navigate = useNavigate()

  const submitForm = async (data: RegisterTypes) => {
    const res = await AuthApi.recovery(data)
    if (res?.status == 200) {
      navigate('/recovery_finish')
    } else {
      errorHandler(res?.data)
    }
    // dispatch(registerUser(data))
  }

  const initValuies: RegisterTypes = {
    email: '',
  }
  return (
    <motion.div
      className="auth"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="auth-content">
        <div className="auth-content_wrapper">
          <Typography.Title level={3}>Zoo.Net</Typography.Title>
          <Typography.Title level={2}>Восстановление</Typography.Title>
          <Formik
            initialValues={initValuies}
            onSubmit={submitForm}
            validationSchema={EmailValidate}
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
    </motion.div>
  )
}
