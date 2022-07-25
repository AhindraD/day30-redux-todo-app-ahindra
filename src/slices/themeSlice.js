import { createSlice } from '@reduxjs/toolkit'


const themeSlice = createSlice({
    name: 'mode',
    initialState: {
        theme: 'dark',
    },
    reducers: {
        toggleTheme: (state, action) => {
            if (state.theme === 'dark') {
                state.theme = 'light';
            }
            else {
                state.theme = 'dark';
            }
        },
    }
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;