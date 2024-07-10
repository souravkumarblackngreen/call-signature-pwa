import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DashboardState {
  statusMessage:string;
  signatureMessage:string;
  globalShowModal:boolean;
  signatureId:number | null;
  statusId:number | null;

}

const initialState: DashboardState = {
  statusMessage:"hey, i m status",
  signatureMessage:"hey, i m signature",
  signatureId:null,
  statusId:null,
  globalShowModal:false,


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
   
  },
});

export const { setStatusMessage, setSignatureId,setStatusId,setSignatureMessage , setGlobalShowModal} = dashboareSlice.actions;

export default dashboareSlice.reducer;
