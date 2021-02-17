import client from 'providers/fetchClient'

export const getUser = () => client.get('/v1/me')

export const login = data => client.post('/v1/users/login', data)

export const getUsers = async ({ page, perPage, ...params }) => {
  const { results } = await client.get(`https://randomuser.me/api/?page=${page}&results=${perPage}`)

  return results.map(user => ({
    created_at: user.registered.date,
    email: user.email,
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`
  }))
}
