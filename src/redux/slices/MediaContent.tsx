import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface MediaContent {
  
  mediaContent:MediaContentObj;
  
}
interface MediaContentObj {
  logo: string;
  splashScreenBg:string;
  callScreen:string;
  notch:string;

}

const initialState: MediaContent = {
  mediaContent:{logo:'',splashScreenBg:'',callScreen:'',notch:''},
};

const userSlice = createSlice({
  name: "mediaContent",
  initialState,
  reducers: {
    // Define your slice reducers
    
      setMediaContent:(state, action: PayloadAction<MediaContentObj>) => {
        state.mediaContent = action.payload;
      },
    resetUserState: () => initialState,
  },
});

export const { setMediaContent } =
  userSlice.actions;
export default userSlice.reducer;