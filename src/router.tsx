import React from "react";
import {createBrowserRouter} from 'react-router-dom';
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { RequireAuth } from "./pages/Login/RequireAuth";
import SignUp from "./pages/Signup";

export const router = createBrowserRouter([
  
  {
    path: "/admin",
    element: <RequireAuth><Admin /></RequireAuth>
  },
  {
    path: "/",
    element: <RequireAuth><Home /></RequireAuth>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
]);