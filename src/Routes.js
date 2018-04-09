import React, { Fragment } from 'react'
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom'
import Rota1 from './components/Rota1'
import Rota2 from './components/Rota2'

export default () => (
  <Router>
    <Fragment>
      <Route exact path='/' component={Rota1} />
      <Route path='/rota2' component={Rota2} />
    </Fragment>
  </Router>
)
