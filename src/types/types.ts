export interface AuthProps {
  loading?: boolean
  userInfo: UserData | null
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
  group: []
  activation_code: string
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  last_login: string
  password: string
  image: string
  user_permissions: []
  users_announsments: AnnouncementTypes[]
}

export interface AnnouncementTypes {
  slug?: string | undefined
  user?: string | undefined
  photos: [
    {
      id: number | undefined
      image: string | undefined
      announcement: string | undefined
      image_url: string | undefined
    },
  ]
  title: string | undefined
  price?: string | undefined
  description: string | undefined
  phone_number: string | undefined
  location: string | undefined
  created_at?: string | undefined
  updated_at?: string | undefined
  views_count?: number | undefined
  category: string | undefined
  user_name: string | undefined
  user_photo: string | null
}

export type CategoriesType = {
  count: number
  next: null | number
  previous: null | number
  results: CategoryType[]
}

export interface CategoryType {
  created_at: string
  description: string
  slug: string
  title: string
  updated_at: string
}

export interface OrgParams {
  location?: string
  search?: string
  adress_type?: string
}

export interface AnnouncementFilterType {
  titie?: string
  location?: string
  category?: string
  lower_price?: string
  higher_price?: string
  search?: string
  ordering?: string
  page?: number
}

export interface AnnouncementApiCardType {
  count: number
  next: null | number | string
  previous: null | number | string
  results: AnnouncementCardType[]
}

export interface AnnouncementCardType {
  category?: string
  created_at?: string
  description?: string
  location?: string
  price?: string
  slug?: string
  user_name: string
  photos: { announcement: string; id: number; image: string; image_url: string }[]
  title?: string
  updated_at?: string
  user?: number
  views_count?: number
  id?: number
  img?: string
  ageGender?: string
  user_photo?: string
}

export interface CardType {
  id: number
  img: string
  ageGender: string
  description: string
  price: number
  title: string
}

export interface CardsState {
  data: CardType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

interface PasswordState {
  old_password: string
  new_password: string
  new_password_confirm: string
  data: []
  isLoading: boolean
  error: string | null
}

export const initialState: PasswordState = {
  old_password: '',
  new_password: '',
  new_password_confirm: '',
  data: [],
  isLoading: false,
  error: null,
}

export interface OrganizarionType {
  id: number
  user: string
  adress: string
  adress_type: string
  title: string
  verified_adress: boolean
  image: string
  phone_number: string
  location: string
}

export interface OrganizarionApiType {
  count: number
  next: string
  previous: string
  results: OrganizarionType[]
}

export interface OrganizarionParamsType {
  adress_type?: string
  location?: string
  test?: string
}

export interface PostAnnouncementTypes {
  slug?: string
  user?: string
  photos?: [
    {
      id: number
      announcement: string
      image: string
      image_url: string
    },
  ]
  title: string
  price?: string
  description: string
  phone_number: string
  location: string
  created_at?: string
  updated_at?: string
  views_count?: number
  category: string
  user_name: string
  user_photo: string
}

export interface ShortDescription {
  id: number
  slug: string
  title: string
  body: string
  image: string
  short_description: string
}

export interface News {
  count: number
  next: string
  previous: string
  results: ShortDescription[]
}

export interface FavoritesType {
  announcement: string
  announsment: FavoritesAnnounsmentType
  id: string
  is_favorite: boolean
  user: number
  photos: {
    id: number,
    announcement: string,
    image: string,
    image_url: string,
  }[]
}

export interface FavoritesAnnounsmentType {
  category: string
  created_at: string
  description: string
  location: string
  phone_number: string
  price: string
  rating?: number
  slug: string
  title: string
  updated_at: string
  user: number
  user_name: string
  user_photo: string
  views_count: number
  photos?: [
    {
      id: number
      announcement: string
      image: string
      image_url: string
    },
  ]
}
