import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";

export const NavBar = ({ drawerWidth }) => {
  const dispatch = useDispatch()
  const onLogout = ()=>{
    dispatch(startLogout())
  }

  // width hacemos un calculo en pantallas muy pequeñas
  //que sea igual al 100% del with menos el drawerWidth(ancho)

  //pantallas muy pequeñas el ml (margin left) va a ser igual a drawerWidth

  return (
    <AppBar
      position="fixed"
      sx={{ 
        width: { sm: `calc(100% - ${drawerWidth}px)`} ,
        ml:{sm: `${drawerWidth}px`}
    }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{mr:2, display:{sm:'none'}}}>
          <MenuOutlined />
        </IconButton>
        <Grid container direction='row' justifyContent="space-between" alignItems="center">
            <Typography variant="h6" noWrap component="div"> JournalApp </Typography>
            <IconButton color="error" onClick={onLogout}>
                <LogoutOutlined/>
            </IconButton>
            </Grid>
      </Toolbar>
    </AppBar>
  );
};
