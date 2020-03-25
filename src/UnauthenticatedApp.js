import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from 'routes/Login'

const UnauthenticatedApp = () => (
  <Switch>
    <Route path='/login' component={Login} />
    <Redirect to='/login' />
  </Switch>
)

export default UnauthenticatedApp
