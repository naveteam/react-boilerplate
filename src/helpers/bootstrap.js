import * as Sentry from '@sentry/browser'

import { getUser } from 'services/auth'
import { getToken } from 'helpers'

const bootstrapAppData = async () => {
  const token = getToken()

  if (!token) {
    return { user: null }
  }

  const user = await getUser()

  Sentry.configureScope(scope =>
    scope.setUser({
      // Adicionar outras informações relevantes do usuários
      email: user.email
    })
  )

  if (!user) {
    return { user: null }
  }

  return { user }
}

export { bootstrapAppData }
