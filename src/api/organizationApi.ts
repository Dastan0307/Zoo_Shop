import { AxiosError } from 'axios'

import { errorHandler } from '@utils/errorHandler'

import api from './api'

export const createAddress = async (body: object, id: number) => {
  try {
    const data = await api.get(`/account/${id}/add_address/`)
    return data
  } catch (error: AxiosError | any) {
    errorHandler(error)
  }
}
