import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from 'routes/Home'
import Login from 'routes/Login'

const UnauthenticatedApp = () => {
  return (
    <Router>
      <Fragment>
        <Route path='/' component={Login} />
      </Fragment>
    </Router>
  )
}

export default UnauthenticatedApp
