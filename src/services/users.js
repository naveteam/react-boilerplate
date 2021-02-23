import client from 'providers/fetchClient'

export const getUserById = ({ queryKey: [key, id] }) => client.get(`/v1/users/${id}`)

export const getAllRoles = () => client.get('/v1/roles')

export const createUser = data => client.post('/v1/users/signup', data)

export const updateUser = (id, data) => client.put(`/v1/users/${id}`, data)
