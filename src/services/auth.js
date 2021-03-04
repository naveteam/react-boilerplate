import client from 'providers/fetchClient'
import { formatIsoString } from 'helpers'

export const getUser = () => client.get('/v1/me')

export const login = data => client.post('/v1/users/login', data)

export const getUsers = async params => {
  const { results, pageCount } = await client.get('/v1/users', { params })

  return {
    pageCount,
    results: results.map(user => ({
      ...user,
      formattedCreatedAt: formatIsoString(user.created_at)
    }))
  }
}
