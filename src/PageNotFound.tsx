import React from 'react'
import { Center, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


function PageNotFound() {
  return (
    <VStack w="full" h="100vh" justifyContent="center">
      <Center>
      <Text>Oops! Page not found! <Link to="/"><Text as="span" textDecor="underline">Return to home</Text></Link></Text>
      </Center>
    </VStack>
  )
}

export default PageNotFound
