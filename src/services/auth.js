import client from 'providers/fetchClient'
import { formatIsoString } from 'helpers'
import { format } from 'date-fns'

export const getUser = () => client.get('/v1/me')

export const login = data => client.post('/v1/users/login', data)

export const getUsers = async params => {
  const { results, pageCount } = await client.get('/v1/users', {
    params: { ...params, created_at: params?.created_at ? format(params.created_at, 'yyyy-MM-dd') : null }
  })

  return {
    pageCount,
    results: results.map(user => ({
      ...user,
      formattedCreatedAt: formatIsoString(user.created_at)
    }))
  }
}
