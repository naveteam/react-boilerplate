import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Button from 'components/Button'

import { useUser } from 'context/user-context'
import { GET_USER } from 'services/auth'

const Home = () => {
  // example of request using apollo
  const { loading, error, data } = useQuery(GET_USER)
  const { logout } = useUser()

  return (
    <Fragment>
      <Button onClick={logout}>logout</Button>
      <Link to='/dashboard'>GO TO DASHBOARD</Link>
    </Fragment>
  )
}

export default Home
