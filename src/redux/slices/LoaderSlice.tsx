import { createSlice } from '@reduxjs/toolkit';
interface LoadingState {
  isLoading: boolean;
}
const initialState: LoadingState = {
  isLoading: false,
};
const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    resetLoadingState: () => initialState,
  },
});
export const { startLoading, stopLoading, resetLoadingState } = loadingSlice.actions;
export default loadingSlice.reducer;