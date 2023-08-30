import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  checkingAuthentication,
  startGoogleSingIn,
  startLoginWithEmailPassword,
} from "../../store/auth";
import { useMemo } from "react";

const formData = {
  email: "",
  password: "",
}

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === "cheking", [status]);
  const { email, password, onInputChange, onResetForm } = useForm(formData);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(checkingAuthentication());
    dispatch(startLoginWithEmailPassword(email, password));
  };

  const onGoogleSingIn = (event) => {
    event.preventDefault();
    dispatch(startGoogleSingIn());
  };

  return (
    // grid podriamos verlo como un div

    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
            />
          </Grid>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{ mt: 2 }}
              display={!!errorMessage ? "" : "none"}
            >
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={onGoogleSingIn}
                disabled={isAuthenticating}
              >
                <Google /> <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear Cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

//sx aplicar estilos utilizando el sistema de diseño de estilo en línea
//para definir el tamaño de la pantalla xs sm md xl
