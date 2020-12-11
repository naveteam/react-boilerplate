import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

import Button from 'components/Button'

const USERS_QUERY = gql`
  query Users {
    Page {
      users {
        id
        name
      }
    }
  }
`

const Dashboard = () => {
  const { data } = useQuery(USERS_QUERY)

  return (
    <Link to='/home'>
      <Button>DASHBOARD BUTTON</Button>

      {data?.Page?.users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </Link>
  )
}

export default Dashboard
