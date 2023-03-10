import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientHttp } from "../../common/axios";
import {IAccount } from "../account/account.context";
import { ILoginInputDTO } from "./login-input.dto";
import { ISignUpInputDTO } from "./signup-input.dto";

export enum USER_ROLES {
  CUSTOMER = 1,
  ADMIN = 2
}

type IUser = {
  id: string;
  name: string;
  roleId: USER_ROLES;
  email: string;
  token: string;
  account: IAccount
}

type IAuthContext = {
  user: IUser | undefined;
  isAuthenticated: () => boolean;
  authToken: string | undefined;
  login: (data: ILoginInputDTO, callBack: (roleId:number) => void) => Promise<void>
  signUp: (data: ISignUpInputDTO, callBack: VoidFunction) => Promise<void>
  logout: (callback: VoidFunction) => Promise<void>
}

type IAuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export function AuthProvider(props: IAuthProviderProps) {
  const {children} = props
  const [user, setUser] = useState<IUser>()
  const [authToken, setAuthToken] = useState<string | undefined>(undefined)

  useEffect(() => {
    setAuthToken(localStorage.getItem('d2b:authToken') ?? undefined)
  }, []);

  useEffect(() => {
    const localUser = localStorage.getItem('d2b:user')
    if(localUser) {
      setUser(JSON.parse(localUser))
    }
    setAuthToken(localStorage.getItem('d2b:authToken') ?? undefined)
  }, []);


  function isAuthenticated() {
    const token = localStorage.getItem('d2b:authToken') ?? null;

    if(token) {
      return true;
    }

    return false;
  }

  async function login(data: ILoginInputDTO, callBack: (roleId:number) => void): Promise<void> {
    const result = await clientHttp.post('auth/login', data)

    if(result.data) {
      localStorage.setItem('d2b:user', JSON.stringify(result.data.user))
      localStorage.setItem('d2b:authToken', JSON.stringify(result.data.token))
      setUser(result.data.user)
      setAuthToken(result.data.token)

      setTimeout(() => callBack(result.data.user.roleId), 100);
    }
  }

  async function logout(callback:VoidFunction) {
    localStorage.removeItem('d2b:user');
    localStorage.removeItem('d2b:authToken');
    setUser(undefined)
    setAuthToken(undefined)

    setTimeout(callback, 100);
  }

  async function signUp(data: ISignUpInputDTO, callBack: VoidFunction): Promise<void> {
    const result = await clientHttp.post('users', data)

    if(result.data) {
      setTimeout(callBack, 100);
    }
  }

  return (
    <AuthContext.Provider value={{user, authToken, isAuthenticated, login, logout, signUp}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContext {
  return useContext(AuthContext)
}