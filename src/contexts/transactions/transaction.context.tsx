import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import {v4 as uuid} from 'uuid'

import { clientHttp } from "../../common/axios";
import { useAuth } from "../auth/auth.context";
import { AddTransactionInputDTO } from "./add-transaction.dto";

type IFilterType = "account" | "type" | "approved" | "needs_review";

type IFilter = {
  account?: string,
  type?: string,
  approved?: boolean,
  needs_review?: boolean
}

export type ITransaction = {
  id: string
  account: string
  amount: number
  description: string
  type: string
  approved: boolean
  needs_review: boolean,
  receipt_url: string,
  created_at: string
}

type ITransactionsContext = {
  transactions: ITransaction[],
  addTransaction: (transaction: AddTransactionInputDTO) => Promise<void>,
  fetchTransactions: (filter: IFilter) => Promise<void>
  manageTransaction: (transactionId: string, approved: boolean) => Promise<void>
}

type ITransactionsProviderProps = {
  children: ReactNode,
}

const TransactionsContext = createContext<ITransactionsContext>({
  transactions: [],
  addTransaction: async (transaction: AddTransactionInputDTO) => {},
  fetchTransactions: async (filter) => {},
  manageTransaction: async (transactionId: string, approved: boolean) => {}
})

function TransactionsProvider({children}:ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  async function addTransaction(transaction: AddTransactionInputDTO) {
    const result = await clientHttp.post('transactions', {
      id: uuid(),
      account: transaction.account,
      amount: transaction.amount,
      description: transaction.description,
      receipt: transaction.receipt,
      type: transaction.type,
      needs_review: transaction.type === 'deposit' ? true : false,
      approved: transaction.type === 'deposit' ? false : true,
      created_at: new Date().toISOString()
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    setTransactions((oldState) => [result.data, ...oldState]);
  }

  async function manageTransaction(transactionId: string, approved: boolean) {
    const transaction = await fetchTransaction(transactionId)

    if(transaction) {
      const result = await clientHttp.put(`transactions/${transactionId}/send-for-approval`, {
        ...transaction,
        approved,
        needs_review: false
      })
    
      return result.data;
    }
  }

  async function fetchTransactions(filter = {} as IFilter) {
    const result = await clientHttp.get('transactions', {
      params: filter
    })
    
    setTransactions(result.data)
  }

  async function fetchTransaction(id: string): Promise<ITransaction> {
    const result = await clientHttp.get(`transactions/${id}`)
    return result.data;
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      addTransaction,
      fetchTransactions,
      manageTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export { TransactionsContext, TransactionsProvider };