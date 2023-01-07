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
  email: yup
    .string()
    .email('Please provide a valid e-mail address and try again.')
    .required('The e-mail field is required.'),
  password: yup.string().required('The password is required.'),
});

interface IFormData {
  email: string;
  password: string;
  rememberUser: string;
}

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const {login, isAuthenticated} = useAuth();
  const from = location.state?.from?.pathname || '/';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = (): void => setShowPassword(oldstate => !oldstate);

  async function handleFormSubmit(form: FieldValues) {
    const { email, password } = form as IFormData;

    await login({ email, password }, () => {
      navigate(from, { replace: true });
    });
  }

  
  if(isAuthenticated()) {   
    return <Navigate to="/" state={{from: location}} replace />
  }
  

  return (
    <VStack flex={1} h={'100vh'} justifyContent={'space-between'}>
      
      <VStack as="main" justifySelf="flex-start">
        <HStack>
          <Text fontFamily={'body'} fontSize={'xl'}>
            Access your {<strong>Account</strong>}
          </Text>
        </HStack>
        <VStack pt={10} w={'100%'} maxW={'482px'} px="4">
          <Stack spacing={2}>
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
                type={showPassword ? 'text' : 'password'}
                w={['300px', '360px', '450px']}
                h={'40px'}
                focusBorderColor="brand.green"
                placeholder="Password"
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
              Signin
            </Button>
          </Stack>
        </VStack>
      </VStack>
    </VStack>
  );
}