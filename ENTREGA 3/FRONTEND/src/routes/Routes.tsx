import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "./Loadable";
import MobileWrapper from "../components/MobileWrapper";
import { Outlet } from "react-router-dom";

/* ***Layouts**** */
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank-layout/BlankLayout"))
);
const AuthLayout = Loadable(lazy(() => import("../layouts/auth/AuthLayout")));


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
  lazy(() => import("../views/destination/DestinationList"))
);
const DestinationView = Loadable(
  lazy(() => import("../views/destination/DestinationView"))
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
    element: <AuthLayout />,
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
    { path: "*", element: <Navigate to="/error/404" />  },
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
  {
  path: "/destinations",
  element: <DestinationList />,
},
{
  path: "/destination/:id",
  element: <DestinationView />,
},
];


export default Router;
