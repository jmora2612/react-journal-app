import {
  logoutFirebase,
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  singInWithGoogle,
} from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSingIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import {
  demoUser,
  demoUserWithEmailPassword,
} from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe("pruebas en authThunks", () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  test("debe ejecutar checkingCredentials", async () => {
    // checkingCredentials()
    // checkingAuthentication

    /// primer () es el llamado de la funcion
    // segundo () es el valor de retorno de la funcion
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSingIn debe de llamar checkingCredential y login", async () => {
    const loginData = { ok: true, ...demoUser };
    await singInWithGoogle.mockResolvedValue(loginData);

    //este es nuestro thunk
    await startGoogleSingIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSingIn debe de llamar checkingCredential y loguot", async () => {
    const loginData = { ok: false, errorMessage: "Un error en google" };
    await singInWithGoogle.mockResolvedValue(loginData);

    //este es nuestro thunk
    await startGoogleSingIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login", async () => {
    const loginData = { ok: true, ...demoUserWithEmailPassword };

    let formData = {
      displayName: demoUser.displayName,
      email: demoUser.email,
      password: demoUser.password,
    };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);
    await startCreatingUserWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    formData = { ...formData, uid: demoUser.uid, photoURL: demoUser.photoURL };
    expect(dispatch).toHaveBeenCalledWith(login(formData));
  });

  test("startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

});
