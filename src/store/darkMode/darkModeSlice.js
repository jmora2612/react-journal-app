import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isDarkMode: false,
    themes: {
      light: {
        palette: {
          mode: 'light',
          // ... otras propiedades del tema claro
        },
      },
      dark: {
        palette: {
          mode: 'dark',
          // ... otras propiedades del tema oscuro
        },
      },
    },
  };

export const darkModeSlice = createSlice({
   name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});
// Action creators are generated for each case reducer function
export const { toggleDarkMode } = darkModeSlice.actions;
