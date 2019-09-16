import React from 'react'
// import { Provider } from 'react-redux'
// import createHistory from 'history/createBrowserHistory'
// import store from './redux/store'
import 'sanitize.css/sanitize.css'
import { useUser } from 'context/user-context'

const loadAuthenticatedApp = () => import('./AuthenticatedApp')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))

const App = () => {
  const user = useUser()

  React.useEffect(() => {
    loadAuthenticatedApp()
  }, [])

  return (
    // <Provider store={store}>
    <React.Suspense fallback={<p>carregando...</p>}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
    // </Provider>
  )
}

export default App
