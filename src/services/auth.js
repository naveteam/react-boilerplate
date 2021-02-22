import client from 'providers/fetchClient'
import { gql } from '@apollo/client'

export const getUser = () => client.get('/v1/me')

export const login = data => client.post('/v1/users/login', data)

//example of rest query using graphql
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

// example of a graphql query
export const GET_USER = gql`
  query GetUser {
    user {
      id
      name
      email
      document
    }
  }
`
