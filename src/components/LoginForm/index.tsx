import React, { FormEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import { ILoginInputDTO } from '../../contexts/auth/login-input.dto';
import { useAuth } from '../../contexts/auth/auth.context';

function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ILoginInputDTO>()

  const {login} = useAuth()

  const onSubmit = async (e:FormEvent) => {
    e.preventDefault();
  
    await login(data);
  }

  return (
    <form onSubmit={onSubmit}>
      <FormControl isInvalid={errors.email}>
        <FormLabel htmlFor='name'>Email</FormLabel>
        <Input
          id='email'
          placeholder='email'
          {...register('email', {
            required: 'This is required',
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor='name'>Password</FormLabel>
        <Input
          id='password'
          type="password"
          placeholder='password'
          {...register('password', {
            required: 'This is required',
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
  );
}

export default LoginForm;