import React, { createContext, useCallback, useContext, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { getUser, login as loginService } from 'services/auth'
import { setAccessToken, setRefreshToken, clearToken, getToken } from 'helpers'

const UserContext = createContext()

const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

const UserProvider = props => {
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useQuery('user', getUser, { enabled: Boolean(getToken()) })

  const login = useCallback(
    async data => {
      try {
        const { access_token, refresh_token } = await loginService(data)

        setAccessToken(access_token)
        setRefreshToken(refresh_token)
        queryClient.invalidateQueries('user', { refetchInactive: true })
      } catch (error) {
        console.error(error)
      }
    },
    [queryClient]
  )

  const logout = useCallback(() => {
    clearToken()

    queryClient.setQueryData('user', null)
  }, [queryClient])

  useEffect(() => {
    if (user && process.env.REACT_APP_NODE_ENV === 'production') {
      Sentry.configureScope(scope =>
        scope.setUser({
          // Adicionar outras informações relevantes do usuários
          email: user.email
        })
      )
    }
  }, [user])

  return <UserContext.Provider value={{ user, isLoading, login, logout }} {...props} />
}

export { UserProvider, useUser }
