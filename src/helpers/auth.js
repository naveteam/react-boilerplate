export const getToken = () => localStorage.getItem('token')

export const setToken = token => localStorage.setItem('token', token)

export const clearToken = token => localStorage.removeItem('token')
