import React from "react";
import {createBrowserRouter} from 'react-router-dom';
import Admin from "./pages/Admin";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/admin",
    element: <Admin />
  },
]);