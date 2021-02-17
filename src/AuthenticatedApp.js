import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from 'routes/Home'
import Dashboard from 'routes/Dashboard'
<<<<<<< HEAD
import AddOrEditUser from 'routes/AddOrEditUser'
=======
import UsersList from 'routes/UsersList/UsersList'
>>>>>>> feat: upgrade packages and create table

const AuthenticatedApp = () => (
  <Switch>
    <Route path='/home' component={Home} />
    <Route path='/dashboard' component={Dashboard} />
<<<<<<< HEAD
    <Route path={['/usuarios/criar', '/usuarios/:id']} component={AddOrEditUser} />
=======
    <Route path='/usuarios' component={UsersList} />
>>>>>>> feat: upgrade packages and create table
    <Redirect to='/home' />
  </Switch>
)

export default AuthenticatedApp
