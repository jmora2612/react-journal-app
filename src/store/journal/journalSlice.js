import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSave: "",
    notes: [],
    active: null,
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSave = "";
    },
    setNote: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSave = "";
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((el) => {
        if (el.id === action.payload.id) {
          return action.payload;
        }
        return el;
      });
      state.messageSave = `${action.payload.title}, actualizada correctamente`;
    },
    deleteNoteById: (state, action) => {
      state.active = null
      state.notes = state.notes.filter((el) => el.id !== action.payload)
    },
    setPhotoToActiveNote:(state, action)=>{
        state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
        state.isSaving = false;
    },
    clearNotesLogout:(state)=>{
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null
    }
    
  },
});
// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  setActiveNote,
  setNote,
  setSaving,
  updateNote,
  deleteNoteById,
  savingNewNote,
  setPhotoToActiveNote,
  clearNotesLogout,
} = journalSlice.actions;
