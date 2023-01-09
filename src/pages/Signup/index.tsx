import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  HStack,
  InputGroup,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import FormInput from '../../components/FormInput';
import { useAuth } from '../../contexts/auth/auth.context';
const schema = yup.object().shape({
  name: yup
    .string()
    .required('The name is a required field'),
  email: yup
    .string()
    .email('Please provide a valid e-mail address and try again.')
    .required('The e-mail field is required.'),
  password: yup.string().required('The password is required.'),
  password_confirmation: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
});

interface IFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  rememberUser: string;
}

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const {signUp, isAuthenticated} = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleFormSubmit(form: FieldValues) {
    const { name, email, password, password_confirmation } = form as IFormData;

    if(await schema.validate({ name, email, password, password_confirmation })) {
      await signUp({ name, email, password, password_confirmation }, () => {
        navigate('/login', { replace: true });
      });
    }
  }

  
  if(isAuthenticated()) {   
    return <Navigate to="/" state={{from: location}} replace />
  }
  

  return (
    <VStack w="full" h={'100vh'} justifyContent='center'>
      
      <VStack as="main" justifySelf="flex-start">
        <HStack>
          <Text fontFamily={'body'} fontSize={'xl'}>
            Create your {<strong> D2B Account</strong>}
          </Text>
        </HStack>
        <VStack pt={10} w={'100%'} maxW={'482px'} px="4">
          <Stack spacing={2}>
            <InputGroup>
              <FormInput
                name="name"
                control={control}
                error={errors.name && errors.name.message}
                size={'lg'}
                type={'text'}
                w={['300px', '360px', '450px']}
                h={'40px'}
                focusBorderColor="brand.green"
                placeholder="Your name"
                borderColor="brand.text"
                _placeholder={{
                  fontSize: 'md',
                  opacity: 1,
                  color: 'brand.title',
                }}
              />
            </InputGroup>
            <InputGroup>
              <FormInput
                name="email"
                control={control}
                error={errors.email && errors.email.message}
                size={'lg'}
                type={'email'}
                w={['300px', '360px', '450px']}
                h={'40px'}
                focusBorderColor="brand.green"
                placeholder="E-mail"
                borderColor="brand.text"
                _placeholder={{
                  fontSize: 'md',
                  opacity: 1,
                  color: 'brand.title',
                }}
              />
            </InputGroup>
            <InputGroup>
              <FormInput
                name="password"
                control={control}
                error={errors.password && errors.password.message}
                size={'lg'}
                type={'password'}
                w={['300px', '360px', '450px']}
                h={'40px'}
                focusBorderColor="brand.green"
                placeholder="password"
                borderColor="brand.text"
                _placeholder={{
                  fontSize: 'md',
                  opacity: 1,
                  color: 'brand.title',
                }}
              />
            </InputGroup>
            <InputGroup>
              <FormInput
                name="password_confirmation"
                control={control}
                error={errors.password_confirmation && errors.password_confirmation.message}
                size={'lg'}
                type={'password'}
                w={['300px', '360px', '450px']}
                h={'40px'}
                focusBorderColor="brand.green"
                placeholder="confirm your password"
                borderColor="brand.text"
                _placeholder={{
                  fontSize: 'md',
                  opacity: 1,
                  color: 'brand.title',
                }}
              />
            </InputGroup>
          </Stack>
          
          <Stack w="100%" pt={'6'} spacing={6} alignItems={'flex-start'}>
            
            <Button
              onClick={handleSubmit(handleFormSubmit)}
              bg="brand.green"
              color="white"
              _hover={{
                bg: 'brand.green',
              }}
            >
              Signup
            </Button>
          </Stack>
        </VStack>
      </VStack>
    </VStack>
  );
}