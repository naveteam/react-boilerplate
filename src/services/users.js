import client from 'providers/fetchClient'

export const getUserById = ({ queryKey: [key, id] }) => client.get(`/v1/users/${id}`)

export const getAllRoles = async () => {
  const { results } = await client.get('/v1/roles')
  return results.map(item => ({ label: item.role, value: item.id }))
}

export const createUser = data => client.post('/v1/users/signup', data)

export const updateUser = (id, data) => client.put(`/v1/users/${id}`, data)

export const deleteUser = id => client.delete(`/v1/users/${id}`)
