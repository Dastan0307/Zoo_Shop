import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthProps } from '@typess/types'

import { userLogin } from './authActions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState: AuthProps = {
  loading: false,
  userInfo: null,
  userToken: '',
  error: '',
  success: false,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.success = false
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers(builder) {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      userLogin.fulfilled,
      (state, action: PayloadAction<{ userToken: string }>) => {
        state.loading = false
        state.userInfo = action.payload
        state.userToken = action.payload.userToken
        state.success = true
      },
    )
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  },
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer
