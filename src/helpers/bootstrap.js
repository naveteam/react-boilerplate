import { getUser } from 'services/auth'
import { getToken } from 'helpers'

const bootstrapAppData = async () => {
  const token = getToken()

  if (!token) {
    return { user: null }
  }

  const user = await getUser()

  if (!user) {
    return { user: null }
  }

  return { user }
}

export { bootstrapAppData }
