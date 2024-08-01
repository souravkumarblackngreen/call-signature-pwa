import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface DashboardState {
  statusMessage:string;
  signatureMessage:string;
  globalShowModal:boolean;
  signatureId:number | null;
  statusId:number | null;
  isSignaturePublished:boolean;
  isStatusPublished:boolean;
}
const initialState: DashboardState = {
  statusMessage:"",
  signatureMessage:"",
  globalShowModal:false,
  signatureId:0,
  statusId:0,
  isSignaturePublished:false,
  isStatusPublished:false

};
const dashboareSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStatusMessage:(state, action: PayloadAction<string>) => {
        state.statusMessage = action.payload;
      },
      setSignatureMessage:(state, action: PayloadAction<string>) => {
        state.signatureMessage = action.payload;
      },
      setGlobalShowModal:(state, action: PayloadAction<boolean>) => {
        state.globalShowModal = action.payload;
      },
      setSignatureId:(state, action: PayloadAction<number>) => {
        state.signatureId = action.payload;
      },
      setStatusId:(state, action: PayloadAction<number>) => {
        state.statusId = action.payload;
      },
      setIsSignaturePublished:(state, action: PayloadAction<boolean>) => {
        state.isSignaturePublished = action.payload;
      },
      setIsStatusPublished:(state, action: PayloadAction<boolean>) => {
        state.isStatusPublished = action.payload;
      },
      resetDashboardState: () => initialState,
  },
});
export const { setStatusMessage, setSignatureId,setIsStatusPublished,setIsSignaturePublished,setStatusId,setSignatureMessage , setGlobalShowModal, resetDashboardState} = dashboareSlice.actions;
export default dashboareSlice.reducer;