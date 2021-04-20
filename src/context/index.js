import React from 'react'

import { UserProvider } from './user-context'
import { ModalProvider } from './modal-context'

const AppProviders = ({ children }) => (
  <UserProvider>
    <ModalProvider>{children}</ModalProvider>
  </UserProvider>
)

export default AppProviders
