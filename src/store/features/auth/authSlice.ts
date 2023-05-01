import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { changeName } from '@store/EditUser/editSlice'
import { AuthProps, UserData } from '@typess/types'

import { userLogin } from './authActions'

// initialize userToken from local storage
// const userToken = localStorage.getItem('userToken')
//   ? localStorage.getItem('userToken')
//   : null

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
      localStorage.removeItem('access_token') // delete token from storage
      localStorage.removeItem('refresh_token') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.success = false
    },
    setCredentials: (state, action: PayloadAction<UserData>) => {
      state.userInfo = action.payload
    },
  },
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer
