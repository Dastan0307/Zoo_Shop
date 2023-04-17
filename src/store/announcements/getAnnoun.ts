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
import { AnnouncementTypes } from '@typess/types'

export const announcementApi = createApi({
  reducerPath: 'api/announcements',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://104.199.175.143/' }),
  endpoints: (builder) => ({
    getAnnouncement: builder.query<AnnouncementTypes, string>({
      query: (id) => `announcements/${id}`,
    }),
  }),
})

export const { useGetAnnouncementQuery } = announcementApi