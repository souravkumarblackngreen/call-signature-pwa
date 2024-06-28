import { createSlice } from '@reduxjs/toolkit';

interface HomeState {
  count: number;
  statusMessage:string;
  signatureMessage:string;
}

const initialState: HomeState = {
  count: 0,
  statusMessage:"hey, i m status",
  signatureMessage:"hey, i m signature"

};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = homeSlice.actions;

export default homeSlice.reducer;
