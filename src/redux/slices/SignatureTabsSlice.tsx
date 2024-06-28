import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignatureTabs {
    activeTab: string;
}

const initialState: SignatureTabs = {
    activeTab:'Signature'

};

const SignatureTabsSlice = createSlice({
  name: "signaturetabs",
  initialState,
  reducers: {
    setActiveTab:(state, action: PayloadAction<string>) => {
          state.activeTab = action.payload;
        },
   
    resetState: () => initialState,
  },
});

export const {
    setActiveTab,
} = SignatureTabsSlice.actions;

export default SignatureTabsSlice.reducer;
