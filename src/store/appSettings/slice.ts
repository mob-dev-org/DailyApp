import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Theme = 'dark' | 'light';
export type Language = 'bs-BA' | 'en-US';

export type AppSettings = {
    theme: Theme;
    language: Language;
};

const initialState = {
    theme: 'dark',
    language: 'bs-BA',
} as AppSettings;

export const appSettingsSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, { payload }: PayloadAction<Theme>) => {
            state.theme = payload;
        },
        setLanguage: (state, { payload }: PayloadAction<Language>) => {
            state.language = payload;
        },
        reset: () => initialState,
    },
});

export const { reset, setTheme, setLanguage } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
