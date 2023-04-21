import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cardApi } from '../../../api/api';
import { CardsState }  from '../../../types/types';



export const fetchCards = createAsyncThunk('card/fetchCards', async () => {
  const data = await cardApi.fetchTodos();
  return data
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
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default cardSlice.reducer;