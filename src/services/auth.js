import client from 'providers/fetchClient'
import { gql } from '@apollo/client'

export const getUser = () => client.get('/v1/me')

export const login = data => client.post('/v1/users/login', data)

//exemple of rest query using graphql
export const userQuery = gql`
  query getUser {
    me @rest(type: User, path: "/v1/me") {
      id
      name
      email
      document
    }
  }
`
