import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth";

import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

//de esta manera pasamos nuestro store de nuestro estado en nuestra prueba
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  //de esta manera precargamos el estado inicial que necesitamos
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

const mockStartGoogleSingIn = jest.fn();

const mockCheckingAuthentication = jest.fn();

const mockStartLoginWithEmailPassword = jest.fn();


jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSingIn: () => mockStartGoogleSingIn,
  checkingAuthentication: () => mockCheckingAuthentication,
  startLoginWithEmailPassword: (email, password) => {
    return () => mockStartLoginWithEmailPassword(email, password);
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  //con esto indicamos que al llamar el useDispatch va a devolver esa funcion

  useDispatch: () => (fn) => fn(),
}));

describe("pruebas en LoginPage", () => {
  beforeEach(() => jest.clearAllMocks());
  test("debe de mostrar el componente correctamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("boton de google debe de llamar el startGoogleSingIn ", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText("google-btn");
    fireEvent.click(googleBtn);

    expect(mockStartGoogleSingIn).toHaveBeenCalled();
  });

  test("submit debe de llamar startLoginWithEmailPassword", () => {
    const email = "jessi@gmail.com";
    const password = "1234";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", { name: "Correo" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const loginForm = screen.getByLabelText("submit-form");
    fireEvent.submit(loginForm);

    expect(mockCheckingAuthentication).toHaveBeenCalled();
    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith(
      email,
      password
    );
  });
});
