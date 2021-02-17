import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from 'routes/Home'
import Dashboard from 'routes/Dashboard'
import AddOrEditUser from 'routes/AddOrEditUser'

const AuthenticatedApp = () => (
  <Switch>
    <Route path='/home' component={Home} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path={['/usuarios/criar', '/usuarios/:id']} component={AddOrEditUser} />
    <Redirect to='/home' />
  </Switch>
)

export default AuthenticatedApp
