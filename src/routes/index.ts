import { createBrowserRouter } from "react-router-dom";
import { AuthRouter } from "./authRoutes";
import { HomeRouter } from "./homeRoutes";

export const router = createBrowserRouter([...AuthRouter, ...HomeRouter]);
