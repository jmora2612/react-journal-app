import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { journalSlice } from './journal'
import { darkModeSlice } from './darkMode/darkModeSlice'

export const store = configureStore({
  reducer: {

    auth: authSlice.reducer,
    journal: journalSlice.reducer,
    darkMode: darkModeSlice.reducer
  },
})