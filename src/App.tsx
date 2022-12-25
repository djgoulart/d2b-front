import { Heading } from '@chakra-ui/react'
import React from 'react'
import { TransactionsProvider } from './contexts/transactions/transaction.context'

function App() {

  return (
    
      <div className="App">
        <Heading fontFamily={'heading'} color={"brand.blue"}>D2B - Bank</Heading>
      </div>
  )
}

export default App
