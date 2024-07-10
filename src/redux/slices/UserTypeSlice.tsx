import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface userType {
  user: string;
  token: string;
  refreshToken: string;
  userId: string;
  firstTimeModal:boolean;
  isHeaderEnrichment:boolean;
  phoneNumber:string;
  selectedPlan:string;
  mediaContent:MediaContentObj;
}
interface MediaContentObj {
  logo: string;
}

const initialState: userType = {
  user: "",
  token: "",
  userId: "",
  refreshToken: "",
  firstTimeModal:true,
  isHeaderEnrichment:false,
  phoneNumber:"",
  selectedPlan:"",
  mediaContent:{logo:''}
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Define your slice reducers
    setUserType: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setFirstTimeModal: (state, action: PayloadAction<boolean>) => {
        state.firstTimeModal = action.payload;
      },
    setIsHeaderEnrichment: (state, action: PayloadAction<boolean>) => {
        state.isHeaderEnrichment = action.payload;
      },
      setPhoneNumber:(state, action: PayloadAction<string>) => {
        state.phoneNumber = action.payload;
      },
      setSelectedPlan:(state, action: PayloadAction<string>) => {
        state.selectedPlan = action.payload;
      },
      setMediaContent:(state, action: PayloadAction<MediaContentObj>) => {
        state.mediaContent = action.payload;
      },
    resetUserState: () => initialState,
  },
});

export const { setUserType, setMediaContent,setPhoneNumber,setSelectedPlan,setToken, setUserId, resetUserState,setRefreshToken, setFirstTimeModal, setIsHeaderEnrichment } =
  userSlice.actions;
export default userSlice.reducer;
