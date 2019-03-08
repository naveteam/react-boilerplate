import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import createHistory from 'history/createBrowserHistory'
// import store from './redux/store'
import 'sanitize.css/sanitize.css'
import Rota1 from './routes/Rota1'
import Rota2 from './routes/Rota2'

const App = () => {
  return (
    // <Provider store={store}>
    <Router>
      <Fragment>
        <Route exact path='/' component={Rota1} />
        <Route path='/rota2' component={Rota2} />
      </Fragment>
    </Router>
    // </Provider>
  )
}

export default App
