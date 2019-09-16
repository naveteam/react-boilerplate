import React from 'react'
import { useAuth } from './auth-context'

const UserContext = React.createContext()

const useUser = () => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

const UserProvider = props => {
  const {
    data: { user },
  } = useAuth()

  return <UserContext.Provider value={user} {...props} />
}

export { UserProvider, useUser }
