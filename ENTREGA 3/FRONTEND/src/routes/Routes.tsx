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
const Calendar = Loadable(
  lazy(() => import("../views/calendar/Calendar"))
);
const Splash = Loadable(
  lazy(() => import("../views/Splash"))
);
const Notification = Loadable(
  lazy(() => import("../views/notification/Notification"))
);
const SearchPage = Loadable(
  lazy(() => import("../views/Seach/seach"))
);
const Reserva = Loadable(
  lazy(() => import("../views/Reserva/reserva"))
);
const MapView = Loadable(
  lazy(() => import("../views/MapView"))
);


/* ****End Pages***** */

const Router = [
  {
    path: "/error",
    element: <BlankLayout />,
    children: [{ path: "404", element: <Error /> }],
  },
  {
  path: "/map/:lat/:lon/:title",
  element: <MapView />
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
    { path: "", element: <Splash /> },
    { path: "home", element: <Home /> },
    { path: "destinos", element: <DestinationList /> },
    { path: "destinos/:id", element: <DestinationView /> },
    { path: "perfil", element: <ProfileScreen /> },
    { path: "perfil/editarperfil", element: <EditProfileScreen /> },
    { path: "destinos/mejores", element: <DestinationBest /> },
    { path: "calendar", element: <Calendar /> },
    { path: "notification", element: <Notification /> },
    { path: "search", element: <SearchPage /> },
    { path: "reserva/:id", element: <Reserva /> },
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
