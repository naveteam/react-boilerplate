import React, { Component } from 'react'
// import { Provider } from 'react-redux'
// import createHistory from 'history/createBrowserHistory'
import Routes from './Routes'
// import store from './redux/store'
import 'sanitize.css/sanitize.css'

class App extends Component {
  render () {
    return (
      // <Provider store={store}>
      <Routes />
      // </Provider>
    )
  }
}

export default App
