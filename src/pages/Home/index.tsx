import React, { useContext, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import Header from '../../components/Header';
import { TransactionsContext } from '../../contexts/transactions/transaction.context';
import AccountTransactions from '../../components/Transactions/account-transactions';
import { useAuth } from '../../contexts/auth/auth.context';

function Home() {
  const {transactions, fetchTransactions} = useContext(TransactionsContext)
  const {user} = useAuth()
  
  useEffect(() => {
    if (user && user.account) {
      void fetchTransactions({account: user.account.id})
    }
  }, [user])

  return (
    <>
      <Flex w={"100%"} flexDir="column" alignItems={"center"}>
        <Header />
      </Flex>
      <AccountTransactions data={transactions} />
    </>
  )
}

export default Home;