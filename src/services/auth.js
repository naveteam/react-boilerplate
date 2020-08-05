import client from 'providers/fetchClient'

export const getUser = () => client.get('/v1/me')

export const login = async data => {
  const { token, ...user } = await client.post('/v1/users/login', data)
  return { token, user }
}
