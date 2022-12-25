import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
} from '@chakra-ui/react'

import { ITransaction } from '../../contexts/transactions/transaction.context';
import { numberFormat } from '../../helpers/numberFormat';
import { dateFormat } from '../../helpers/dateFormat';

type IProps = {
  data: ITransaction[],
  onItemClick: (item: ITransaction) => void,
}

function Transactions(props: IProps) {
  const { data, onItemClick } = props

  return (
    <Box as="main" w="100%" maxW={1140} margin="0 auto">
        <TableContainer>
          <Table variant='striped' colorScheme='gray'>
            <TableCaption>Last transactions</TableCaption>
            <Thead>
              <Tr>
                <Th fontWeight="bold">Description</Th>
                <Th fontWeight="bold" textAlign="right">Value</Th>
                <Th fontWeight="bold" textAlign="center">Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                data.length > 0 && data.map((transaction) => (
                  <Tr key={transaction.id}>
                    <Td>{transaction.description}</Td>
                    <Td 
                      textAlign="right" 
                      textColor={
                        transaction.type === 'withdraw' ? 
                        "brand.red" : 
                        "brand.title"
                      }>
                        { transaction.type === 'withdraw' 
                          ? `-  ${numberFormat(transaction.amount)}` 
                          : `${numberFormat(transaction.amount)}` 
                        }
                    </Td>
                    <Td textAlign="center">{dateFormat(transaction.created_at)}</Td>
                    <Td textAlign="center">
                      <Button onClick={() => onItemClick(transaction)}>Manage</Button>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
    </Box>
  );
}

export default Transactions;