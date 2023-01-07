import React from 'react';
import { Input as ChakraInput, InputProps } from '@chakra-ui/react';


export default function Input({ ...rest }: InputProps) {
  return (
    <ChakraInput
      size={'lg'}
      w={['300px', '360px', '450px']}
      h={'40px'}
      px={9}
      focusBorderColor="brand.green"
      placeholder="Email"
      _placeholder={{
        fontSize: 'md',
        color: 'brand.title',
      }}
      {...rest}
    />
  );
}