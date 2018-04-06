import React, { Fragment } from 'react'
import {
  Route
} from 'react-router-dom'

export default () => (
    <Fragment>
        <Route exact path="/" component={() => (<div>Rota  1</div>)}/>
        <Route path="/about" component={() => (<div>Rota 2</div>)}/>
    </Fragment>
)