import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import Axios from 'axios'

import App from './App'
import { customTheme } from './global/theme'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { TransactionsProvider } from './contexts/transactions/transaction.context'
import { AccountProvider } from './contexts/account/account.context'
import { AuthProvider } from './contexts/auth/auth.context'
import PageNotFound from './PageNotFound'

Axios.get('http://localhost/sanctum/csrf-cookie', {withCredentials: true})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <AccountProvider>
        <TransactionsProvider>
          <ChakraProvider theme={customTheme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </TransactionsProvider>
      </AccountProvider>
    </AuthProvider>
  </React.StrictMode>
)
