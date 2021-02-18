import client from 'providers/fetchClient'

export const getUserById = (queryKey, id) =>
  Promise.resolve({ name: 'Nave', email: 'exemplo@nave.rs', role: 'função a', birthdate: '01/01/1998' })
