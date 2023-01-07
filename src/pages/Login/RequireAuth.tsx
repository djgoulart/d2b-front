import React, { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/auth/auth.context";

type IProps = {
  children: JSX.Element
}

export function RequireAuth({children}:IProps) {
  const {isAuthenticated} = useAuth()
  const location = useLocation()
  const [token, setToken] = useState('')

  /* useEffect(() => {
    function getTokenFromLocalStorage() {
      let authToken = localStorage.getItem('d2b:authToken');

      if(authToken) {
        setToken(authToken);
      }
    }
    
    return getTokenFromLocalStorage()
  }, []) */


  console.log('IS AUTHENTICATED', isAuthenticated());

  if(isAuthenticated()) {
    return children
  }

  return <Navigate to="/login" state={{from: location}} replace />

}