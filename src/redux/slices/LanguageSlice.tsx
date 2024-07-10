import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageType {
    languageName: string;
    languageCode: string;
    charactersAllowed?: number;
    regex?: string;

}

interface LanguageState {
    lang?: string;
    languages: LanguageType[];
    charactersAllowed?: number;
    regex?: string;

}

const initialState: LanguageState = {
    lang: 'en',
    languages: []
};

const languageSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.lang = action.payload;
        },
        setLanguages: (state, action: PayloadAction<LanguageType[]>) => {
            state.languages = action.payload;
        },
    },
});

export const { setLanguage, setLanguages } = languageSlice.actions;
export default languageSlice.reducer;
