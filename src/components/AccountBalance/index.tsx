import React from 'react';
import { HStack } from '@chakra-ui/react';

import Card from '../Card';
import DepositsCard from '../Card/DepositsCard';
import { numberFormat } from '../../helpers/numberFormat';
import { useBalance } from '../../hooks/useBalance';


function AccountBalance(){
  const [{expenses, deposits}] = useBalance()
  return (
    <HStack 
        w="100%" 
        maxW={1140} 
        justifyContent="space-between" 
        justifySelf={"center"} 
        position="relative" 
        bottom={"75px"}
      >
        <DepositsCard 
          processing={numberFormat(deposits.processing)}
          deposits={numberFormat(deposits.approved)}
          w={352} 
          title='Deposits' 
          color="brand.shape" icon='' />
        <Card w={352} title='Withdraws' text={numberFormat(expenses)} color="brand.shape" icon='' />
        <Card w={352} textColor="white" title='Total' text={numberFormat(deposits.approved - expenses)} color="brand.green" icon='' />
      </HStack>
  );
}

export default AccountBalance;