import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from 'routes/Home'
import Dashboard from 'routes/Dashboard'

const AuthenticatedApp = () => (
  <Switch>
    <Route path='/home' component={Home} />
    <Route path='/dashboard' component={Dashboard} />
    <Redirect to='/home' />
  </Switch>
)

export default AuthenticatedApp
