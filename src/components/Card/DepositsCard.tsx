import React from 'react';
import { Card as ChakraCard, CardHeader, CardBody, CardFooter, CardProps, Heading, Text, HStack } from '@chakra-ui/react'

type IProps = CardProps & {
  title: string,
  icon: string,
  processing: string,
  deposits: string,
}

function DepositsCard({title, icon, deposits, processing, color, textColor, ...rest}:IProps) {
  return (
    <ChakraCard bg={color} {...rest}>
      <CardHeader>
        <Text size={"md"} color={textColor || "brand.title"}>{title}</Text>
      </CardHeader>
      <CardBody>
        <Heading fontSize={"4xl"} color={textColor || "brand.title"}>{deposits}</Heading>
      </CardBody>
      <CardFooter>
        <HStack justifyContent="space-between">
          <HStack>
            <Text fontSize="xs">Processing</Text>
            <Text fontSize="xs">{processing}</Text>
          </HStack>
        </HStack>
      </CardFooter>
    </ChakraCard>
  )
}

export default DepositsCard;