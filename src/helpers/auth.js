import { ACCESS_TOKEN, REFRESH_TOKEN } from 'helpers'

export const getToken = () => localStorage.getItem(ACCESS_TOKEN)

export const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
}

export const setAccessToken = token => localStorage.setItem(ACCESS_TOKEN, token)

export const setRefreshToken = token => localStorage.setItem(REFRESH_TOKEN, token)
