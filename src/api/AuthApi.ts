import { AxiosError } from 'axios'

import { RegisterTypes, UserData } from '@typess/types'
import { errorHandler } from '@utils/errorHandler'

import api from './index'

export class AuthApi {
  static async register(body: RegisterTypes) {
    try {
      return await api.post('account/', body)
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }
  static async login(body: RegisterTypes) {
    try {
      const res = await api.post<UserData>('login/', body)
      localStorage.setItem('access_token', res.data.access!)
      localStorage.setItem('refresh_token', res.data.refresh!)
      return res
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }
  static async recovery(body: RegisterTypes) {
    try {
      const data = await api.post('account/forgot_password/', body)
      return data
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }
  static async recoveryComplete(body: RegisterTypes) {
    try {
      const data = await api.post('account/forgot_password_complete/', body)
      return data
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }
  static async getCurrentUser(id: number) {
    try {
      const res = await api.get<UserData>(`account/${id}/`)
      return res
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }
}
