import React from 'react';
import { Button, Flex, HStack, Image, useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import logoImg from "../../assets/d2b.svg"
import TransactionForm from '../TransactionForm';
import AccountBalance from '../AccountBalance';

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {pathname} = useLocation()
  return (
    <Flex w={"100%"} h="full" flexDir="column" alignItems={"center"}>
      <Flex 
      w={"full"} 
      h={212} 
      bg={"brand.blue"} 
      flexDir="row" 
      alignItems="flex-start" 
      justifyContent="center"
      >
        <HStack w="100%" mt="4" maxW={1140} justifyContent="space-between">
          <Image src={logoImg} title="d2b logo" alt="d2b logo" />
          { pathname === '/' 
          && <Button onClick={onOpen}>Add Transaction</Button> }
        </HStack>
      </Flex>
      <AccountBalance />

      { pathname === '/' 
          && <TransactionForm isOpen={isOpen} onClose={onClose} /> }
    </Flex>
  );
}

export default Header;