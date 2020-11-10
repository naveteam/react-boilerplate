import React from 'react'

import { UserProvider } from './user-context'

const AppProviders = ({ children }) => <UserProvider>{children}</UserProvider>

export default AppProviders
