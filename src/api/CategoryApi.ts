
import { AxiosError } from 'axios'

import { errorHandler } from '@utils/errorHandler'

import api from './index'

export class CategoryApi {
  static async getCategories() {
    try {
      const data = await api.get('/categories/')
      return data
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }
}
