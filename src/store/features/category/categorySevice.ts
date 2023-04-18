import { API_URL } from '@api/index'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { CategoriesType } from './../../../types/types'

export const categoryApi = createApi({
  reducerPath: 'category',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    // baseUrl: 'http://127.0.0.1:5000/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
  endpoints: (build) => ({
    getCategories: build.query<CategoriesType, string>({
      query: () => `/categories/`,
    }),
  }),
})

// export react hook
export const { useGetCategoriesQuery } = categoryApi
