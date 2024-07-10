
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import homeReducer from './slices/HomeSlice';
import ProfileSlice from './slices/ProfileSlice';
import FilterSlice from './slices/FilterSlice';
import DashboardSlice from './slices/DashboardSlice';
import LoaderSlice from './slices/LoaderSlice';
import SignatureTabsSlice from './slices/SignatureTabsSlice';
import UserTypeSlice from './slices/UserTypeSlice';
import PrivacyPolicySlice from './slices/PrivacyPolicySlice';
import LanguageSlice from './slices/LanguageSlice';
import GloabalTextDataSlice from './slices/GloabalTextDataSlice';

const rootReducer = combineReducers({
  home: homeReducer,
  profile: ProfileSlice,
  filter: FilterSlice,
  dashboard: DashboardSlice,
  loader: LoaderSlice,
  signatureTabs: SignatureTabsSlice,
  user: UserTypeSlice,
  terms: PrivacyPolicySlice,
  lang: LanguageSlice,
  configText: GloabalTextDataSlice
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['lang','home','profile','dashboard','user','configText'] // Specify the slices you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
