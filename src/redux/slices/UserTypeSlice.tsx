import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Regax {
  MIN_MOBILE_NO_LENGTH: string;
  MOBILE_NO_REGEX_INDI:string;
}

interface UserType {
  user: string;
  token: string;
  refrToken: string;
  userId: string;
  firstTimeModal:boolean;
  isHeaderEnrichment:boolean;
  phoneNumber:string;
  selectedPlan:string;
  regax:Regax;
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
    MIN_MOBILE_NO_LENGTH:'',
    MOBILE_NO_REGEX_INDI:''
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
      setRegax:(state,action:PayloadAction<Regax>)=>{
        state.regax=action.payload
      },
    resetUserState: () => initialState,
  },
});

export const { setUserType,setPhoneNumber,setSelectedPlan,setToken, setUserId, setRegax,resetUserState,setRefreshToken, setFirstTimeModal, setIsHeaderEnrichment } =
  userSlice.actions;
export default userSlice.reducer;