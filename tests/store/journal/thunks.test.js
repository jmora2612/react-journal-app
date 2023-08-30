import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import {
  addNewEmptyNote,
  savingNewNote,
  setSaving,
} from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

describe("probando thunks de journal", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  test("debe de crear una nueva nota", async () => {
    const uid = "TEST-UID";
    getState.mockReturnValue({ auth: { uid } });
    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: '',
        title: '',
        imageUrls: [],
        date: expect.any(Number),
        id: expect.any(String)
      })

      
    );
    //borrar de firebase
    const collectionRef =collection(FirebaseDB, `${uid}/journal/notes`);
    const docs =await getDocs(collectionRef);
    const deletePromises = [];
    docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
    await Promise.all(deletePromises);
  });
});
