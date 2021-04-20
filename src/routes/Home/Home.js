import React, { Fragment } from 'react'

import Button from 'components/Button'

import { useUser } from 'context/user-context'

const Home = () => {
  const { logout } = useUser()

  return (
    <Fragment>
      <Button onClick={logout}>logout</Button>
    </Fragment>
  )
}

export default Home
