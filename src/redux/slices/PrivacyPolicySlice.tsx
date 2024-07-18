import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface PrivacyPolicy {
    privacyPolicy: string;
    termsncondition:string;
}
const initialState: PrivacyPolicy = {
    privacyPolicy:'',
    termsncondition:''
};
const PrivacyPolicySlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPrivacy:(state, action: PayloadAction<string>) => {
          state.privacyPolicy = action.payload;
        },
        setTerms:(state, action: PayloadAction<string>) => {
            state.termsncondition = action.payload;
          },
   
    resetPrivacyPolicyState: () => initialState,
  },
});
export const {
    setPrivacy,setTerms,resetPrivacyPolicyState
} = PrivacyPolicySlice.actions;
export default PrivacyPolicySlice.reducer;