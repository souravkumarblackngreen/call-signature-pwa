import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface DashboardState {
  statusMessage:string;
  signatureMessage:string;
  globalShowModal:boolean;
  signatureId:number | null;
  statusId:number | null;
}
const initialState: DashboardState = {
  statusMessage:"",
  signatureMessage:"",
  globalShowModal:false,
  signatureId:0,
  statusId:0
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
      resetDashboardState: () => initialState,
  },
});
export const { setStatusMessage, setSignatureId,setStatusId,setSignatureMessage , setGlobalShowModal, resetDashboardState} = dashboareSlice.actions;
export default dashboareSlice.reducer;