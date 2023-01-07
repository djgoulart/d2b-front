import React from 'react';
import Input from './../Input';
import { InputProps, FormControl, FormErrorMessage } from '@chakra-ui/react';

import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';

interface IProps extends InputProps {
  control: Control;
  name: string;
  error:
  | string
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined;
}

export default function FormInput({ control, name, error, ...rest }: IProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl isInvalid={!!error} w="100%" h="64px" mb={1}>
          <Input onChange={onChange} value={value} {...rest} />
          {
            !!error && <FormErrorMessage>{error.toString()}</FormErrorMessage>
          }
        </FormControl>
      )}
    />
  );
}