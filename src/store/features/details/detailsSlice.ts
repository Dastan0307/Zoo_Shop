import axios from 'axios'

import { API_URL } from '@api/index'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { CardsState } from '../../../types/types'

export const fetchCards = createAsyncThunk('card/fetchCards', async () => {
  try {
    const data = await axios.get(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    })
    console.log(data);
    
    return data.data
  } catch (error) {
    console.log(error)
  }
})

const initialState: CardsState = {
  data: [],
  status: 'idle',
  error: null,
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'succeeded'
    })
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error as string
    })
  },
})

export default cardSlice.reducer
