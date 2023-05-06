import { AxiosError } from 'axios'

import { errorHandler } from '@utils/errorHandler'

import api from './api'

export class FeedBack {
  static async send(message: string) {
    try {
      const data = api.post(
        '/forum/',
        { body: message },
        { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } },
      )
      return data
    } catch (error: AxiosError | any) {
      errorHandler
    }
  }
}
