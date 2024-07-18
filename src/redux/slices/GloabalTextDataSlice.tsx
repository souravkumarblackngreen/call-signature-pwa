import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Config {
  config: Record<string, any>; // Use Record<string, any> to represent an object with arbitrary keys and values
}
const initialState: Config = {
  config: {},
};
const globalTextDataSlice = createSlice({
  name: "configText",
  initialState,
  reducers: {
    // Define your slice reducers
    setConfigText: (state, action: PayloadAction<Config["config"]>) => {
      state.config = action.payload;
    },
    resetConfigState: () => initialState,
  },
});
export const { setConfigText, resetConfigState } = globalTextDataSlice.actions;
export default globalTextDataSlice.reducer;