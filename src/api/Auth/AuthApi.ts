import { AxiosError } from 'axios'

import { RegisterTypes } from '@typess/types'
import { errorHandler } from '@utils/errorHandler'

import api from '../index'

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
      const { data } = await api.post('login/', body)
      return data
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
}
