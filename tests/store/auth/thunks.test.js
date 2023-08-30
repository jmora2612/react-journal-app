import { singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startGoogleSingIn } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";
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

  test('startGoogleSingIn debe de llamar checkingCredential y login', async() => { 
    const loginDate = {ok: true, ...demoUser}
    await singInWithGoogle.mockResolvedValue(loginDate)

    //este es nuestro thunk
    await startGoogleSingIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginDate))
   })


   test('startGoogleSingIn debe de llamar checkingCredential y loguot', async() => { 
    const loginDate = {ok: false, errorMessage: 'Un error en google'}
    await singInWithGoogle.mockResolvedValue(loginDate)

    //este es nuestro thunk
    await startGoogleSingIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginDate.errorMessage))
   })
});
