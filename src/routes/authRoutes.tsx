import { Navigate, RouteObject } from "react-router-dom";
import { AuthPrivateRoute } from "./privateRoute";
import Login from "../views/auth/Login";
import Signup from "../views/auth/Signup";
import ForgotPassword from "../views/auth/ForgotPassword";
import ResetPassword from "../views/auth/ResetPassword";
import VerifyUser from "../views/auth/VerifyUser";

export const AuthRouter: RouteObject[] = [
  {
    path: "/",
    element: <AuthPrivateRoute />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/verify-user",
        element: <VerifyUser />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];
