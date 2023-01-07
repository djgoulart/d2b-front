import React, { useContext, useState } from 'react';
import { 
  Box,
  Button, 
  HStack, 
  Image,
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Stack, 
  Text, 
  VStack } from '@chakra-ui/react';
import { numberFormat } from '../../helpers/numberFormat';
import { dateFormat } from '../../helpers/dateFormat';
import { ITransaction, TransactionsContext } from '../../contexts/transactions/transaction.context';

type IProps = {
  isOpen: boolean,
  onClose: () => void,
  data: ITransaction
}

function ManageTransactionForm({isOpen, onClose, data}:IProps) {
  const {manageTransaction, fetchTransactions } = useContext(TransactionsContext)

  async function handleAproveTransaction() {
    await manageTransaction(data.id, true)
    await fetchTransactions({needs_review: true})
    onClose()
  }

  async function handleDeclineTransaction() {
    await manageTransaction(data.id, false)
    await fetchTransactions({needs_review: true})
    onClose()
  }

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={5}>
              <VStack w="100%" p="2" borderRadius={4} border="1px" borderColor="gray.300">
                <HStack w="100%" justifyContent="flex-start">
                  <Text fontWeight="bold">Description:</Text>
                  <Text w="100%" textAlign="left">
                    {data.description}
                  </Text>
                </HStack>
                <HStack w="100%" justifyContent="flex-start">
                  <Text fontWeight="bold">Amount:</Text>
                  <Text w="100%" textAlign="left">
                    {numberFormat(data.amount)}
                  </Text>
                </HStack>
                <HStack w="100%" justifyContent="flex-start">
                  <Text fontWeight="bold">Date:</Text>
                  <Text w="100%" textAlign="left">
                  {dateFormat(data.created_at)}
                  </Text>
                </HStack>
              </VStack>
              
              <Box>
                <Image w="100%" maxW="500px" maxH="400px" src={data.receipt_url} title="comprovante" />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack justifyContent="center" w="100%">
            <Button 
              w="100%"
              maxW="200px" 
              h="54px" 
              bg="brand.green" 
              color="brand.shape"
              fontSize="16"
              onClick={handleAproveTransaction}
            >Aprove</Button>
            <Button 
              w="100%"
              maxW="200px" 
              h="54px" 
              bg="brand.red" 
              color="brand.shape"
              fontSize="16"
              onClick={handleDeclineTransaction}
            >Decline</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
}

export default ManageTransactionForm;