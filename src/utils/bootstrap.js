import { getUser } from 'services/auth'
import { getToken } from 'helpers/auth'

async function bootstrapAppData() {
  const token = getToken()
  if (!token) {
    return { user: null }
  }
  const { data } = await getUser()

  if (!data) {
    return { user: null }
  }
  return {
    user: data,
  }
}

export { bootstrapAppData }
