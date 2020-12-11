import { ApolloClient, InMemoryCache } from '@apollo/client'
import { OAuth2 } from '@naveteam/pandora-frontend'

import { ACCESS_TOKEN, REFRESH_TOKEN, getToken } from 'helpers'

const options = {
  api_url: process.env.REACT_APP_API_URL,
  refreshTokenUrl: '/v1/users/refresh-token',
  access_token_name: ACCESS_TOKEN,
  refresh_token_name: REFRESH_TOKEN
}

const instance = OAuth2.createInstance(options)

export const graphqlClient = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  cache: new InMemoryCache(),
  headers: {
    Authorization: getToken()
  }
})

export default instance
