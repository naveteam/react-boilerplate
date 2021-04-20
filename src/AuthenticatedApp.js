import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from 'routes/Home'
import Dashboard from 'routes/Dashboard'
import UsersList from 'routes/UsersList'
import UserForm from 'routes/UserForm'

import Drawer from 'components/Drawer'

const AuthenticatedApp = () => (
  <Drawer>
    <Switch>
      <Route path='/home' component={Home} />
      <Route path='/dashboard' component={Dashboard} />
      <Route exact path='/usuarios' component={UsersList} />
      <Route exact path={['/usuarios/criar', '/usuarios/:id']} component={UserForm} />
      <Redirect to='/home' />
    </Switch>
  </Drawer>
)

export default AuthenticatedApp
