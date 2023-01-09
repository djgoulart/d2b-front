import React from 'react';
import { Button, Flex, HStack, Image, useDisclosure } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import logoImg from "../../assets/d2b.svg"
import TransactionForm from '../TransactionForm';
import AccountBalance from '../AccountBalance';
import { useAuth, USER_ROLES } from '../../contexts/auth/auth.context';

function Header() {
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const {logout, user} = useAuth()

  function handleLogout() {
    logout(() => {
      navigate(from, { replace: true });
    })
  }

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
          <HStack>
          { location.pathname === '/' && user?.roleId === USER_ROLES.CUSTOMER
            && <Button onClick={onOpen}>Add Transaction</Button> 
          }
          <Button justifySelf="flex-end" onClick={handleLogout}>Logout</Button>
          </HStack>
        </HStack>
      </Flex>
      {
        user?.roleId === USER_ROLES.CUSTOMER
        && <AccountBalance />
      }

      { location.pathname === '/' && user?.roleId === USER_ROLES.CUSTOMER 
          && <TransactionForm isOpen={isOpen} onClose={onClose} /> }
    </Flex>
  );
}

export default Header;