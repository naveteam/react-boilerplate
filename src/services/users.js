import client from 'providers/fetchClient'
import { formatDateToApi, formatDateFromApi } from 'helpers'

export const getUserById = async ({ queryKey: [key, id] }) => {
  const response = await client.get(`/v1/users/${id}`)

  return { ...response, birthdate: formatDateFromApi(response.birthdate) }
}

export const getAllRoles = async () => {
  const { results } = await client.get('/v1/roles')
  return results.map(item => ({ label: item.role, value: item.id }))
}

export const createUser = ({ birthdate, ...data }) =>
  client.post('/v1/users/signup', { ...data, birthdate: formatDateToApi(birthdate) })

export const updateUser = (id, { birthdate, ...data }) =>
  client.put(`/v1/users/${id}`, { ...data, birthdate: formatDateToApi(birthdate) })

export const deleteUser = id => client.delete(`/v1/users/${id}`)
