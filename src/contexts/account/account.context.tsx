import { createContext, ReactNode, useEffect, useState } from "react";
import { useAuth } from "../auth/auth.context";

type IBalance = {
  deposits: number
  withdraws: number
  total: number
}

export type IAccount = {
  id: string | undefined
  owner: string | undefined
  balance: IBalance
}

type IAccountContext = {
  account: IAccount,
}

type IAccountProviderProps = {
  children: ReactNode,
}

const AccountContext = createContext<IAccountContext>({
  account: {} as IAccount,
})

function AccountProvider({children}:IAccountProviderProps) {
  const [account, setAccount] = useState<IAccount>({
    id: undefined,
    owner: undefined,
    balance: {
      deposits: 0,
      withdraws: 0,
      total: 0
    }
  } as IAccount)
  
  const {user} = useAuth()
  
  async function fetchAccount() {
    if(user) {
      setAccount(user.account)
    }
  }

  useEffect(() => {
    void fetchAccount()
  }, [user])

  return (
    <AccountContext.Provider value={{account}}>
      {children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountProvider };