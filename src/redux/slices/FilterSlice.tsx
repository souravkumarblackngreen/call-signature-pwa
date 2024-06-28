import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterKeyWords {
    keywords: string[];
}

const initialState: FilterKeyWords = {
    keywords:['MTN', 'Earn', 'Win free']

};

const FilterKeyWordsSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setKeywords:(state, action: PayloadAction<string[]>) => {
          state.keywords = action.payload;
        },
   
    resetState: () => initialState,
  },
});

export const {
    setKeywords,
} = FilterKeyWordsSlice.actions;

export default FilterKeyWordsSlice.reducer;
