import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState,
} from "../../fixtures/authFixtures";

describe("pruebas en authSlice", () => {
  test("debe de regresar el estado inicial y llamarse auth ", () => {
    const state = authSlice.reducer(initialState, {});
    expect(authSlice.name).toBe("auth");
    expect(state).toEqual(initialState);
  });

  test("debe realizar la autenticacion", () => {
    const state = authSlice.reducer(authenticatedState, login(demoUser));
    expect(state).toEqual({
      status: "authenticated",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("debe realizar logout y mostrar mensaje de error", () => {
    const errorMessage = 'Credenciales no son correctas'
    const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage,
    });
  });

  test('debe de cambiar el estado a cheking', () => { 
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe("checking")

   })
});
