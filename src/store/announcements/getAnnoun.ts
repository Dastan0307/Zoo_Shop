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
  AnnouncementApiCardType,
  AnnouncementFilterType,
  AnnouncementTypes,
} from '@typess/types'

export const announcementApi = createApi({
  reducerPath: 'announcementsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://104.199.175.143/' }),

  endpoints: (builder) => ({
    getAnnouncement: builder.query<AnnouncementTypes, string | undefined>({
      query: (id) => `/announcements/${id}/`,
    }),
    getAnnouncements: builder.query<AnnouncementApiCardType, AnnouncementFilterType>({
      query: (body) => ({
        url: '/announcements/',
        method: 'GET',
        params: body,
      }),
      keepUnusedDataFor: 30,
    }),
    getOrganizarions: builder.query<AnnouncementApiCardType[], AnnouncementFilterType>({
      query: (body) => ({
        url: '/announcements/',
        method: 'GET',
        params: body,
      }),
      keepUnusedDataFor: 30,
    }),
  }),
})

export const { useGetAnnouncementQuery, useGetAnnouncementsQuery } = announcementApi
