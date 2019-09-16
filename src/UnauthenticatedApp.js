import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from 'routes/Home'
import Login from 'routes/Login'

// import { useAuth } from 'context/auth-context'

const UnauthenticatedApp = () => {
  // const { login, register } = useAuth()

  return (
    <Router>
      <Fragment>
        <Route path='/' component={Login} />
      </Fragment>
    </Router>
  )
}

export default UnauthenticatedApp
