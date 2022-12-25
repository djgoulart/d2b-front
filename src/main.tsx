import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import App from './App'
import { customTheme } from './global/theme'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { TransactionsProvider } from './contexts/transactions/transaction.context'
import { AccountProvider } from './contexts/account/account.context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AccountProvider>
      <TransactionsProvider>
        <ChakraProvider theme={customTheme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </TransactionsProvider>
    </AccountProvider>
  </React.StrictMode>
)
