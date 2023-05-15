import { API_URL } from '@api/index'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { CategoriesType } from './../../../types/types'

export const categoryApi = createApi({
  reducerPath: 'category',
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getCategories: build.query<CategoriesType, string>({
      query: () => `/categories/`,
    }),
  }),
})

// export react hook
export const { useGetCategoriesQuery } = categoryApi
