import React, { createContext, useContext, useState, useEffect } from 'react'

import { useAuth } from 'context/auth-context'

const UserContext = createContext()

const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

const UserProvider = props => {
  const [user, setUser] = useState(null)

  const { data } = useAuth()

  useEffect(() => {
    if (!data) {
      return
    }

    setUser(data.user)
  }, [data])

  return <UserContext.Provider value={{ user, setUser }} {...props} />
}

export { UserProvider, useUser }
