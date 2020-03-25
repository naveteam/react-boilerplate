import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Button from 'components/Button'

import { useAuth } from 'context/auth-context'

const Home = () => {
  const { logout } = useAuth()

  return (
    <Fragment>
      <Button onClick={logout}>logout</Button>
      <Link to='/dashboard'>GO TO DASHBOARD</Link>
    </Fragment>
  )
}

export default Home
