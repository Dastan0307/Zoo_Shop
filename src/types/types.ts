export interface AuthProps {
  loading?: boolean
  userInfo?: UserData | null
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

=======
export interface UserData {
  about_user: string
  access: string
  date_joined: string
  email: string
  first_name: string
  id: number
  last_name: string
  phone_number: string
  refresh: string
  telegram_url: string
  username: string
}
export interface AnnouncementTypes {
  slug?: string
  user?: string
  photos?: [
    {
      id: number
      image: string
      announcement: string
    },
  ]
  title: string
  price?: string
  description: string
  location: string
  created_at?: string
  updated_at?: string
  views_count?: number
  category: string
}

export type CategoriesType = {
  count: number
  next: null | number
  previous: null | number
  results: CategoryType[]
}

