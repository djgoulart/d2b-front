import React, { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth, USER_ROLES } from "../../contexts/auth/auth.context";

type IProps = {
  children: JSX.Element,
}

export function RequireAuth({children}:IProps) {
  const {isAuthenticated, user} = useAuth()
  const location = useLocation()


  if(isAuthenticated()) {
    return children
  }

  return <Navigate to="/login" state={{from: location}} replace />

}