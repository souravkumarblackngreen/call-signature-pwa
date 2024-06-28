import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DashboardState {
  statusMessage:string;
  signatureMessage:string;
  globalShowModal:boolean

}

const initialState: DashboardState = {
  statusMessage:"hey, i m status",
  signatureMessage:"hey, i m signature",
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
   
  },
});

export const { setStatusMessage, setSignatureMessage , setGlobalShowModal} = dashboareSlice.actions;

export default dashboareSlice.reducer;
