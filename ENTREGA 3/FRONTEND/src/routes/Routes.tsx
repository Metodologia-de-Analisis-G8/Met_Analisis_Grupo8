import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "./Loadable";
import MobileWrapper from "../components/MobileWrapper";
import { Outlet } from "react-router-dom";

/* ***Layouts**** */
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank-layout/BlankLayout"))
);


/* ***End Layouts**** */
const Error = Loadable(lazy(() => import("../views/authentication/Error")));

/* ****Pages***** */
const Home = Loadable(lazy(() => import("../views/home/Home")));
const Login = Loadable(lazy(() => import("../views/authentication/Login")));
const Register = Loadable(
  lazy(() => import("../views/authentication/Register"))
);
const ResetPass = Loadable(
  lazy(() => import("../views/authentication/ResetPass"))
);
const VerifyEmail = Loadable(
  lazy(() => import("../views/authentication/VerifyEmail"))
);
const DestinationList = Loadable(
  lazy(() => import("../views/destinos/DestinationList"))
);
const DestinationView = Loadable(
  lazy(() => import("../views/destinos/DestinationView"))
);
const ProfileScreen = Loadable(
  lazy(() => import("../views/perfil/perfil").then((module) => ({ default: module.ProfileScreen })))
);
const EditProfileScreen = Loadable(
  lazy(() => import("../views/perfil/editarperfil").then((module) => ({ default: module.EditProfileScreen })))
);
const DestinationBest = Loadable(
  lazy(() => import("../views/destinos/DestinationBest"))
);


/* ****End Pages***** */

const Router = [
  {
    path: "/error",
    element: <BlankLayout />,
    children: [{ path: "404", element: <Error /> }],
  },
  {
    path: "/auth",
    element: (
    <><MobileWrapper>
        <Outlet />
      </MobileWrapper></>),
    children: [
      { path: "", exact: true, element: <Navigate to="/auth/login" /> },
      { path: "login", exact: true, element: <Login /> },
      {
        path: "register",
        exact: true,
        element: <Register />,
      },
      {
        path: "forgot-password",
        exact: true,
        element: <ResetPass />,
      },
      { path: "verifyemail", exact: true, element: <VerifyEmail /> },

      { path: "*", element: <Navigate to="/error/404" /> },
      { path: "404", exact: true, element: <Error /> },
    ],
  },
  {
  path: "/",
  element: (
    <MobileWrapper>
      <Outlet />
    </MobileWrapper>
  ),
  children: [
    { path: "", element: <Home /> },
    { path: "home", element: <Home /> },

    { path: "destinos", element: <DestinationList /> },
    { path: "destinos/:id", element: <DestinationView /> },
    { path: "perfil", element: <ProfileScreen /> },
    { path: "perfil/editarperfil", element: <EditProfileScreen /> },
    { path: "destinos/mejores", element: <DestinationBest /> },

    { path: "*", element: <Navigate to="/error/404" />  }
  ],
},

  {
    path: "/error",
    element: <BlankLayout />,
    children: [
      { path: "*", element: <Navigate to="/error/404" /> },
      { path: "404", exact: true, element: <Error /> },
    ],
  },
];


export default Router;
