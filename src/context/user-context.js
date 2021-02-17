import React, { createContext, useCallback, useContext, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { getUser, login as loginService } from 'services/auth'
import { setAccessToken, setRefreshToken, clearToken, getToken, setToken } from 'helpers'

const UserContext = createContext()

const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

const UserProvider = props => {
<<<<<<< HEAD
  const queryCache = useQueryCache()

  const { data: user, isLoading } = useQuery('user', getUser, { enabled: getToken() })

  const [login] = useMutation(loginService, {
    onSuccess: ({ access_token, refresh_token }) => {
      setAccessToken(access_token)
      setRefreshToken(refresh_token)
      // trocar access_token e refresh_token por token caso a autenticação seja feita com OAuth0
      // setToken(token)
      queryCache.invalidateQueries('user', { refetchInactive: true })
    }
  })

  const logout = () => {
=======
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
>>>>>>> feat: upgrade packages and create table
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
