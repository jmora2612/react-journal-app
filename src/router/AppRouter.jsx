import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui";
import { useCheckAtuh } from "../hooks";
import { AppTheme } from "../theme";

export const AppRouter = () => {
  const status = useCheckAtuh();

  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (

    ///ejemplo de como usar dos themes diferentes dependiendo de la ruta
    // <>
      
    //     {status === "authenticated" && (
    //       <Routes>
    //         <Route path="/*" element={<JournalRoutes />} />
    //       </Routes>
    //     )}
      
    //   <AppTheme>
    //   {status !== "authenticated" && (
    //     <Routes>
    //       <Route path="auth/*" element={<AuthRoutes />} />
    //       <Route path="/*" element={<Navigate to="./auth/login" />}></Route>
    //     </Routes>
    //   )}
    //   </AppTheme>
    // </>

    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="auth/*" element={<AuthRoutes />} />
      )}
     <Route path='/*' element={ <Navigate to='/auth/login' />  } />
    </Routes>
  );
};
