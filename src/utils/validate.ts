import * as Yup from 'yup'

export const RegisterValidate = Yup.object({
  first_name: Yup.string().required('Обязательно'),
  email: Yup.string().email('Не валидная эл. почта').required('Обязательно'),
  password: Yup.string().required('Обязательно'),
  password_confirm: Yup.string()
    .required('Обязательно')
    .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
})

export const LoginValidate = Yup.object({
  email: Yup.string().email('Не валидная эл. почта').required('Обязательно'),
  password: Yup.string().required('Обязательно'),
})

export const EmailValidate = Yup.object({
  email: Yup.string().email('Не валидная эл. почта').required('Обязательно'),
})

export const RecoveryFinishValidate = Yup.object({
  code: Yup.string().required('Введите код потверждение'),
  email: Yup.string().email('Не валидная эл. почта').required('Обязательно'),
  password: Yup.string().required('Обязательно'),
  password_confirm: Yup.string()
  .required('Обязательно')
  .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
})
