import { useContext, useEffect } from "react";
import { TransactionsContext } from "../contexts/transactions/transaction.context";

type IBalanceOutput = {
  deposits: {
    approved: number,
    processing: number,
  },
  expenses: number,
}

export function useBalance(): [IBalanceOutput] {
  const {transactions, fetchTransactions} = useContext(TransactionsContext)

  useEffect(() => {
    if(transactions.length < 1) {
      fetchTransactions({account: "1"})
    }
  }, [])

  const balance = transactions.reduce((map: IBalanceOutput, currentTransaction): IBalanceOutput => {
    if(currentTransaction.type === 'deposit') {
      if(currentTransaction.needs_review) {
        map.deposits.processing += currentTransaction.amount
      }

      if(currentTransaction.approved) {
        map.deposits.approved += currentTransaction.amount
      }
    }

    if(currentTransaction.type === 'expense') {
      map.expenses += currentTransaction.amount
    }

    return map
  }, {
      deposits: {
        approved: 0,
        processing: 0,
      },
      expenses: 0,
  })

  return [balance]
}