import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import { getToken } from 'helpers'

const httpLink = new HttpLink({ uri: process.env.REACT_APP_API_URL })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getToken()

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer: ${token}` })
    }
  }))

  return forward(operation)
})

const errorMiddleware = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(error => {
      return Promise.reject(error)
    })

  if (
    networkError.statusCode === 401 &&
    !['/login', '/redefine-password', '/sign-up'].includes(window.location.pathname)
  ) {
    window.location.href = '/login'
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authMiddleware, errorMiddleware, httpLink])
})

export default client
