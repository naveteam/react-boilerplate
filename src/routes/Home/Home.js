import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Button from 'components/Button'

import { useUser } from 'context/user-context'

const Home = () => {
  const { logout } = useUser()

  return (
    <Fragment>
      <Button onClick={logout}>logout</Button>
      <Link to='/dashboard'>GO TO DASHBOARD</Link>
      <Link to='/usuarios/criar'>GO TO CREATE USERS</Link>
    </Fragment>
  )
}

export default Home
