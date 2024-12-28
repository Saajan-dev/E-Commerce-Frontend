import { Navigate, Outlet } from "react-router-dom";
import { cookie_user_data } from "../config";
import { getCookie } from "../utils/helpers";

export const AuthPrivateRoute = () => {
  const getCookieData = getCookie(cookie_user_data);
  return getCookieData ? <Navigate to="/home-page" /> : <Outlet />;
};
export const HomePrivateRoute = () => {
  const getCookieData = getCookie(cookie_user_data);
  return !getCookieData ? <Navigate to="/" /> : <Outlet />;
};
