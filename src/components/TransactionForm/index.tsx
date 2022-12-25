import React, { useContext, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, useDisclosure, VStack } from '@chakra-ui/react';

import { TransactionsContext } from '../../contexts/transactions/transaction.context';
import { AddTransactionInputDTO } from '../../contexts/transactions/add-transaction.dto';

type ITransactionFormProps = {
  isOpen: boolean,
  onClose: () => void,
}

function TransactionForm({isOpen, onClose}:ITransactionFormProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState<number>(0)
  const [type, setType] = useState('')
  const {addTransaction} = useContext(TransactionsContext)

  async function handleAddTransaction(transaction: AddTransactionInputDTO) {
    await addTransaction(transaction)
    onClose()
  }

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add one transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={5}>
              <Input 
                placeholder='Description'
                h="16"
                bg="brand.background"
                onChange={e => setDescription(e.target.value)}
               />
              <Input 
                placeholder='Value $'
                h="16"
                bg="brand.background"
                type={'number'}
                onChange={e => setAmount(Number(e.target.value))}
               />
              <RadioGroup defaultValue='deposit' w="100%" onChange={setType}>
                <Stack spacing={5} direction='row' justifyContent="flex-start">
                  <Radio colorScheme='red' value='expense'>
                    Expense
                  </Radio>
                  <Radio colorScheme='green' value='deposit'>
                    Deposit
                  </Radio>
                </Stack>
              </RadioGroup>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button 
              w="100%" 
              h="54px" 
              bg="brand.green" 
              color="brand.shape"
              fontSize="16"
              onClick={ async () => await handleAddTransaction({
                description, 
                type: type || 'deposit', 
                amount,
              })}
            >Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
}

export default TransactionForm;