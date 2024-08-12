import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface MediaContent {
  
  mediaContent:MediaContentObj;
  baseUrl:string;
  
}
interface MediaContentObj {
  logo: string;
  splashScreenBg:string;
  callScreen:string;
  notch:string;

}

const initialState: MediaContent = {
  mediaContent:{logo:'',splashScreenBg:'',callScreen:'',notch:''},
  baseUrl:'',
};

const userSlice = createSlice({
  name: "mediaContent",
  initialState,
  reducers: {
    // Define your slice reducers
    
      setMediaContent:(state, action: PayloadAction<MediaContentObj>) => {
        state.mediaContent = action.payload;
      },
      setBaseUrl:(state, action: PayloadAction<string>) => {
        state.baseUrl = action.payload;
      },
    resetUserState: () => initialState,
  },
});

export const { setMediaContent, setBaseUrl } =
  userSlice.actions;
export default userSlice.reducer;