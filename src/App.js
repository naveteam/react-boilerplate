import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'
import { createGlobalStyle } from 'styled-components'
import { ApolloProvider } from '@apollo/client'
import Helmet from 'react-helmet'

import Loader from 'components/Loader'

import { useUser } from 'context/user-context'
import { apolloClient } from 'providers'

import Theme from 'theme'

import 'sanitize.css/sanitize.css'

const loadAuthenticatedApp = () => import('./AuthenticatedApp')
const AuthenticatedApp = lazy(loadAuthenticatedApp)
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'))

const GlobalStyle = createGlobalStyle`
* {
  border: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
}

button, a {
  cursor: pointer;
  &:disabled{
    cursor: not-allowed;
  }
}
`

const App = () => {
  const { user, isLoading } = useUser()

  useEffect(() => {
    loadAuthenticatedApp()
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <Theme>
        <Helmet titleTemplate='Nave.rs | %s' />
        <GlobalStyle />
        <Suspense fallback={<Loader />}>
          {isLoading && <Loader />}
          <Router>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</Router>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </Theme>
    </ApolloProvider>
  )
}

export default App
