// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'

import { AuthApi } from '@api/AuthApi'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { RegisterTypes } from '@typess/types'

export const userLogin = createAsyncThunk(
  'user/login',
  async (body: RegisterTypes, { rejectWithValue }) => {
    try {
      const data = await AuthApi.login(body)
      return data
    } catch (error: AxiosError | any) {
      return null
    }
  },
)
