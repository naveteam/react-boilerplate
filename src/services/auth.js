import client from 'providers/fetchClient'
import { formatIsoString } from 'helpers'

export const getUser = () => client.get('/v1/me')

export const login = data => client.post('/v1/users/login', data)

export const getUsers = async ({ page, perPage, ...params }) => {
  const { results } = await client.get('/v1/users')

  return results.map(user => ({
    ...user,
    formattedCreatedAt: formatIsoString(user.created_at)
  }))
}
