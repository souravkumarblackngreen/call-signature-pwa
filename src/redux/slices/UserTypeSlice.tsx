import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserType {
  user: string;
  token: string;
  refrToken: string;
  userId: string;
  firstTimeModal:boolean;
  isHeaderEnrichment:boolean;
  phoneNumber:string;
  selectedPlan:string;
  regax:object;
}

const initialState: UserType = {
  user: "",
  token: "",
  userId: "",
  refrToken: "",
  firstTimeModal:true,
  isHeaderEnrichment:false,
  phoneNumber:"",
  selectedPlan:"",
  regax:{
  }

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
      state.refrToken = action.payload;
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
      setRegax:(state,action:PayloadAction<object>)=>{
        state.regax=action.payload
      },
    resetUserState: () => initialState,
  },
});

export const { setUserType,setPhoneNumber,setSelectedPlan,setToken, setUserId, setRegax,resetUserState,setRefreshToken, setFirstTimeModal, setIsHeaderEnrichment } =
  userSlice.actions;
export default userSlice.reducer;