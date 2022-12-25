import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { clientHttp } from "../../common/axios";

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
  fetchAccount: (ownerId: string) => Promise<void>
}

type IAccountProviderProps = {
  children: ReactNode,
}

const AccountContext = createContext<IAccountContext>({
  account: {} as IAccount,
  fetchAccount: async (ownerId: string) => {}
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
  const userId = "1"
  
  async function fetchAccount(ownerId: string) {

    const result = await clientHttp.get(`account`, {
      params: {
        owner: ownerId
      }
    })
    
    setAccount(result.data)
  }

  useEffect(() => {
    void fetchAccount(userId)
  }, [])

  return (
    <AccountContext.Provider value={{
      account,
      fetchAccount
    }}>
      {children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountProvider };