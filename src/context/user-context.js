import React, { createContext, useCallback, useContext, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getUser, login as loginService } from 'services/users'
import { setAccessToken, setRefreshToken, clearToken, getToken } from 'helpers'
import { getAllRoles } from 'services/users'

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

  const { data: userRoles, isFetching: isLoadingRoles } = useQuery('roles', getAllRoles, {
    enabled: Boolean(getToken())
  })

  const { mutate: login } = useMutation(loginService, {
    onSuccess: async ({ access_token, refresh_token, ...user }) => {
      setAccessToken(access_token)
      setRefreshToken(refresh_token)
      queryClient.setQueryData('user', user)
    }
  })

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

  return <UserContext.Provider value={{ user, isLoading, login, logout, userRoles, isLoadingRoles }} {...props} />
}

export { UserProvider, useUser }
