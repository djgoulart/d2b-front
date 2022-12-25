import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import { ITransaction } from '../../contexts/transactions/transaction.context';
import { numberFormat } from '../../helpers/numberFormat';
import { dateFormat } from '../../helpers/dateFormat';

type IProps = {
  data: ITransaction[],
}

function AccountTransactions(props: IProps) {
  const { data } = props

  return (
    <Box as="main" w="100%" maxW={1140} margin="0 auto">
        <TableContainer>
          <Table variant='striped' colorScheme='gray'>
            <TableCaption>{data.length < 1 && 'Nothing to see here :('}</TableCaption>
            <Thead>
              <Tr>
                <Th fontWeight="bold">Description</Th>
                <Th fontWeight="bold" textAlign="right">Amount</Th>
                <Th fontWeight="bold" textAlign="center">Date</Th>
                <Th fontWeight="bold" textAlign="center">Status</Th>
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
                        transaction.type === 'expense' ? 
                        "brand.red" : 
                        "brand.title"
                      }>
                        { transaction.type === 'expense' 
                          ? `-  ${numberFormat(transaction.amount)}` 
                          : `${numberFormat(transaction.amount)}` 
                        }
                    </Td>
                    <Td textAlign="center">{dateFormat(transaction.created_at)}</Td>
                    <Td textAlign="center">
                      {
                      transaction.needs_review ? 
                      'processing' : 
                      transaction.approved ?
                      (<Text color="brand.green">approved</Text>) :
                      (<Text color="brand.red">denied</Text>)
                      }
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

export default AccountTransactions;