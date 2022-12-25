import React, { useContext, useEffect, useState } from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';

import Header from '../../components/Header';
import Transactions from '../../components/Transactions';
import { ITransaction, TransactionsContext } from '../../contexts/transactions/transaction.context';
import ManageTransactionForm from '../../components/ManageTransactionForm';

function Admin() {
  const {transactions, fetchTransactions, manageTransaction} = useContext(TransactionsContext)
  const [transaction, setTransaction] = useState({} as ITransaction)
  const { isOpen, onOpen, onClose } = useDisclosure()

  

  function handleManageTransaction(transaction: ITransaction) {
    setTransaction(transaction);
    onOpen();
  }

  useEffect(() => {
    void fetchTransactions({needs_review: true})
  }, [])

  return (
    <>
      <Flex w={"100%"} flexDir="column" alignItems={"center"}>
        <Header />
      </Flex>
      <Transactions data={transactions} onItemClick={handleManageTransaction} />
      {
        transaction.id &&
        <ManageTransactionForm isOpen={isOpen} onClose={onClose} data={transaction} />
      }
    </>
  )
}

export default Admin;