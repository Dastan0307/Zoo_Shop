import { AxiosError } from 'axios'

import { announTypes, orgsTypes } from '@screens/index'
import {
  AnnouncementCardType,
  AnnouncementFilterType,
  OrganizarionApiType,
  OrganizarionParamsType,
} from '@typess/types'
import { errorHandler } from '@utils/errorHandler'

import api from './index'

export class AnnouncementApi {
  static async getAnnouncement(body: AnnouncementFilterType) {
    try {
      const data = api.get<announTypes>('/announcements/', { params: body })
      return data
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }
  static async getOrganization(body: OrganizarionParamsType) {
    try {
      const data = api.get<orgsTypes>('/catalog/', { params: body })
      return data
    } catch (error: AxiosError | any) {
      errorHandler(error)
    }
  }
}
