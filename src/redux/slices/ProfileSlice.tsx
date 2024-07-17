import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProfileState {
    SubscriptionPlan: string;
    SubscriptionDate: string;
    NextRenewal: string;
    PhoneNo: string;
}

const initialState: ProfileState = {
    SubscriptionPlan: 'Monthly',
    SubscriptionDate: '24/12/2024',
    NextRenewal: '24/1/2025',
    PhoneNo: '+91 9876543210'
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setSubscriptionPlan: (state, action: PayloadAction<string>) => {
            state.SubscriptionPlan = action.payload;
        },
        setNextRenewal: (state, action: PayloadAction<string>) => {
            state.NextRenewal = action.payload;
        },
        setSubscriptionDate: (state, action: PayloadAction<string>) => {
            state.SubscriptionDate = action.payload;
        },
        setPhoneNo: (state, action: PayloadAction<string>) => {
            state.PhoneNo = action.payload;
        },
        resetProfileState: () => initialState,
    },
});

export const { setSubscriptionPlan, setNextRenewal, setSubscriptionDate, setPhoneNo, resetProfileState } = profileSlice.actions;

export default profileSlice.reducer;
