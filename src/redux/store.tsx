import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slices/HomeSlice';
import ProfileSlice from './slices/ProfileSlice';
import FilterSlice from './slices/FilterSlice';
import DashboardSlice from './slices/DashboardSlice';
import LoaderSlice from './slices/LoaderSlice';
import SignatureTabsSlice from './slices/SignatureTabsSlice';
import UserTypeSlice from './slices/UserTypeSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    profile:ProfileSlice,
    filter:FilterSlice,
    dashboard:DashboardSlice,
    loader:LoaderSlice,
    signatureTabs:SignatureTabsSlice,
    user:UserTypeSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
