import client from 'providers/fetchClient'

const getUser = () => client.get('/v1/me')

const login = async data => {
  const { token, ...user } = await client.post('/v1/users/login', data)
  return { token, user }
}

export const authServices = { getUser, login }
