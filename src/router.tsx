import React from "react";
import {createBrowserRouter} from 'react-router-dom';
import App from "./App";
import { USER_ROLES } from "./contexts/auth/auth.context";
import PageNotFound from "./PageNotFound";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { RequireAuth } from "./pages/Login/RequireAuth";
import SignUp from "./pages/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><App /></RequireAuth>,
    errorElement: <PageNotFound />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  
],);