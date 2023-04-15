// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'

import { AuthApi } from '@api/Auth/AuthApi'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { RegisterTypes } from '@typess/types'

export const userLogin = createAsyncThunk(
  'user/login',
  async (body: RegisterTypes, { rejectWithValue }) => {
    try {
      const data = await AuthApi.login(body)
      return data
    } catch (error: AxiosError | any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)
