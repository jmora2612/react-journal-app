import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNote,
  setPhotoToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const notes = await loadNotes(uid);
    dispatch(setNote(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    //parametro opcional merge: sirve para validar si hay campos que estoy mandando, que no existen
    //en firestone, se mantienen
    await setDoc(docRef, noteToFireStore, { merge: true });
    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    //con este metodo disparo todas las promesas
    const photoUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotoToActiveNote(photoUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id))
  };
};
