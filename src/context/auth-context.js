import React from 'react'
import { useAsync } from 'react-async'

import { bootstrapAppData } from 'utils/bootstrap'
import { login as authLogin } from 'services/auth'
import { setToken, clearToken } from 'helpers/auth'

const AuthContext = React.createContext()

const AuthProvider = props => {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false)
  const { data = { user: null }, error, isRejected, isPending, isSettled, reload } = useAsync({
    promiseFn: bootstrapAppData,
  })

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true)
    }
  }, [isSettled])

  if (!firstAttemptFinished) {
    if (isPending) {
      return <p>carregando...</p>
    }
    if (isRejected) {
      return (
        <div css={{ color: 'red' }}>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      )
    }
  }

  const login = async data => {
    try {
      const {
        data: { token, ...user },
      } = await authLogin(data)
      setToken(token)
      reload()
      return { data: { user } }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const register = () => {
    // put here the expected behavior of register a new user
  }
  const logout = () => {
    clearToken()
    reload()
  }

  return <AuthContext.Provider value={{ data, login, logout, register }} {...props} />
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
