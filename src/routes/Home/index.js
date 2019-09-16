import React from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from 'context/auth-context'

export default () => {
  const { logout } = useAuth()
  return (
    <React.Fragment>
      <button onClick={logout}>logout</button>
      <Link to='/dashboard'>GO TO DASHBOARD</Link>
    </React.Fragment>
  )
}
