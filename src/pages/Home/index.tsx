import React, { useContext, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import Header from '../../components/Header';
import Transactions from '../../components/Transactions';
import { TransactionsContext } from '../../contexts/transactions/transaction.context';
import AccountTransactions from '../../components/Transactions/account-transactions';

function Home() {
  const {transactions, fetchTransactions} = useContext(TransactionsContext)

  useEffect(() => {
    void fetchTransactions({account: "1"})
  }, [])

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