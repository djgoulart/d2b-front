import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Fade, FormControl, FormErrorMessage, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, useDisclosure, VStack } from '@chakra-ui/react';

import { TransactionsContext } from '../../contexts/transactions/transaction.context';
import { AddTransactionInputDTO } from '../../contexts/transactions/add-transaction.dto';
import { useAuth } from '../../contexts/auth/auth.context';
import { useBalance } from '../../hooks/useBalance';

type ITransactionFormProps = {
  isOpen: boolean,
  onClose: () => void,
}

function TransactionForm({isOpen, onClose}:ITransactionFormProps) {
  const [image, setImage] = useState(undefined);
  const [imageDataURL, setImageDataURL] = useState(undefined);
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState<number>(0.00)
  const [type, setType] = useState('deposit')
  const {addTransaction} = useContext(TransactionsContext)
  const {user} = useAuth()
  const [{deposits, expenses}] = useBalance()
  const [validation, setValidation] = useState({
    amount: true
  });

  async function handleAddTransaction(transaction: AddTransactionInputDTO) {
    if(transaction.type === 'expense' && transaction.amount > (deposits.approved - expenses)) {
      setValidation({
        amount: false
      })

      return;
    }
    await addTransaction({...transaction, receipt: image})
    onClose()
  }

  function handleClose() {
    setDescription('')
    setAmount(0.00)
    setType('')
    setImage(undefined)
    setImageDataURL(undefined)
    setValidation({
      amount: true
    })
    onClose()
  }

  function handlePickFile(e: any) {
    const file = e.target.files[0]

    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    
    setImage(file)
  }

  useEffect(() => {
    let fileReader, isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setImageDataURL(result)
        }
      }
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [image]);

  return (
    <Modal onClose={handleClose} size="xl" isOpen={isOpen} isCentered>
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
               <FormControl isInvalid={!validation.amount}>
                <Input 
                  value={amount}
                  placeholder='Value $'
                  h="16"
                  bg="brand.background"
                  type={'number'}
                  onChange={e => setAmount(Number(e.target.value))}
                />
                <FormErrorMessage>Insufficient funds.</FormErrorMessage>
               </FormControl>
              <RadioGroup w="100%" onChange={setType}>
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
            <Fade in={type === 'deposit'}>
              <VStack gap={5} mt={4}>
                <FormControl>
                  <Input
                    id='image'
                    accept='.png, .jpg, .jpeg'
                    placeholder='Send receipt image'
                    h="16"
                    bg="brand.background"
                    type={'file'}
                    onChange={handlePickFile}
                  />
                  <FormErrorMessage>Insufficient funds.</FormErrorMessage>
                </FormControl>
                <Fade in={!!imageDataURL}>
                  <Box w={"100%"} maxW="150" h="auto">
                    <Image src={imageDataURL} title="preview" alt="preview" />
                  </Box>
                </Fade>
              </VStack>
            </Fade>
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
                amount: amount * 100,
                account: user?.account.id!!
              })}
            >Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
}

export default TransactionForm;