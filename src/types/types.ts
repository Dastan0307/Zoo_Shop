export interface AuthProps {
  loading?: boolean
  userInfo?: object | null | unknown
  userToken?: string | null | unknown
  error?: string | null | unknown
  success?: boolean
}

export interface RegisterTypes {
  code?: string
  email?: string
  password?: string
  password_confirm?: string
  first_name?: string
  last_name?: string
  telegram_url?: string
  about_user?: string
  phone_number?: string
}

export interface loginProps {
  email: string
  password: string
}
