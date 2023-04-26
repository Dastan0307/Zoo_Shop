import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CardsState }  from '../../../types/types';
import axios from 'axios';


const api = 'http://localhost:3000';

export const fetchCards = createAsyncThunk('card/fetchCards', async () => {
  const data = await axios.get(`${api}/products`);
  return data.data
});


const initialState: CardsState = {
  data: [],
  status: 'idle',
  error: null,
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = "succeeded";
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default cardSlice.reducer;