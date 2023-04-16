// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { AxiosError } from "axios";
// import instance from "src/api";

type A = {
  id: number,
  image: string,
  announcement: string
}

export interface Pokemon {
  slug?: string,
  user?: string,
  photos: A[],
  title: string,
  price?: string,
  description: string,
  location: string,
  created_at: string,
  updated_at: string,
  views_count?: number,
  category: string
}

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
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const announcementApi = createApi({
  reducerPath: 'api/announcements',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://104.199.175.143/' }),
  endpoints: (builder) => ({
    getAnnouncement: builder.query<Pokemon, string>({
      query: (id) => `announcements/${id}`,
    }),
  }),
})

export const { useGetAnnouncementQuery } = announcementApi