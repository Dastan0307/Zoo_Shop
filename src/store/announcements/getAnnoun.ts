import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { announTypes } from '@screens/index'
import {
  AnnouncementCardType,
  AnnouncementFilterType,
  AnnouncementTypes,
  OrganizarionApiType,
  OrganizarionParamsType,
} from '@typess/types'

export const announcementApi = createApi({
  reducerPath: 'announcementsApi',
  keepUnusedDataFor: 10,
  refetchOnMountOrArgChange: 10,
  baseQuery: fetchBaseQuery({ baseUrl: 'https://zoointer.net' }),
  endpoints: (builder) => ({
    getAnnouncement: builder.query<AnnouncementTypes, string | undefined>({
      query: (id) => `/announcements/${id}/`,
    }),
    getAnnouncements: builder.query<announTypes, AnnouncementFilterType>({
      keepUnusedDataFor: 10,
      query: (body) => ({
        url: '/announcements/',
        method: 'GET',
        params: { ...body },
      }),
    }),
    getOrganizarions: builder.query<OrganizarionApiType, OrganizarionParamsType>({
      keepUnusedDataFor: 10,
      query: (body?) => ({
        url: '/catalog/',
        method: 'GET',
        params: body && body,
      }),
    }),
  }),
})

export const {
  useGetAnnouncementQuery,
  useGetAnnouncementsQuery,
  useGetOrganizarionsQuery,
} = announcementApi
