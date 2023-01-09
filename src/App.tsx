import React from 'react'
import { Heading, Text } from '@chakra-ui/react'
import { useAuth, USER_ROLES } from './contexts/auth/auth.context'
import Home from './pages/Home'
import Admin from './pages/Admin'

function App() {
  const {user} = useAuth()
  return (
    user && user.roleId === USER_ROLES.CUSTOMER 
    ? <Home /> 
    : user && user.roleId === USER_ROLES.ADMIN 
    ? <Admin />
    : (
      <Text>You don't have a valid access</Text>
    )
  )
}

export default App
