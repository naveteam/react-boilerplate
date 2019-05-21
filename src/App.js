import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import createHistory from 'history/createBrowserHistory'
// import store from './redux/store'
import 'sanitize.css/sanitize.css'
import Home from 'routes/Home'
import Dashboard from 'routes/Dashboard'

const App = () => {
  return (
    // <Provider store={store}>
    <Router>
      <Fragment>
        <Route exact path='/' component={Home} />
        <Route path='/dashboard' component={Dashboard} />
      </Fragment>
    </Router>
    // </Provider>
  )
}

export default App
