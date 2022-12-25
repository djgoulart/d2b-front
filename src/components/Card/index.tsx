import React from 'react';
import { Card as ChakraCard, CardHeader, CardBody, CardFooter, CardProps, Heading, Text, HStack, Divider } from '@chakra-ui/react'

type IProps = CardProps & {
  title: string,
  icon: string,
  text: string,
}

function Card({title, icon, text, color, textColor, ...rest}:IProps) {
  return (
    <ChakraCard bg={color} {...rest}>
      <CardHeader>
        <Text size={"md"} color={textColor || "brand.title"}>{title}</Text>
      </CardHeader>
      <CardBody>
        <Heading fontSize={"4xl"} color={textColor || "brand.title"}>{text}</Heading>
      </CardBody>
    </ChakraCard>
  )
}

export default Card;