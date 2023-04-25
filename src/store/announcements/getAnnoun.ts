// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { AxiosError } from "axios";
// import instance from "src/api";

// export const getAnnoun = createAsyncThunk<Data, string, {rejectValue: string}>(
//   'posts/getPosts',
//   async (id, {rejectWithValue}) => {
//     try {
//       const res = await instance.get<Data>(`/announcements/${id}`);
//       return res
//     } catch (error: AxiosError | any) {
//       return rejectWithValue(error.message)
//     }
//   }
// )

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
  baseQuery: fetchBaseQuery({ baseUrl: 'https://enactusanimals.com' }),
  // refetchOnFocus: true,
  endpoints: (builder) => ({
    getAnnouncement: builder.query<AnnouncementTypes, string | undefined>({
      query: (id) => `/announcements/${id}/`, 
    }),
    getAnnouncements: builder.query<AnnouncementCardType[], AnnouncementFilterType>({
      query: (body) => ({
        url: '/announcements/',
        method: 'GET',
        params: body,
      }),
      keepUnusedDataFor: 30,
    }),
    getOrganizarions: builder.query<OrganizarionApiType, OrganizarionParamsType>({
      query: (body) => ({
        url: '/catalog/',
        method: 'GET',
        params: body && body,
      }),
      keepUnusedDataFor: 0,
    }),
  }),
})

export const {
  useGetAnnouncementQuery,
  useGetAnnouncementsQuery,
  useGetOrganizarionsQuery,
} = announcementApi
