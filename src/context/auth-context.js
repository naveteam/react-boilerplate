import React, { createContext, useState, useLayoutEffect, useContext, useCallback } from 'react'
import { useAsync } from 'react-async'

import { login as authLogin } from 'services/auth'
import { setToken, clearToken, bootstrapAppData } from 'helpers'

import Loader from 'components/Loader'

const AuthContext = createContext()

const AuthProvider = props => {
  const [firstAttemptFinished, setFirstAttemptFinished] = useState(false)
  const { data = { user: null }, error, isRejected, isPending, isSettled, reload } = useAsync({
    promiseFn: bootstrapAppData
  })

  const teste = 'gustavo'

  useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true)
    }
  }, [isSettled])

  const login = useCallback(async data => {
    try {
      const { token, ...user } = await authLogin(data)
      setToken(token)
      reload()

      return { user }
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }, [])

  const logout = useCallback(() => {
    clearToken()
    reload()
  }, [])

  if (!firstAttemptFinished) {
    if (isPending) {
      return <Loader />
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

  return <AuthContext.Provider value={{ data, login, logout }} {...props} />
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
