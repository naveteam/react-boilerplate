import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Home from 'routes/Home'
import Dashboard from 'routes/Dashboard'

const RedirectHome = () => {
  return <Redirect to='/home' />
}

const AuthenticatedApp = () => {
  return (
    <Router>
      <Fragment>
        <RedirectHome path='/' />
        <Route path='/home' component={Home} />
        <Route path='/dashboard' component={Dashboard} />
      </Fragment>
    </Router>
  )
}

export default AuthenticatedApp
