import { Box, Toolbar } from "@mui/material"
import { SideBar, NavBar } from "../components";

//con esto vamos a asignar el tamaño
const drawerWidth = 240;

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display:"flex"}} className="animate__animated animate__fadeIn animate__faster">
        <NavBar drawerWidth={drawerWidth}/>
        <SideBar drawerWidth={drawerWidth}/>
    <Box
    component="main"
    sx={{flexGrow:1, p:2}}
    >
        <Toolbar/>
        {children}
    </Box>
    </Box>
  )
}
