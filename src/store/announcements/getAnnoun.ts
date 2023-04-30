import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  AnnouncementCardType,
  AnnouncementFilterType,
  AnnouncementTypes,
  OrganizarionApiType,
  OrganizarionParamsType,
} from '@typess/types'

export const announcementApi = createApi({
  reducerPath: 'announcementsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://zoonet.me' }),
  endpoints: (builder) => ({
    getAnnouncement: builder.query<AnnouncementTypes, string | undefined>({
      query: (id) => `/announcements/${id}/`,
    }),
    // getAnnouncements: builder.query<AnnouncementCardType[], AnnouncementFilterType>({
    //   query: (body) => ({
    //     url: '/announcements/',
    //     method: 'GET',
    //     params: {body},
    //   }),
    // }),
    // getOrganizarions: builder.query<OrganizarionApiType, OrganizarionParamsType>({
    //   query: (body?) => ({
    //     url: '/catalog/',
    //     method: 'GET',
    //     params: body && body,
    //   }),
    // }),
  }),
})

export const { useGetAnnouncementQuery } = announcementApi
