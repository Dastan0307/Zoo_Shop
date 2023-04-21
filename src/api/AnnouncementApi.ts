import { AxiosError } from 'axios'

import { AnnouncementFilterType, AnnouncementTypes, CategoriesType } from '@typess/types'
import { errorHandler } from '@utils/errorHandler'

import api from './index'

export class AnnouncementApi {
  static async getAnnouncement(body: AnnouncementFilterType) {
    try {
      const data = api.get('/announcements/', { params: body })
      return data
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }
}
