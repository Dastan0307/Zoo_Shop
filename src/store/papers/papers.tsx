import { errorHandler } from '@utils/errorHandler'
import api from '../../api/index'
import { AxiosError } from 'axios'

export async function getNews() {
  try {
    const res = await api.get('news')
    return res.data
  } catch (error: AxiosError | any) {
    errorHandler(error)
  }
}

