import React, { Fragment } from 'react'
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom'

export default () =>  (
    <Router>
        <Fragment>
            <Route exact path="/" component={() => (<div>Rota  1</div>)}/>
            <Route path="/about" component={() => (<div>Rota 2</div>)}/>
        </Fragment>
    </Router>
)